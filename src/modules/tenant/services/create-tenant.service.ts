import { Tenant } from "@/db/models/Tenant.model";
import { slugify } from "@/shared/slugify";
import { AppError } from "@/utils/AppError";
import { CreateTenantSchemaType } from "../schemas/create-tenant.schema";

export const createTenant = async (tenantData: CreateTenantSchemaType) => {

    const existingTenant = await Tenant.findOne({
        where: { email: tenantData.email }
    });

    if (existingTenant) {
        throw new AppError("Tenant already exists", 409);
    }

    const slug = slugify(tenantData.name);

    const createdTenant = await Tenant.create({
        ...tenantData,
        slug
    });

    return createdTenant;
};
