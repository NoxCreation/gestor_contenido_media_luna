const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::stock.stock", ({ strapi }) => ({
  async findWithAverageRating(ctx) {
    // Obtiene todos los stocks
    const stocks = await strapi.entityService.findMany("api::stock.stock", {
      populate: ["comentarios"], // Asegúrate de que los comentarios se carguen
    });

    // Calcula el promedio de las valoraciones
    const stocksWithAverageRating = await Promise.all(
      stocks.map(async (stock) => {
        const comentarios = stock.comentarios || [];

        if (comentarios.length === 0) {
          stock.promedioValoracion = null; // No hay comentarios
          return stock;
        }

        const totalValoraciones = comentarios.reduce((acc, comentario) => {
          return acc + comentario.valoracion;
        }, 0);

        const promedioValoracion = totalValoraciones / comentarios.length;
        stock.promedioValoracion = promedioValoracion;

        return stock;
      })
    );

    return stocksWithAverageRating;
  },
}));
