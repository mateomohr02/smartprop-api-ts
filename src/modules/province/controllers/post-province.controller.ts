import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { FindOrCreateProvinceSchemaType } from "../schemas/findOrCreate-province.schema";
import { AppError } from "@/utils/AppError";
import { postProvince } from "../services/post-province.service";

export const postProvinceController = catchAsync(
  async (req: Request< {}, {}, FindOrCreateProvinceSchemaType>, res: Response) => {

    if (!req.tenant) {
        throw new AppError("Tenant not found", 409)
    }

    const createdProvince = await postProvince(req.body, req.tenant);

    res.status(200).json({
        status:"success",
        data:null
    })

  },
);
