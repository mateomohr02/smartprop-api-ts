import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";

import { catchAsync } from "@/utils/catchAsync";
import { AppError } from "@/utils/AppError";

import { Subscription } from "@/db/models/Subscription.model";
import { toRequestSubscriptionDTOMapper } from "@/modules/subscription/mappers/request-subscription.mapper";

export const validateSubscription = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.tenant) {
      throw new AppError("Tenant not found", 400);
    }

    const subscription = await Subscription.findOne({
      where: {
        tenantId: req.tenant.id,
        status: {
          [Op.in]: ["active", "past_due"],
        },
      },
      order: [["endsAt", "DESC"]],
    });

    if (!subscription) {
      throw new AppError("No active subscription", 403);
    }

    if (subscription.endsAt < new Date()) {
      throw new AppError("Subscription expired", 403);
    }

    req.subscription = toRequestSubscriptionDTOMapper(subscription);
    
    next();
  },
);
