import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { CreateMetricSchemaType } from "../schemas/create-metric.schema";
import { AppError } from "@/utils/AppError";
import { createMetric } from "../services/create-metric.service";

export const createMetricController = catchAsync(async (req: Request<{},{}, CreateMetricSchemaType>, res: Response) => {
    
    if(!req.tenant) {
        throw new AppError("Tenant not found", 404);
    }

    await createMetric(req.body, req.tenant)
    
    res.status(201).json({
        status:"success"
    })
}) 