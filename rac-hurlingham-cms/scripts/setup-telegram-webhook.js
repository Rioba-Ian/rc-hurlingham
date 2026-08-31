/**
 * Helper script to set up Telegram Webhook URL and register interactive bot commands.
 * Usage:
 *   node scripts/setup-telegram-webhook.js https://<your-strapi-domain>/api/telegram-webhook
 */

require('dotenv').config();

const webhookUrl = process.argv[2];
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN environment variable is not defined in .env');
  process.exit(1);
}

if (!webhookUrl) {
  console.error('❌ Error: Webhook URL is required.');
  console.log('Usage: node scripts/setup-telegram-webhook.js https://<your-strapi-domain>/api/telegram-webhook');
  process.exit(1);
}

async function setup() {
  console.log(`📡 Setting Telegram Webhook to: ${webhookUrl}...`);
  const webhookRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrl }),
  });
  const webhookData = await webhookRes.json();

  if (webhookData.ok) {
    console.log('✅ Webhook registered successfully with Telegram API!');
  } else {
    console.error('❌ Failed to set webhook:', webhookData.description);
  }

  console.log('🤖 Registering Interactive Telegram Bot Commands (/start, /new_event, /status, /help)...');
  const commandsRes = await fetch(`https://api.telegram.org/bot${token}/setMyCommands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      commands: [
        { command: 'start', description: 'Open Interactive Main Menu' },
        { command: 'new_event', description: 'Post new event guide' },
        { command: 'status', description: 'Check pending event drafts' },
        { command: 'help', description: 'Display bot help and usage guide' },
      ],
    }),
  });
  const commandsData = await commandsRes.json();

  if (commandsData.ok) {
    console.log('✅ Telegram bot commands registered successfully!');
  } else {
    console.error('❌ Failed to register commands:', commandsData.description);
  }
}

setup().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
