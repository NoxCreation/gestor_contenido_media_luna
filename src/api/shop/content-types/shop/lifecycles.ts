module.exports = {
  async beforeDelete(event) {
    const { where } = event.params;

    // Busca las entidades que serán eliminadas
    const articles = await strapi.entityService.findMany("api::shop.shop", {
      filters: where,
      populate: ["banner", "logo", "productos"], // Asegúrate de incluir los campos de relación
    });
    console.log(articles);
    for (const article of articles) {
      const { banner, logo, productos } = article;
      console.log(banner);
      console.log(logo);
      console.log(productos);
      // Eliminar los banners
      if (banner) {
        try {
          await strapi.plugins["upload"].services.upload.remove(banner);
          console.log("banner eliminado");
        } catch (error) {
          console.error("Error al eliminar banner:", error);
        }
      }
      // Eliminar los logos
      if (logo) {
        try {
          await strapi.plugins["upload"].services.upload.remove(logo);
          console.log("logo eliminado");
        } catch (error) {
          console.error("Error al eliminar logo:", error);
        }
      }
      // Eliminar los productos
      if (Array.isArray(productos) && productos.length > 0) {
        try {
          const productoIds = productos.map((producto) => producto.id);

          // Eliminar productos uno por uno
          await Promise.all(
            productoIds.map(async (id) => {
              await strapi.entityService.delete("api::stock.stock", id);
            })
          );

          console.log("Productos eliminados");
        } catch (error) {
          console.error("Error al eliminar productos:", error);
        }
      } else {
        console.log("No hay productos para eliminar");
      }
    }

    console.log("beforeDelete");
  },
};
