export default [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "frame-src": [
            "http://127.0.0.1:*",
            "self",
            "sandbox.embed.apollographql.com",
          ],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enable: true,
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  { resolve: "./src/middlewares/reboard" },
];
