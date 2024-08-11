import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    /* ctx.body = strapi
      .plugin('dashboard')
      .service('myService')
      .getWelcomeMessage(); */
    const data = await strapi.service('api::restaurant.restaurant').find();
    ctx.body = data;
  },
});
