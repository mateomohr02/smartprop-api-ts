import { Request, Response } from "express";
import { enrollTenant } from "../services/enroll-tenant.service";
import { EnrollTenantSchemaType } from "../schema/enroll-tenant.schema";
import { catchAsync } from "@/utils/catchAsync";

export const enrollTenantController = catchAsync ( async (req: Request<{}, {}, EnrollTenantSchemaType>, res: Response) => {

    const enrolledTenant = await enrollTenant(req.body);

    return res.status(200).json({
        status: "success",
        data: enrolledTenant
    })

})