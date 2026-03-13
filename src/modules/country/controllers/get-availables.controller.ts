import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { getAvailableCountries } from "../services/get-availableCountries.service";
import { AppError } from "@/utils/AppError";

export const getAvailableCountriesController = catchAsync( async (req:Request, res:Response) => {

    if (!req.tenant) {
        throw new AppError("Missing tenant.", 401);
    }

    const availableCountries = await getAvailableCountries(req.tenant);

    res.status(200).json({
        status:"success",
        data:  availableCountries 
    })

});