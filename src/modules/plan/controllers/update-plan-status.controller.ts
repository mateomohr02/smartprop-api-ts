import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { UpdatePlanSchemaType } from "../schemas/update-PlanStatus.schema";
import { updatePlanStatus } from "../services/update-plan-status.service";

export const updatePlanStatusController = catchAsync(
  async (
    req: Request<{ planId: string }, {}, UpdatePlanSchemaType>,
    res: Response,
  ) => {
    const updatedPlan = await updatePlanStatus(req.body, req.params.planId);

    return res.status(200).json({
      status: "success",
      data: updatedPlan,
    });
  },
);
