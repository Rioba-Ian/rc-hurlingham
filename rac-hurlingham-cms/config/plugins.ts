module.exports = ({ env }) => ({
 // ...
 upload: {
  config: {
   provider: "cloudinary",
   providerOptions: {
    cloud_name: env("CLOUDINARY_CLOUD_NAME"),
    api_key: env("CLOUDINARY_API_KEY"),
    api_secret: env("CLOUDINARY_API_SECRET"),
   },
   sentry: {
    enabled: true,
    config: {
     dsn: env("NODE_ENV") === "production" ? env("SENTRY_DSN") : null,
     sendMetadata: true,
    },
   },
   actionOptions: {
    upload: {},
    uploadStream: {},
    delete: {},
   },
  },
 },
 // ...
});
