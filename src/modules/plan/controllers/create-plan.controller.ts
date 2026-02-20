import { Request, Response } from "express";
import { CreatePlanSchemaType } from "../schemas/createPlan.schema";
import { createPlan } from "../services/create-plan.service";
import { catchAsync } from "@/utils/catchAsync";

export const createPlanController = catchAsync( async (req: Request<{}, {}, CreatePlanSchemaType>, res: Response) => {
    const createdPlan = await createPlan(req.body);

    return res.status(200).json({
      status: "success",
      data: createdPlan,
    });
  },
);
