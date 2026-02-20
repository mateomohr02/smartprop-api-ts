import { Request, Response } from "express";
import { enrollTenant } from "../services/enroll-tenant.service";
import { EnrollTenantSchemaType } from "../schema/enroll-tenant.schema";

export const enrollTenantController = (req: Request<{}, {}, EnrollTenantSchemaType>, res: Response) => {

    const enrolledTenant = enrollTenant(req.body);

    return res.status(200).json({
        status: "success",
        data: enrollTenant
    })

}