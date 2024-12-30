import { Strapi } from "@strapi/strapi";

interface Invoice {
  id: string;
  usuario: { id: string } | any;
  pagado: number;
}

interface UserReferral {
  id: string;
  ganancias: number;
}

module.exports = {
  async beforeDelete(event: { params: { where: Record<string, unknown> } }) {
    try {
      const { where } = event.params;

      // Fetch invoices to be deleted
      const invoices = await findInvoices(where);
      if (!invoices.length) return;

      // Process invoices and update user references
      await processUserRefs(invoices, "subtract");

      console.log("beforeDeleteInvoice completed successfully");
    } catch (error) {
      console.error("Error in beforeDelete:", error);
    }
  },

  async beforeUpdate(event: { params: { where: Record<string, unknown> } }) {
    try {
      const { where } = event.params;

      // Fetch invoices to be updated
      const invoices = await findInvoices(where);
      if (!invoices.length) return;

      // Process invoices and update user references
      await processUserRefs(invoices, "subtract");

      console.log("beforeUpdateInvoice completed successfully");
    } catch (error) {
      console.error("Error in beforeUpdate:", error);
    }
  },

  async afterUpdate(event: { params: { where: Record<string, unknown> } }) {
    try {
      const { where } = event.params;

      // Fetch invoices to be updated
      const invoices = await findInvoices(where);
      if (!invoices.length) return;

      // Process invoices and update user references
      await processUserRefs(invoices, "add");

      console.log("afterUpdateInvoice completed successfully");
    } catch (error) {
      console.error("Error in afterUpdate:", error);
    }
  },

  async afterCreate(event: { params: { data: Record<string, unknown> } }) {
    try {
      const { data } = event.params;

      // Fetch invoices to be created
      const invoices = await findInvoices(data);
      if (!invoices.length) return;

      // Process invoices and update user references
      await processUserRefs(invoices, "add");

      console.log("afterCreateInvoice completed successfully");
    } catch (error) {
      console.error("Error in afterCreate:", error);
    }
  },
};

// Helper Functions

/**
 * Fetch invoices based on filters.
 * @param filters - Filter criteria.
 * @returns A list of invoices.
 */
async function findInvoices(
  filters: Record<string, unknown>
): Promise<Invoice[]> {
  const res = await strapi.entityService.findMany("api::invoice.invoice", {
    filters,
    populate: ["usuario"], // Include related fields
    fields: ["pagado"],
  });
  const invoices: Invoice[] = res.map((invoice) => ({
    id: invoice.id.toString(),
    usuario: invoice.usuario,
    pagado: invoice.pagado,
  }));
  return invoices;
}

/**
 * Process user references for a list of invoices.
 * @param invoices - List of invoices to process.
 * @param operation - Operation to perform ("add" or "subtract").
 */
async function processUserRefs(
  invoices: Invoice[],
  operation: "add" | "subtract"
): Promise<void> {
  await Promise.all(
    invoices.map(async (invoice) => {
      const { usuario, pagado } = invoice;

      // Fetch user references
      const userRefs: UserReferral[] = await strapi.entityService.findMany(
        "api::usuario-referido.usuario-referido",
        {
          filters: { referidos: { id: { $in: [usuario.id] } } },
          fields: ["ganancias", "id"],
        }
      );

      // Update user references
      await Promise.all(
        userRefs.map((userRef) =>
          strapi.entityService.update(
            "api::usuario-referido.usuario-referido",
            userRef.id,
            {
              data: {
                ganancias:
                  userRef.ganancias +
                  (operation === "add" ? pagado : -pagado) / 2,
              },
            }
          )
        )
      );
    })
  );
}
