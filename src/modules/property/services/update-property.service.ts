import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { RequestUserDTO } from "@/modules/user/dtos/request-user.dto";
import { UpdatePropertySchemaType } from "../schemas/update-property.schema";
import { Property } from "@/db/models/Property.model";
import { AppError } from "@/utils/AppError";
import { simpleFieldsMapper } from "../helpers/simpleFields-updateProperty.mapper";
import { nestedFieldsMapper } from "../helpers/nestedFields-updateProperty.mapper";
import { relatedFieldsMapper } from "../helpers/relatedFields-updateProperty.mapper";
import { toCreateOrUpdatePropertyDTO } from "../mappers/toReturnCreateOrUpdatePropertyDTO";

export const updateProperty = async(receivedProperty:UpdatePropertySchemaType, tenant: RequestTenantDTO, user: RequestUserDTO) => {

    //-----------------------------------
    //VALIDATE PROPERTY BELONGS TO TENANT
    //-----------------------------------

    const property = await Property.findOne({
        where: {
            id: receivedProperty.id,
            tenantId: tenant.id,
        }
    })
    
    if (!property) {
        throw new AppError("Property not found", 404)
    }
    
    //--------------------------------------------------------------
    //ONCE VALIDATED WE MAP THE FIELDS WHICH ARE GOING TO BE UPDATED
    //--------------------------------------------------------------

    let updateData = {};

    updateData = await simpleFieldsMapper(updateData, receivedProperty);
    updateData = await nestedFieldsMapper(updateData, receivedProperty);
    updateData = await relatedFieldsMapper(updateData, receivedProperty, tenant);

    //------
    //UPDATE
    //------   

    if (Object.keys(updateData).length === 0) {
        throw new AppError("No fields provided to update", 400);
    }

    await property.update(updateData);
    
    //----------------------
    //RETURN UPDATED PROPERTY
    //----------------------

    return toCreateOrUpdatePropertyDTO(property);
}