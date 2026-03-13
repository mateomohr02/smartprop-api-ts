import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { FindOrCreateCitySchemaType } from "../schemas/findOrCreate-city.schema";
import { AppError } from "@/utils/AppError";
import { postCity } from "../services/post-city.service";

export const postCityController = catchAsync(
  async (req: Request< {}, {}, FindOrCreateCitySchemaType>, res: Response) => {

    if (!req.tenant) {
        throw new AppError("Tenant not found", 409)
    }

    const createdCity = await postCity(req.body, req.tenant);

    res.status(200).json({
        status:"success",
        data:createdCity
    })

  },
);
