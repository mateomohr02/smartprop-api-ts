import { AppError } from "@/utils/AppError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { getAvailableNeighborhoods } from "../services/get-availables.service";
import { GetNeighborhoodsForCitySchemaType } from "../schemas/getNeighborhoodsForCity.schema";

export const getAvailableNeighborhoodsController = catchAsync(
  async (
    req: Request<{}, {}, GetNeighborhoodsForCitySchemaType>,
    res: Response,
  ) => {
    if (!req.tenant) {
      throw new AppError("Tenant not found", 409);
    }

    const availableNeighborhoods = await getAvailableNeighborhoods(
      req.body,
      req.tenant,
    );

    res.status(200).json({
      status: "success",
      data: availableNeighborhoods,
    });
  },
);
