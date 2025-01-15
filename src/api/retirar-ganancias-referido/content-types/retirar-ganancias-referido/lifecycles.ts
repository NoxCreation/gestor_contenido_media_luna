import { Strapi } from "@strapi/strapi";

interface Withdrawal {
  id: string;
  user: { id: string };
  cantidad_retiro: number;
  acreditado: string;
}

interface UserReferral {
  id: string;
  ganancias: number;
}

module.exports = {
  async beforeUpdate(event: {
    params: { where: Record<string, unknown>; data: Record<string, unknown> };
  }) {
    try {
      const { where } = event.params;

      // Fetch entities to be updated
      const withdrawals = await findWithdrawals(where);
      if (!withdrawals.length) return;

      // Process each withdrawal
      await processWithdrawals(withdrawals, "cancelado", true);

      console.log("beforeUpdate completed successfully");
    } catch (error) {
      console.error("Error in beforeUpdate:", error);
    }
  },

  async afterUpdate(event: {
    params: { where: Record<string, unknown>; data: Record<string, unknown> };
  }) {
    try {
      const { where } = event.params;

      // Fetch entities to be updated
      const withdrawals = await findWithdrawals(where);
      if (!withdrawals.length) return;

      // Process each withdrawal
      await processWithdrawals(withdrawals, "cancelado", false);

      console.log("afterUpdate completed successfully");
    } catch (error) {
      console.error("Error in afterUpdate:", error);
    }
  },

  async afterCreate(event: { params: { data: Record<string, unknown> } }) {
    try {
      const { data } = event.params;

      // Fetch entities to be created
      const withdrawals = await findWithdrawals(data);
      if (!withdrawals.length) return;

      // Process each withdrawal
      await processWithdrawals(withdrawals, "pendiente", true);

      console.log("afterCreate completed successfully");
    } catch (error) {
      console.error("Error in afterCreate:", error);
    }
  },
};

// Helper functions

/**
 * Fetch withdrawals based on filters.
 * @param filters - Filter criteria.
 * @returns A list of withdrawals.
 */
async function findWithdrawals(
  filters: Record<string, unknown>
): Promise<Withdrawal[]> {
  console.log("filters", filters);

  const res = await strapi.entityService.findMany(
    "api::retirar-ganancias-referido.retirar-ganancias-referido",
    {
      filters,
      populate: ["user"], // Include related fields
      fields: ["cantidad_retiro", "acreditado"],
    }
  );
  console.log("res", res);

  const withdrawals: Withdrawal[] = res.map((withdrawal) => ({
    id: withdrawal.id.toString(),
    user: {
      ...withdrawal.user,
      id: withdrawal.user.id.toString(), // Convert user.id to string
    },
    cantidad_retiro: withdrawal.cantidad_retiro,
    acreditado: withdrawal.acreditado,
  }));
  console.log("withdrawals", withdrawals);

  return withdrawals;
}

/**
 * Fetch user referral details.
 * @param userId - ID of the user.
 * @returns A list of user referrals.
 */
async function findUserRefs(userId: string): Promise<UserReferral[]> {
  return strapi.entityService.findMany(
    "api::usuario-referido.usuario-referido",
    {
      filters: { usuario: { id: { $eq: userId } } },
      fields: ["ganancias", "id"],
    }
  );
}

/**
 * Process withdrawals to update user referral data.
 * @param withdrawals - List of withdrawals.
 * @param condition - Condition to match (e.g., "cancelado").
 * @param deduct - Whether to deduct or add the withdrawal amount.
 */
async function processWithdrawals(
  withdrawals: Withdrawal[],
  condition: string | null,
  deduct: boolean
): Promise<void> {
  await Promise.all(
    withdrawals.map(async (withdrawal) => {
      const { user, cantidad_retiro, acreditado } = withdrawal;
      console.log("user", user);

      console.log(condition && acreditado != condition);

      // Skip processing if condition is specified and not met
      if (condition && acreditado != condition) return;

      const userRefs = await findUserRefs(user.id);
      console.log(userRefs);

      cantidad_retiro;
      await Promise.all(
        userRefs.map((userRef) =>
          strapi.entityService.update(
            "api::usuario-referido.usuario-referido",
            userRef.id,
            {
              data: {
                ganancias:
                  userRef.ganancias +
                  (deduct ? -cantidad_retiro : cantidad_retiro),
              },
            }
          )
        )
      );
    })
  );
}
