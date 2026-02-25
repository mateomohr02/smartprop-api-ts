import { AppError } from "@/utils/AppError";
import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { findOrCreateComodity } from "../services/findOrCreateComodity.service";
import { FindOrCreateComoditySchemaType } from "../schemas/findOrCreateComodity.schema";

export const findOrCreateComodityController = catchAsync(async(req:Request<{}, {}, FindOrCreateComoditySchemaType>, res:Response) => {

    if (!req.tenant || !req.user) {
        throw new AppError("Tenant or user information is missing", 409);
    }    

    const comodities = await findOrCreateComodity(req.body, req.tenant, req.user);

    return res.status(200).json({
        status:"success",
        data: comodities
    })

})