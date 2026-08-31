import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::telegram-webhook.telegram-webhook' as any, ({ strapi }) => ({
  async handleWebhook(ctx) {
    try {
      const update = ctx.request.body;
      if (!update) {
        return ctx.badRequest('Missing webhook payload');
      }

      const service = strapi.service('api::telegram-webhook.telegram-webhook') as any;
      const allowedChatIdsStr = process.env.TELEGRAM_ALLOWED_CHAT_IDS;
      const allowedChatIds = allowedChatIdsStr ? allowedChatIdsStr.split(',').map((s) => s.trim()) : [];

      // 1. Handle Callback Query Buttons (Inline Keyboards)
      if (update.callback_query) {
        const query = update.callback_query;
        const chatId = query.message?.chat?.id;
        const messageId = query.message?.message_id;
        const data = query.data;

        // Check chat permission
        if (allowedChatIds.length > 0 && !allowedChatIds.includes(String(chatId))) {
          await service.callTelegramApi('answerCallbackQuery', {
            callback_query_id: query.id,
            text: '⛔ Unauthorized chat.',
            show_alert: true,
          });
          return ctx.send({ ok: true });
        }

        // Action: Publish Event
        if (data.startsWith('pub:event:')) {
          const documentId = data.replace('pub:event:', '');
          try {
            await service.publishEvent(documentId);
            await service.callTelegramApi('answerCallbackQuery', {
              callback_query_id: query.id,
              text: '🎉 Event Published Live on Website!',
              show_alert: true,
            });

            // Update Telegram message
            await service.callTelegramApi('editMessageText', {
              chat_id: chatId,
              message_id: messageId,
              text: `${query.message.text}\n\n✅ *Status:* PUBLISHED LIVE 🎉`,
              parse_mode: 'Markdown',
            });
          } catch (err: any) {
            await service.callTelegramApi('answerCallbackQuery', {
              callback_query_id: query.id,
              text: `⚠️ Publish failed: ${err.message}`,
              show_alert: true,
            });
          }
        }

        // Action: Discard Event
        else if (data.startsWith('disc:event:')) {
          const documentId = data.replace('disc:event:', '');
          try {
            await service.discardEvent(documentId);
            await service.callTelegramApi('answerCallbackQuery', {
              callback_query_id: query.id,
              text: '🗑️ Draft discarded.',
            });

            await service.callTelegramApi('editMessageText', {
              chat_id: chatId,
              message_id: messageId,
              text: `🗑️ *Event Draft Discarded.*`,
              parse_mode: 'Markdown',
            });
          } catch (err: any) {
            await service.callTelegramApi('answerCallbackQuery', {
              callback_query_id: query.id,
              text: `⚠️ Discard failed: ${err.message}`,
              show_alert: true,
            });
          }
        }

        // Action: Interactive Menu Callbacks
        else if (data === 'menu:guide') {
          await service.callTelegramApi('answerCallbackQuery', { callback_query_id: query.id });
          await service.callTelegramApi('sendMessage', {
            chat_id: chatId,
            text: `📝 *How to Post an Event:*

1. Send or forward a photo/flyer of the event (or plain text message).
2. Include details like Title, Date, Time, Venue/Location, and RSVP Link.
3. The AI will parse your message, upload photos to Strapi Media Library, and return a Preview link + Publish button!`,
            parse_mode: 'Markdown',
          });
        }
        else if (data === 'menu:drafts') {
          await service.callTelegramApi('answerCallbackQuery', { callback_query_id: query.id });
          const draftEvents = await (strapi as any).documents('api::event.event').findMany({
            status: 'draft',
            limit: 5,
            sort: 'createdAt:desc',
          });

          if (!draftEvents || draftEvents.length === 0) {
            await service.callTelegramApi('sendMessage', {
              chat_id: chatId,
              text: '✨ No pending event drafts in CMS right now.',
            });
          } else {
            let draftText = `📊 *Pending Event Drafts (${draftEvents.length}):*\n\n`;
            for (const d of draftEvents) {
              draftText += `• *${d.title}* (${d.Date ? new Date(d.Date).toLocaleDateString() : 'TBD'})\n`;
            }
            await service.callTelegramApi('sendMessage', {
              chat_id: chatId,
              text: draftText,
              parse_mode: 'Markdown',
            });
          }
        }
        else if (data === 'menu:help') {
          await service.callTelegramApi('answerCallbackQuery', { callback_query_id: query.id });
          await service.callTelegramApi('sendMessage', {
            chat_id: chatId,
            text: `❓ *Help & Assistance:*

Bot Version: 1.0.0 (Events Focus)
Models Supported: OpenRouter Gemini 2.5 Flash / GPT-4o
Commands:
• /start - Main Menu
• /new_event - Post event guide
• /status - View pending drafts
• /help - Display this help message`,
            parse_mode: 'Markdown',
          });
        }

        return ctx.send({ ok: true });
      }

      // 2. Handle Incoming Message Events
      const message = update.message;
      if (!message) {
        return ctx.send({ ok: true });
      }

      const chatId = message.chat?.id;
      const text = message.text || message.caption || '';

      // Check chat permission
      if (allowedChatIds.length > 0 && !allowedChatIds.includes(String(chatId))) {
        strapi.log.warn(`Telegram Webhook received message from unauthorized chat_id: ${chatId}`);
        return ctx.send({ ok: true });
      }

      // Handle Bot Commands
      if (text.startsWith('/start')) {
        await service.sendMainMenu(chatId);
        return ctx.send({ ok: true });
      }
      if (text.startsWith('/help') || text.startsWith('/new_event')) {
        await service.sendMainMenu(chatId, `📝 *To post an event:* Just send text or flyer photos into this chat!`);
        return ctx.send({ ok: true });
      }
      if (text.startsWith('/status')) {
        const draftEvents = await (strapi as any).documents('api::event.event').findMany({
          status: 'draft',
          limit: 5,
          sort: 'createdAt:desc',
        });
        let statusMsg = draftEvents && draftEvents.length > 0
          ? `📊 *Pending Event Drafts (${draftEvents.length}):*\n` + draftEvents.map((e: any) => `• ${e.title}`).join('\n')
          : '✨ No pending event drafts.';
        await service.callTelegramApi('sendMessage', { chat_id: chatId, text: statusMsg, parse_mode: 'Markdown' });
        return ctx.send({ ok: true });
      }

      // Extract photo file_ids if user attached photos
      const photoFileIds: string[] = [];
      if (message.photo && Array.isArray(message.photo)) {
        // Take the highest resolution photo (last element in array)
        const highestResPhoto = message.photo[message.photo.length - 1];
        if (highestResPhoto.file_id) {
          photoFileIds.push(highestResPhoto.file_id);
        }
      }

      // Send initial typing / processing status to Telegram
      await service.callTelegramApi('sendChatAction', {
        chat_id: chatId,
        action: 'typing',
      });

      // Execute Event creation with LLM self-correction loop
      try {
        const result = await service.processEventCreation(text, photoFileIds);
        await service.sendQACard(chatId, result);
      } catch (creationErr: any) {
        strapi.log.error(`Event Creation Error: ${creationErr.message}`);
        await service.sendAdminAlert(creationErr.message, text);
        await service.callTelegramApi('sendMessage', {
          chat_id: chatId,
          text: `⚠️ *Event Processing Failed*\n\nError: ${creationErr.message}\n\nOur system has notified the admin. You can also post manually in Strapi Admin.`,
          parse_mode: 'Markdown',
        });
      }

      return ctx.send({ ok: true });
    } catch (err: any) {
      strapi.log.error(`Telegram Webhook Handler Error: ${err.message}`);
      return ctx.internalServerError(`Webhook Error: ${err.message}`);
    }
  },
}));
