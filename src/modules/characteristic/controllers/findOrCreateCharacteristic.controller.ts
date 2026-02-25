import { AppError } from "@/utils/AppError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { FindOrCreateCharacteristicSchemaType } from "../schemas/findOrCreateCharacteristic.schema";
import { findOrCreateCharacteristic } from "../services/findOrCreateCharacteristic.service";

export const findOrCreateCharacteristicController = catchAsync(async(req:Request<{}, {}, FindOrCreateCharacteristicSchemaType>, res:Response) => {

    if (!req.tenant || !req.user) {
        throw new AppError("Tenant or user information is missing", 409);
    }    

    const characteristics = await findOrCreateCharacteristic(req.body, req.tenant, req.user);

    return res.status(200).json({
        status:"success",
        data: characteristics
    })

})