export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL', 'http://localhost:3000')],
      async handler(uid: string, { documentId, locale, status }: any) {
        const document = await (strapi as any).documents(uid).findOne({ documentId });
        const slug = document?.slug;
        const secret = env('PREVIEW_SECRET', 'rc-hurlingham-preview-secret');
        const clientUrl = env('CLIENT_URL', 'http://localhost:3000');
        
        let path = '';
        if (uid.includes('event')) {
          path = `/events/${slug || documentId}`;
        } else if (uid.includes('article')) {
          path = `/blog/${slug || documentId}`;
        } else if (uid.includes('project')) {
          path = `/projects/${slug || documentId}`;
        } else if (uid.includes('gallery-album')) {
          path = `/gallery/${slug || documentId}`;
        }

        return `${clientUrl}/api/preview?secret=${secret}&contentType=${uid}&slug=${slug || documentId}&redirect=${encodeURIComponent(path)}`;
      },
    },
  },
});
