import { AppError } from "@/utils/AppError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { GetCitiesForProvinceSchemaType } from "../schemas/getCitiesForProvince.schema";
import { getAvailableCities } from "../services/get-availables.service";

export const getAvailableCitiessController = catchAsync(
  async (
    req: Request<{}, {}, GetCitiesForProvinceSchemaType>,
    res: Response,
  ) => {
    if (!req.tenant) {
      throw new AppError("Tenant not found", 409);
    }

    const availableCities = await getAvailableCities(
      req.body,
      req.tenant,
    );

    res.status(200).json({
      status: "success",
      data: availableCities,
    });
  },
);
