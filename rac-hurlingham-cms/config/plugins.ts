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
    'tiptap-editor': {
        config: {
            presets: {
                // A minimal preset for short-form content like titles or captions
                minimal: {
                    bold: true,
                    italic: true,
                    underline: true,
                },

                // A standard preset for blog posts and articles
                standard: {
                    bold: true,
                    italic: true,
                    underline: true,
                    strike: true,
                    heading: true,
                    bulletList: true,
                    orderedList: true,
                    blockquote: true,
                    link: true,
                },

                // A full preset with every feature enabled
                full: {
                    bold: true,
                    italic: true,
                    underline: true,
                    strike: true,
                    code: true,
                    codeBlock: true,
                    heading: true,
                    blockquote: true,
                    bulletList: true,
                    orderedList: true,
                    link: true,
                    table: true,
                    textAlign: true,
                    superscript: true,
                    subscript: true,
                    mediaLibrary: true,
                },
            },
        },
    },
    // ...
});
