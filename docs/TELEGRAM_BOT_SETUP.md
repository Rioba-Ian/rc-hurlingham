# Telegram Bot + OpenRouter LLM CMS Setup Guide

This guide walks you through setting up your Telegram Bot, obtaining the required credentials (Bot Token, Chat IDs), configuring environment variables, registering webhooks, and using the bot to update content on your Strapi CMS and Next.js website.

---

## 1. Create a Telegram Bot

1. Open Telegram and search for **[@BotFather](https://t.me/BotFather)**.
2. Send the command `/newbot`.
3. Enter a name for your bot (e.g. `Rotaract Hurlingham CMS Bot`).
4. Enter a username for your bot ending in `bot` (e.g. `rc_hurlingham_cms_bot`).
5. **Save the HTTP API Token** provided by BotFather. This is your `TELEGRAM_BOT_TOKEN`.
6. **Configure Group Privacy Mode (Important for Group Chats)**:
   - In BotFather, type `/mybots` -> select your bot -> **Bot Settings** -> **Group Privacy**.
   - Select **Turn off** (Disable Privacy Mode). This allows your bot to listen to event text and photo uploads sent into your group chat.


---

## 2. Obtain Telegram Chat IDs

### A. Personal Admin Chat ID (`TELEGRAM_ADMIN_CHAT_ID`)
1. Search for **[@userinfobot](https://t.me/userinfobot)** on Telegram.
2. Send any message to the bot.
3. It will reply with your numeric User ID (e.g. `123456789`). Copy this ID.

### B. Group Chat ID (`TELEGRAM_ALLOWED_CHAT_IDS`)
1. Create or open your target Telegram Group chat.
2. Add your newly created bot to the group as a member (or administrator).
3. Add **[@raw_data_bot](https://t.me/raw_data_bot)** to the group temporarily, or visit the following URL in your web browser (replace `<YOUR_BOT_TOKEN>` with your token):
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. Look for the `"chat":{"id": ...}` field in the JSON response. Group IDs usually begin with a negative sign (e.g. `-1001234567890`).
5. Copy this ID for `TELEGRAM_ALLOWED_CHAT_IDS`. (You can list multiple IDs separated by commas).

---

## 3. Configure Environment Variables

Open `rac-hurlingham-cms/.env` (or create it from `.env.example`) and fill in the following variables:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=7890123456:AAF...your_bot_token...
TELEGRAM_ALLOWED_CHAT_IDS=-1001234567890
TELEGRAM_ADMIN_CHAT_ID=123456789

# OpenRouter LLM Configuration
OPENROUTER_API_KEY=sk-or-v1-...your_openrouter_key...
OPENROUTER_MODEL=google/gemini-2.5-flash

# Frontend & Draft Preview Configuration
CLIENT_URL=http://localhost:3000
PREVIEW_SECRET=rc-hurlingham-preview-secret
```

---

## 4. Register the Webhook & Bot Menu Commands

Once your Strapi CMS is running locally or deployed (e.g. on Railway, Render, or custom VPS), run the registration script from `rac-hurlingham-cms`:

```bash
cd rac-hurlingham-cms

# Replace URL with your public Strapi endpoint (or ngrok for local dev)
node scripts/setup-telegram-webhook.js https://your-strapi-domain.com/api/telegram-webhook
```

For local testing with `ngrok`:
```bash
# In terminal 1: start ngrok
ngrok http 1337

# In terminal 2: run setup script using ngrok HTTPS URL
node scripts/setup-telegram-webhook.js https://abc12345.ngrok-free.app/api/telegram-webhook
```

---

## 5. How to Use the Bot in a Group Chat

### Interacting in a Telegram Group (e.g. `RacHurlinghamUpdates`)
1. **Add the Bot to Your Group**: Add `@RacHurlinghamBot` to your group chat and make it an Administrator (so it has permission to read & post messages).
2. **Starting the Bot in the Group**:
   - In group chats, Telegram commands can be triggered by typing `/start` or appending the bot username:
     ```text
     /start@RacHurlinghamBot
     /help@RacHurlinghamBot
     /status@RacHurlinghamBot
     ```
   - Typing `/` in the group chat box will also bring up the interactive command autocomplete list.

### Interactive Bot Commands
- `/start` — Displays the welcome message and main interactive menu buttons.
- `/new_event` — Shows guide on how to post an event.
### Managing Pending Drafts (`/status`)
1. Type `/status@RacHurlinghamBot` or tap **📊 Pending Drafts Submenu**.
2. The bot displays a list of active event drafts. Each draft item includes **two action buttons**:
   - `🔎 #1: Event Title...` — Opens the detailed breakdown card with **[👁️ Preview Draft on Website]**, **[✅ Publish Live Now]**, and **[📁 Keep in Drafts]**.
   - `🗑️ Delete` — Instantly deletes that specific draft directly from Telegram!


