export default {
  routes: [
    {
      method: 'POST',
      path: '/telegram-webhook',
      handler: 'api::telegram-webhook.telegram-webhook.handleWebhook',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
