import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { updateProperty } from "../services/update-property.service";
import { UpdatePropertySchemaType } from "../schemas/update-property.schema";

export const updatePropertyController = catchAsync (async (req: Request<{}, {}, UpdatePropertySchemaType>, res: Response) => {

    if (!req.tenant || !req.user) {
        throw new AppError("Missing tenant or user.", 401);
    }

    const updatedProperty = await updateProperty(req.body, req.tenant, req.user );


    return res.status(200).json({
        status:"success",
        data:updatedProperty
    })

})