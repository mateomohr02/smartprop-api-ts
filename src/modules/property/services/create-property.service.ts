import { AppError } from "@/utils/AppError";
import { CreatePropertySchemaType } from "../schemas/create-property.schema";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { RequestUserDTO } from "@/modules/user/dtos/request-user.dto";
import { Property } from "@/db/models/Property.model";
import { PropertyType } from "@/db/models/PropertyType.model";
import { slugify } from "@/shared/slugify";
import { toCreateOrUpdatePropertyDTO } from "../mappers/toReturnCreateOrUpdatePropertyDTO";

export const createProperty = async (
  newPropertyData: CreatePropertySchemaType,
  tenant: RequestTenantDTO,
  user: RequestUserDTO,
) => {
  if (
    !newPropertyData.title &&
    !newPropertyData.description &&
    !newPropertyData.propertyType
  ) {
    throw new AppError("Missing Parameters to create Property", 409);
  }

  let propertyType;

  if (newPropertyData.propertyType) {
    if (newPropertyData.propertyType.exists) {
      propertyType = await PropertyType.findByPk(
        newPropertyData.propertyType.id,
      );
    } else {
      if (!newPropertyData.propertyType.name) {
        throw new AppError("Missing Parameters to create Property Type", 409);
      }
      try {
        propertyType = await PropertyType.create({
          tenantId: tenant.id,
          name: newPropertyData.propertyType.name,
          slug: slugify(newPropertyData.propertyType.name),
        });
      } catch (error: any) {
        if (error.name === "SequelizeUniqueConstraintError") {
          throw new AppError(
            "Property type already exists for this tenant",
            409,
          );
        }
        throw error;
      }
    }
  }

  const createdProperty = await Property.create({
    tenantId: tenant.id,
    title: newPropertyData.title ? newPropertyData.title : null,
    description: newPropertyData.description
      ? newPropertyData.description
      : null,
    propertyTypeId: propertyType?.id ? propertyType.id : null,
  });

  return toCreateOrUpdatePropertyDTO(createdProperty);
};
