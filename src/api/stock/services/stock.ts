const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::stock.stock", ({ strapi }) => ({
  async findWithAverageRating(ctx) {
    // Obtiene todos los stocks
    const stocks = await strapi.entityService.findMany("api::stock.stock", {
      populate: ["comentarios"], // Asegúrate de que los comentarios se carguen
      sort: ctx.sort || undefined, // Si no hay sort, se establece como undefined
      filters: ctx.filters || undefined, // Si no hay filtros, se establece como undefined
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

    stocksWithAverageRating.sort((a, b) => {
      // Primero, maneja los casos donde ambos promedios son null
      if (b.promedioValoracion === null && a.promedioValoracion === null)
        return 0; // Ambos sin valoraciones
      if (a.promedioValoracion === null) return b.promedioValoracion - 3.4; // a sin valoraciones va al final
      if (b.promedioValoracion === null) return 3.4 - a.promedioValoracion; // b sin valoraciones va al final

      // Calcula la diferencia de las valoraciones
      const diferencia = b.promedioValoracion - a.promedioValoracion;

      // Si la diferencia es menor o igual a 0.5, considera la cantidad de comentarios
      if (Math.abs(diferencia) <= 0.5) {
        // Si la diferencia de cantidad de comentarios es 3 o más, ordena por cantidad de comentarios
        if (Math.abs(b.comentarios.length - a.comentarios.length) * 0.5 >= 1) {
          return b.comentarios.length - a.comentarios.length; // Ordena por cantidad de comentarios
        }
      }

      // Ordena por promedioValoracion
      return diferencia; // Ordena de mayor a menor
    });

    return stocksWithAverageRating;
  },
}));
