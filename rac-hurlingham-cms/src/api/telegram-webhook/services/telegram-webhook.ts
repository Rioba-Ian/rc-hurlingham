import { factories } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';
import os from 'os';

export default factories.createCoreService('api::telegram-webhook.telegram-webhook' as any, ({ strapi }) => ({
  /**
   * Send a request to Telegram Bot API
   */
  async callTelegramApi(method: string, payload: any) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN environment variable is not defined');
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return await response.json();
  },

  /**
   * Download a photo file from Telegram by file_id
   */
  async downloadTelegramFile(fileId: string): Promise<{ filePath: string; fileName: string; mimeType: string }> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const fileInfoRes = await this.callTelegramApi('getFile', { file_id: fileId });

    if (!fileInfoRes.ok || !fileInfoRes.result?.file_path) {
      throw new Error(`Failed to get file path from Telegram for file_id: ${fileId}`);
    }

    const telegramFilePath = fileInfoRes.result.file_path;
    const downloadUrl = `https://api.telegram.org/file/bot${token}/${telegramFilePath}`;

    const res = await fetch(downloadUrl);
    if (!res.ok) {
      throw new Error(`Failed to download file from Telegram: ${downloadUrl}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = path.extname(telegramFilePath) || '.jpg';
    const fileName = `telegram_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
    const tmpFilePath = path.join(os.tmpdir(), fileName);

    fs.writeFileSync(tmpFilePath, buffer);

    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.webp') mimeType = 'image/webp';
    else if (ext === '.gif') mimeType = 'image/gif';

    return { filePath: tmpFilePath, fileName, mimeType };
  },

  /**
   * Upload a file from disk into Strapi Media Library
   */
  async uploadFileToStrapi(filePath: string, fileName: string, mimeType: string) {
    const stats = fs.statSync(filePath);
    const uploadService = strapi.plugin('upload').service('upload');

    const fileData = {
      name: fileName,
      hash: fileName.replace(/\.[^/.]+$/, ""),
      ext: path.extname(fileName),
      mime: mimeType,
      size: stats.size / 1024,
      path: filePath,
    };

    const uploadedFiles = await uploadService.upload({
      data: {},
      files: {
        path: filePath,
        name: fileName,
        type: mimeType,
        size: stats.size,
      },
    });

    // Cleanup temp file
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      // ignore cleanup errors
    }

    return Array.isArray(uploadedFiles) ? uploadedFiles[0] : uploadedFiles;
  },

  /**
   * Send text & photos to OpenRouter LLM for Event Schema extraction
   */
  async parseEventWithLLM(text: string, base64Images: string[] = [], errorMessage?: string) {
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is not defined');
    }

    const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash';

    const systemPrompt = `You are an AI Content Assistant for Rotaract Club of Hurlingham.
Your task is to parse raw text (and optional photos) sent via Telegram and extract structured data for creating an **Event** in our CMS.

Strapi Event Schema Attributes:
- "title": (string, required) Short, catchy title for the event.
- "description": (string, required) Concise 1-2 sentence description.
- "Date": (string, required) Event date & time in ISO format (e.g. "2026-09-15T18:00:00.000Z"). If time is omitted, default to 18:00:00.
- "Location": (string) Venue location or online meeting link.
- "rsvpLink": (string) Registration link or ticket URL if present in text.
- "content": (string) Detailed overview/agenda formatted in Markdown.
- "qaNotes": (string) Brief internal notes about confidence or assumptions made.

Output Requirement:
You MUST respond with VALID JSON ONLY matching this structure:
{
  "title": "...",
  "description": "...",
  "Date": "...",
  "Location": "...",
  "rsvpLink": "...",
  "content": "...",
  "qaNotes": "..."
}
Do not wrap in markdown backticks or commentary. Only return raw JSON.`;

    let userPrompt = `Extract event content from the following input:\n\n${text || '(No text caption provided, analyze attached image)'}`;
    if (errorMessage) {
      userPrompt += `\n\n⚠️ IMPORTANT: A previous attempt generated a Strapi validation error: "${errorMessage}". Please fix the JSON output accordingly.`;
    }

    const contentPayload: any[] = [{ type: 'text', text: userPrompt }];

    for (const b64 of base64Images) {
      contentPayload.push({
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${b64}`,
        },
      });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterKey}`,
        'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:3000',
        'X-Title': 'Rotaract Hurlingham Bot',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: contentPayload },
        ],
        temperature: 0.2,
      }),
    });

    const data: any = await response.json();
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error(`OpenRouter returned invalid response: ${JSON.stringify(data)}`);
    }

    let rawContent = data.choices[0].message.content.trim();
    // Strip markdown JSON wrapping if present
    if (rawContent.startsWith('```')) {
      rawContent = rawContent.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
    }

    return JSON.parse(rawContent);
  },

  /**
   * Process event creation with self-correction loop
   */
  async processEventCreation(text: string, photoFileIds: string[], maxAttempts = 3) {
    // 1. Download photos
    const uploadedMediaIds: number[] = [];
    const base64Images: string[] = [];

    for (const fileId of photoFileIds) {
      try {
        const { filePath, fileName, mimeType } = await this.downloadTelegramFile(fileId);
        
        // Read base64 for LLM vision input (if image size is reasonable)
        const fileBuf = fs.readFileSync(filePath);
        if (fileBuf.length < 5 * 1024 * 1024) { // < 5MB
          base64Images.push(fileBuf.toString('base64'));
        }

        const uploadedFile = await this.uploadFileToStrapi(filePath, fileName, mimeType);
        if (uploadedFile && uploadedFile.id) {
          uploadedMediaIds.push(uploadedFile.id);
        }
      } catch (err: any) {
        strapi.log.error(`Failed to process Telegram photo: ${err.message}`);
      }
    }

    let lastError: string | undefined = undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        strapi.log.info(`LLM Event Parsing Attempt ${attempt}/${maxAttempts}`);
        const parsed = await this.parseEventWithLLM(text, base64Images, lastError);

        // Sanitize & fallback fields
        const title = parsed.title || 'Untitled Rotaract Event';
        const description = parsed.description || title;
        let eventDate = parsed.Date;
        if (!eventDate || isNaN(Date.parse(eventDate))) {
          eventDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // Default 1 week from now
        }

        // Create Draft Document in Strapi v5
        const document = await (strapi as any).documents('api::event.event').create({
          data: {
            title,
            description,
            Date: eventDate,
            Location: parsed.Location || '',
            rsvpLink: parsed.rsvpLink || '',
            content: parsed.content ? [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: parsed.content }],
              }
            ] : null,
            cover: uploadedMediaIds.length > 0 ? uploadedMediaIds[0] : null,
            eventphoto: uploadedMediaIds,
          },
          status: 'draft',
        });

        return {
          document,
          parsed,
          mediaCount: uploadedMediaIds.length,
        };
      } catch (err: any) {
        strapi.log.warn(`Attempt ${attempt} failed: ${err.message}`);
        lastError = err.message;
      }
    }

    throw new Error(`Failed to create Event draft after ${maxAttempts} attempts. Last error: ${lastError}`);
  },

  /**
   * Send QA Card message to Telegram with Inline Keyboard
   */
  async sendQACard(chatId: number | string, draftResult: any) {
    const { document, parsed, mediaCount } = draftResult;
    const documentId = document.documentId || document.id;
    const slug = document.slug || documentId;
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    const previewSecret = process.env.PREVIEW_SECRET || 'rc-hurlingham-preview-secret';

    const redirectPath = encodeURIComponent(`/events/${slug}`);
    const previewUrl = `${clientUrl}/api/preview?secret=${previewSecret}&contentType=api::event.event&slug=${slug}&redirect=${redirectPath}`;

    const formattedDate = document.Date ? new Date(document.Date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }) : 'TBD';

    const text = `✅ *Draft Event Created in CMS!*

📌 *Title:* ${document.title}
📅 *Date:* ${formattedDate}
📍 *Location:* ${document.Location || 'Not specified'}
🔗 *RSVP Link:* ${document.rsvpLink || 'None'}
🖼️ *Attached Photos:* ${mediaCount}
🔍 *QA Notes:* ${parsed.qaNotes || 'Extracted automatically'}

Review the preview on website or tap *Publish Now* below:`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '👁️ Preview Draft', url: previewUrl },
        ],
        [
          { text: '✅ Publish Now', callback_data: `pub:event:${documentId}` },
          { text: '🗑️ Discard', callback_data: `disc:event:${documentId}` },
        ],
      ],
    };

    return await this.callTelegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: inlineKeyboard,
    });
  },

  /**
   * Handle Interactive Main Menu
   */
  async sendMainMenu(chatId: number | string, welcomeMessage?: string) {
    const text = welcomeMessage || `👋 *Rotaract Hurlingham Content Bot*

Use this bot to update CMS content directly from Telegram!

*How to submit an event:*
Simply post or forward your event details (text, flyer photos, or date/location) to this chat. Our AI will extract details, upload media, and generate a draft for preview!`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '📅 Post New Event Guide', callback_data: 'menu:guide' },
          { text: '📊 Pending Drafts', callback_data: 'menu:drafts' },
        ],
        [
          { text: '❓ Help', callback_data: 'menu:help' },
        ],
      ],
    };

    return await this.callTelegramApi('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup: inlineKeyboard,
    });
  },

  /**
   * Publish document in Strapi v5
   */
  async publishEvent(documentId: string) {
    return await (strapi as any).documents('api::event.event').publish({
      documentId,
    });
  },

  /**
   * Discard/Delete draft document in Strapi v5
   */
  async discardEvent(documentId: string) {
    return await (strapi as any).documents('api::event.event').delete({
      documentId,
    });
  },

  /**
   * Send Admin Error Escalation Alert
   */
  async sendAdminAlert(errorMessage: string, rawMessage: string) {
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || process.env.TELEGRAM_ALLOWED_CHAT_IDS?.split(',')[0];
    if (!adminChatId) return;

    const text = `⚠️ *CMS Automation Alert: Event Creation Failed*

*Error:* ${errorMessage}

*Original Input:*
\`\`\`
${rawMessage.substring(0, 500)}
\`\`\`

*Action Required:* Please log into Strapi CMS Admin to manually review or post the event.`;

    await this.callTelegramApi('sendMessage', {
      chat_id: adminChatId,
      text,
      parse_mode: 'Markdown',
    });
  },
}));
