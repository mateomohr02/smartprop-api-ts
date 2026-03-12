import { Country } from "@/db/models/Country.model";
import { Property } from "@/db/models/Property.model";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";

export const getAvailableCountries = async (tenant: RequestTenantDTO) => {

    const availableCountriesForTenant = await Property.findAll({
        where: {tenantId: tenant.id},
        include: {
            model: Country,
            as: 'country'
        }
    })

    console.log(availableCountriesForTenant, 'availableCountries');

}