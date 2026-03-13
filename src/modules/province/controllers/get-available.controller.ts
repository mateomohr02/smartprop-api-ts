import { AppError } from "@/utils/AppError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { GetProvincesForCountrySchemaType } from "../schemas/getProvincesForCountry.schema";
import { getAvailableProvinces } from "../services/get-availables.service";

export const getAvailableProvincesController = catchAsync(
  async (
    req: Request<{}, {}, GetProvincesForCountrySchemaType>,
    res: Response,
  ) => {
    if (!req.tenant) {
      throw new AppError("Tenant not found", 409);
    }

    const availableProvinces = await getAvailableProvinces(
      req.body,
      req.tenant,
    );

    res.status(200).json({
      status: "success",
      data: availableProvinces,
    });
  },
);
