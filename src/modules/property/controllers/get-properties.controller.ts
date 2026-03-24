import { AppError } from "@/utils/AppError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { getProperties } from "../services/get-properties.service";

export const getPropertiesController = catchAsync(async (req:Request, res:Response) => {

    if (!req.tenant) {
        throw new AppError("Missing tenant.", 401);
    }

    const properties = await getProperties(req.tenant);


    res.status(200).json({
        status:"success",
        data: properties
    })



})