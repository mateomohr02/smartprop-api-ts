import { Property } from "@/db/models/Property.model";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";

export const getProperties = async ( tenant: RequestTenantDTO, filters?: any) => {

    console.log(filters, 'filters');
    

    const properties = await Property.findAll({
        where: {
            tenantId: tenant.id,
            ...filters
        },            
    })

    console.log(properties, 'properties found');
    
    return properties;

}