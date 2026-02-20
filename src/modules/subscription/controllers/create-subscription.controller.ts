import { Request, Response } from "express";
import { catchAsync } from "@/utils/catchAsync";
import { CreateSubscriptionSchemaType } from "../schemas/create-subscription.schema";
import { createSubscription } from "../services/create-subscription.service";
import { AppError } from "@/utils/AppError";

export const createSubscriptionController = catchAsync(async (req: Request<{}, {}, CreateSubscriptionSchemaType>, res:Response) => {

    if (!req.tenant) {
        throw new AppError("Tenant not found", 404);
    }

    const newSubscription = await createSubscription(req.body, req.tenant);

    return res.status(200).json({
        status: "success",
        data: newSubscription
    })

})