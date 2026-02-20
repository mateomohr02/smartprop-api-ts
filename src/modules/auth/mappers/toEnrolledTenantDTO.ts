import { Tenant } from "@/db/models/Tenant.model";
import { User } from "@/db/models/User.model";

export const toEnrolledTenantDTO = (tenant: Tenant, user: User) => {
    return {
    tenant: {
        name: tenant.name,
        email: tenant.email
    },
    user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email
    }
    }

}