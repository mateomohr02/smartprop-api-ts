import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { CreatePropertySchemaType } from "../schemas/create-property.schema";
import { AppError } from "@/utils/AppError";
import { createProperty } from "../services/create-property.service";

export const createPropertyController = catchAsync( async ( req : Request<{}, {}, CreatePropertySchemaType>, res : Response ) =>  {
    
    if (!req.tenant || !req.user) {
        throw new AppError("Missing tenant or user.", 401);
    }

    const createdProperty = await createProperty(req.body, req.tenant, req.user);

    return res.status(200).json({
        status:"success",
        data: createdProperty
    
    })

})