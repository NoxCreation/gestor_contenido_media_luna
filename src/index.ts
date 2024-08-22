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
    const { toEntityResponse, toEntityResponseCollection } =
      getService("format").returnTypes;

    extensionService.use(({ nexus }) => {
      const avgStocksQuery = nexus.extendType({
        type: "Query",
        definition(t) {
          t.field("stocks", {
            type: "StockEntityResponseCollection",
            args: {
              sort: nexus.stringArg(), // Definido como un array de strings
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
              const transformedArgs = transformArgs(args, {
                contentType,
                usePagination: true,
              });
              console.log(args);

              // Llama al servicio para obtener los stocks con el promedio de valoraciones
              const stocks = await strapi.entityService.findMany(
                "api::stock.stock",
                {
                  populate: ["comentarios"],
                  ...transformedArgs,
                }
              );

              // Calcula el promedio de las valoraciones
              const stocksWithAverageRating = await Promise.all(
                stocks.map(async (stock) => {
                  const comentarios = stock.comentarios || [];

                  if (comentarios.length === 0) {
                    stock.promedioValoracion = null; // No hay comentarios
                    return stock;
                  }

                  const totalValoraciones = comentarios.reduce(
                    (acc, comentario) => {
                      return acc + comentario.valoracion;
                    },
                    0
                  );

                  const promedioValoracion =
                    totalValoraciones / comentarios.length;
                  stock.promedioValoracion = promedioValoracion;
                  stock.cantidadValoraciones = comentarios.length;

                  return stock;
                })
              );
              const data = stocksWithAverageRating.map((stock) =>
                toEntityResponse(
                  { ...stock },
                  {
                    resourceUID: uid,
                    args: {
                      ...transformedArgs,
                    },
                  }
                )
              );
              return toEntityResponseCollection(stocksWithAverageRating, {
                args: { ...transformedArgs },
                resourceUID: "api::stock.stock",
              });
            },
          });
        },
      });
      const maxminShopQuery = nexus.extendType({
        type: "Query",
        definition(t) {
          t.field("shops", {
            type: "ShopEntityResponseCollection",
            args: {
              sort: nexus.stringArg(), // Definido como un array de strings
              pagination: nexus.arg({
                type: "PaginationArg",
              }),
              filters: nexus.arg({
                type: "ShopFiltersInput",
              }),
            },
            resolve: async (parent, args, context) => {
              const { auth } = context.state;
              const contentTypeName = "api::shop.shop"; // Cambia esto si es necesario
              const contentType = strapi.contentTypes[contentTypeName];
              const { uid } = contentType;

              // Transforma los argumentos
              const transformedArgs = transformArgs(args, {
                contentType,
                usePagination: true,
              });
              console.log(args);

              // Llama al servicio para obtener los stocks con el promedio de valoraciones
              const shops = await strapi.entityService.findMany(
                "api::shop.shop",
                {
                  populate: ["productos"],
                  ...transformedArgs,
                }
              );

              // Calcula el promedio de las valoraciones
              const maxminShop = await Promise.all(
                shops.map(async (shop) => {
                  const products = shop.productos || [];

                  if (products.length === 0) {
                    shop.precio_maximo = null;
                    shop.precio_minimo = null;
                    return shop;
                  }

                  let maxPriceProduct = products.reduce(
                    (maxProduct, product) => {
                      return product.precio > maxProduct.precio
                        ? product
                        : maxProduct;
                    },
                    products[0]
                  );

                  // Encuentra el producto con el precio más bajo
                  let minPriceProduct = products.reduce(
                    (minProduct, product) => {
                      return product.precio < minProduct.precio
                        ? product
                        : minProduct;
                    },
                    products[0]
                  );
                  shop.precio_maximo = maxPriceProduct.precio;
                  shop.precio_minimo = minPriceProduct.precio;

                  return shop;
                })
              );

              return toEntityResponseCollection(maxminShop, {
                args: { ...transformedArgs },
                resourceUID: "api::shop.shop",
              });
            },
          });
        },
      });
      return { types: [avgStocksQuery, maxminShopQuery] };
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
