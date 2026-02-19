import { catchAsync } from "@/utils/catchAsync"
import { Request, Response } from "express";
import { createTenant } from "../services/create-tenant.service";
import { toTenantResponseDTO } from "../mappers/tenant.mapper";
import { CreateTenantSchemaType } from "../schemas/create-tenant.schema";

export const createTenantController = catchAsync( async (req: Request<{}, {}, CreateTenantSchemaType>, res: Response) => {

    const createdTenant = await createTenant(req.body);

    const response = toTenantResponseDTO(createdTenant);

    return res.status(201).json({
        status:"success",
        tenant: response
    }
    )
}) 