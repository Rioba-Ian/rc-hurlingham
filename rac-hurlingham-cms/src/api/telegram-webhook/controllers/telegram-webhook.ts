export default {
  async handleWebhook(ctx: any) {
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

        // Action: Inspect specific draft details
        if (data.startsWith('view:event:')) {
          const documentId = data.replace('view:event:', '');
          await service.callTelegramApi('answerCallbackQuery', { callback_query_id: query.id });
          await service.sendDraftDetails(chatId, documentId);
        }

        // Action: Publish Event
        else if (data.startsWith('pub:event:')) {
          const documentId = data.replace('pub:event:', '');
          try {
            await service.publishEvent(documentId);
            await service.callTelegramApi('answerCallbackQuery', {
              callback_query_id: query.id,
              text: '🎉 Event Published Live on Website!',
              show_alert: true,
            });

            await service.callTelegramApi('editMessageText', {
              chat_id: chatId,
              message_id: messageId,
              text: `${query.message.text}\n\n✅ <b>Status: PUBLISHED LIVE 🎉</b>`,
              parse_mode: 'HTML',
            });
          } catch (err: any) {
            await service.callTelegramApi('answerCallbackQuery', {
              callback_query_id: query.id,
              text: `⚠️ Publish failed: ${err.message}`,
              show_alert: true,
            });
          }
        }

        // Action: Keep as Draft
        else if (data.startsWith('keep:event:')) {
          await service.callTelegramApi('answerCallbackQuery', {
            callback_query_id: query.id,
            text: '📁 Maintained as Draft in CMS.',
          });

          await service.callTelegramApi('editMessageText', {
            chat_id: chatId,
            message_id: messageId,
            text: `${query.message.text}\n\n📁 <b>Status: KEPT IN DRAFTS</b>`,
            parse_mode: 'HTML',
          });
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
              text: `🗑️ <b>Event Draft Discarded.</b>`,
              parse_mode: 'HTML',
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
            text: `📝 <b>How to Post an Event:</b>

1. Send or forward a photo/flyer of the event (or plain text message).
2. Include details like Title, Date, Time, Venue/Location, and RSVP Link.
3. The AI will parse your message, upload photos to Strapi Media Library, and return a Preview link + Publish button!`,
            parse_mode: 'HTML',
          });
        }
        else if (data === 'menu:drafts') {
          await service.callTelegramApi('answerCallbackQuery', { callback_query_id: query.id });
          await service.sendDraftsMenu(chatId);
        }
        else if (data === 'menu:help') {
          await service.callTelegramApi('answerCallbackQuery', { callback_query_id: query.id });
          await service.callTelegramApi('sendMessage', {
            chat_id: chatId,
            text: `❓ <b>Help & Assistance:</b>

Bot Version: 1.0.0 (Events Focus)
Models Supported: OpenRouter Gemini 2.5 Flash / GPT-4o
Commands:
• /start - Main Menu
• /new_event - Post event guide
• /status - View pending drafts submenu
• /help - Display this help message`,
            parse_mode: 'HTML',
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
        await service.sendMainMenu(chatId, `📝 <b>To post an event:</b> Just send text or flyer photos into this chat!`);
        return ctx.send({ ok: true });
      }
      if (text.startsWith('/status')) {
        await service.sendDraftsMenu(chatId);
        return ctx.send({ ok: true });
      }

      // Extract photo file_ids if user attached photos or image documents
      const photoFileIds: string[] = [];
      if (message.photo && Array.isArray(message.photo) && message.photo.length > 0) {
        const highestResPhoto = message.photo[message.photo.length - 1];
        if (highestResPhoto.file_id) {
          photoFileIds.push(highestResPhoto.file_id);
        }
      } else if (message.document && message.document.file_id) {
        if (!message.document.mime_type || message.document.mime_type.startsWith('image/')) {
          photoFileIds.push(message.document.file_id);
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
          text: `⚠️ <b>Event Processing Failed</b>\n\nError: ${creationErr.message}\n\nOur system has notified the admin. You can also post manually in Strapi Admin.`,
          parse_mode: 'HTML',
        });
      }

      return ctx.send({ ok: true });
    } catch (err: any) {
      strapi.log.error(`Telegram Webhook Handler Error: ${err.message}`);
      return ctx.internalServerError(`Webhook Error: ${err.message}`);
    }
  },
};
