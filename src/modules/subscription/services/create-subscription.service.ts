import { sequelize } from "@/db/sequelize";
import { Plan } from "@/db/models/Plan.model";
import { Subscription } from "@/db/models/Subscription.model";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { CreateSubscriptionSchemaType } from "../schemas/create-subscription.schema";
import { AppError } from "@/utils/AppError";
import { UniqueConstraintError } from "sequelize";


function addBillingCycle(baseDate: Date, cycle: CreateSubscriptionSchemaType["billingCycle"]): Date {
  const expirationDate = new Date(baseDate);

  switch (cycle) {
    case "monthly":
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      break;
    case "quarterly":
      expirationDate.setMonth(expirationDate.getMonth() + 3);
      break;
    case "semester":
      expirationDate.setMonth(expirationDate.getMonth() + 6);
      break;
    case "yearly":
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      break;
    default:
      throw new AppError("Invalid billing cycle", 409);
  }

  return expirationDate;
}

export const createSubscription = async (
  newSubscription: CreateSubscriptionSchemaType,
  tenant: RequestTenantDTO
) => {

  try {

    return await sequelize.transaction(async (t) => {

      const plan = await Plan.findByPk(newSubscription.planId, {
        transaction: t,
      });

      if (!plan) {
        throw new AppError("Plan not found", 404);
      }

      const now = new Date();
      const expirationDate = addBillingCycle(now, newSubscription.billingCycle);

      //---------------------------------------------------
      // FALTA - VALIDACIÓN DEL PAGO
      //---------------------------------------------------

      const subscription = await Subscription.create(
        {
          billingCycle: newSubscription.billingCycle,
          autoRenew: newSubscription.autoRenew,
          priceSnapshot: plan.price,
          featuresSnapshot: plan.features,
          status: "active", // luego podría depender del pago
          startedAt: now,
          endsAt: expirationDate,
          tenantId: tenant.id,
          planId: plan.id,
        },
        { transaction: t }
      );

      return subscription;
    });

  } catch (error) {

    // Si viola índice único parcial
    if (error instanceof UniqueConstraintError) {
      throw new AppError("Tenant already has an active subscription", 409);
    }

    throw new AppError("Error creating subscription", 500);
  }
};