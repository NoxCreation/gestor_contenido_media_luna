/**
 * `reboard` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.


  return async (ctx, next) => {
    strapi.log.info('In middlware middleware.');

    const redirects = ["/", "/index.html", "/dashboard2/"].map((path) => ({
      method: "GET",
      path,
      handler: (ctx) => ctx.redirect("/dashboard2/plugins/dashboard"),
      config: { auth: false },
    }));

    //console.log(ctx.request.url)

    /* strapi.server.routes([
      {
        method: "GET",
        path: "/dashboard2",
        handler: (ctx) => ctx.redirect("/dashboard2/plugins/dashboard"),
        config: { auth: false },
      }
    ]); */

    await next();
  };
};
