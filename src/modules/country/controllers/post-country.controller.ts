import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { FindOrCreateCountrySchemaType } from "../schemas/findOrCreate-country.schema";
import { postCountry } from "../services/post-Country.servicec";
import { AppError } from "@/utils/AppError";

export const postCountryController = catchAsync( async ( req:Request<{},{}, FindOrCreateCountrySchemaType >, res: Response ) => {

    if (!req.tenant || !req.user) {
        throw new AppError("Missing Tenant or User data", 401)
    }

    const createdCountry = await postCountry(req.body, req.tenant, req.user)

    res.status(200).json({
        message: "success",
        data: createdCountry
    })

})