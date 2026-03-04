import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { generateMetricSummaries } from "../services/create-metric_summary.service";

export const createMetricSummariesController = catchAsync(async (req: Request, res:Response) => {
  
  await generateMetricSummaries()

  res.status(200).json({status:"success"})
});
