module.exports = {
  async beforeDelete(event) {
    const { where } = event.params;

    // Busca las entidades que serán eliminadas
    const articles = await strapi.entityService.findMany("api::stock.stock", {
      filters: where,
      populate: ["foto1", "foto2", "foto3", "foto4"], // Asegúrate de incluir los campos de relación
    });
    console.log(articles);
    for (const article of articles) {
      const { foto1, foto2, foto3, foto4 } = article;
      console.log(foto1);
      console.log(foto2);
      console.log(foto3);
      console.log(foto4);
      // Eliminar las fotos
      if (foto1) {
        try {
          await strapi.plugins["upload"].services.upload.remove(foto1);
          console.log("foto1 eliminado");
        } catch (error) {
          console.error("Error al eliminar foto1:", error);
        }
      }
      if (foto2) {
        try {
          await strapi.plugins["upload"].services.upload.remove(foto2);
          console.log("foto2 eliminado");
        } catch (error) {
          console.error("Error al eliminar foto2:", error);
        }
      }
      if (foto3) {
        try {
          await strapi.plugins["upload"].services.upload.remove(foto3);
          console.log("foto3 eliminado");
        } catch (error) {
          console.error("Error al eliminar foto3:", error);
        }
      }
      if (foto4) {
        try {
          await strapi.plugins["upload"].services.upload.remove(foto4);
          console.log("foto4 eliminado");
        } catch (error) {
          console.error("Error al eliminar foto4:", error);
        }
      }
    }
    console.log("beforeDelete");
  },
};
