const { sanitize } = require("@strapi/utils");
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   *
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");
    const { service: getService } = strapi.plugin("graphql");
    const { transformArgs } = getService("builders").utils;
    const { toEntityResponse } = getService("format").returnTypes;

    extensionService.use(({ nexus }) => {
      const avgStocksQuery = nexus.extendType({
        type: "Query",
        definition(t) {
          t.field("stocks", {
            type: nexus.nonNull(nexus.list("StockEntityResponse")),
            args: {
              sort: nexus.list(nexus.stringArg()), // Definido como un array de strings
              pagination: nexus.arg({
                type: "PaginationArg",
              }),
              filters: nexus.arg({
                type: "StockFiltersInput",
              }),
            },
            resolve: async (parent, args, context) => {
              const { auth } = context.state;
              const contentTypeName = "api::stock.stock"; // Cambia esto si es necesario
              const contentType = strapi.contentTypes[contentTypeName];
              const { uid } = contentType;

              // Transforma los argumentos
              const transformedArgs = transformArgs(args, { contentType });

              // Llama al servicio para obtener los stocks con el promedio de valoraciones
              const stocksWithAverageRating = await strapi
                .service("api::stock.stock")
                .findWithAverageRating({
                  ...transformedArgs,
                  // Asegúrate de incluir el sort aquí
                  sort: transformedArgs.sort,
                });

              // Retorna la respuesta con el promedio
              return stocksWithAverageRating.map((stock) =>
                toEntityResponse(stock, { resourceUID: uid })
              );
            },
            resolversConfig: {
              "Query.newStocks": {
                auth: false,
              },
            },
          });
        },
      });

      return { types: [avgStocksQuery] };
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    /* let products = []
    // Get all products from dummyjson API and append them to the products array
    fetch('https://dummyjson.com/products').then(response => response.json()).then((dummyProducts: any) => {
      products.push(...dummyProducts.products);
      // Get all products from fakestoreapi API and append them to the products array
      fetch('https://fakestoreapi.com/products').then(response => response.json()).then((fakeStoreProducts: any) => {
        products.push(...fakeStoreProducts);
        // Loop through each product
        products.forEach(async (product) => {
          // Check if the product already exists
          const existingProduct = await strapi.service("api::product.product").find({
            filters: {
              name: product.title
            }
          });
          // If the product exists, log it
          if (existingProduct.results.length > 0) {
            console.log(`Product ${product.title} already exists`)
          }
          else {
            // If the product doesn't exist, create it
            // create the image
            let image = ""
            product.image !== undefined ? image = product.image : product.images !== undefined ? image = product.images[0] : image = ""
            const createdProduct = strapi.service("api::product.product").create({
              data: {
                name: product.title,
                description: product.description,
                imageUrl: image,
                price: product.price,
                brand: product.brand || '',
                color: product.color || '',
                size: product.size || '',
                quantity: product.quantity || 0,
                category: product.category || '',
              }
            });
          }
        });
      });
    }); */
  },
};
