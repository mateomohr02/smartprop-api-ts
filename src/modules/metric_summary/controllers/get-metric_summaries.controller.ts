import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { getMetricSummaries } from "../services/get-metric_summaries.service";
import { SearchedMetricSchemaType } from "../schemas/SearchedMetric.schema";
import { AppError } from "@/utils/AppError";

export const getMetricSummariesController = catchAsync(
  async (req: Request<{}, {}, SearchedMetricSchemaType>, res: Response) => {

    if (!req.tenant || !req.subscription) {
      throw new AppError("Tenant or Subscription not found", 400);
    }    

    const metricSummaries = await getMetricSummaries(req.tenant, req.body, req.subscription);

    res.status(200).json({
      message: "success",
      data: metricSummaries,
    });
  },
);
