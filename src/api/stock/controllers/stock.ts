const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::stock.stock", ({ strapi }) => ({
  async find(ctx) {
    console.log("Ejecutando la función find");

    // Llama al servicio para obtener los stocks con el promedio de valoraciones
    const stocksWithAverageRating = await strapi
      .service("api::stock.stock")
      .findWithAverageRating(ctx);

    // Retorna la respuesta con el promedio
    return { data: stocksWithAverageRating };
  },
}));
