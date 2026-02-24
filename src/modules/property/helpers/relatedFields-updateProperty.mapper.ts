import { PropertyType } from "@/db/models/PropertyType.model";
import { UpdatePropertySchemaType } from "../schemas/update-property.schema";
import { slugify } from "@/shared/slugify";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";

export const relatedFieldsMapper = async (
  updateData: any,
  fields: UpdatePropertySchemaType,
  tenant: RequestTenantDTO,
) => {

  console.log(updateData, 'incoming fields related');
  

  if (fields.propertyType) {
    let updatePropertyType;

    if (fields.propertyType.exists && fields.propertyType.id) {
      updatePropertyType = await PropertyType.findByPk(fields.propertyType.id);
    } else if (!fields.propertyType.exists && fields.propertyType.name) {
      updatePropertyType = await PropertyType.create({
        tenantId: tenant.id,
        name: fields.propertyType.name,
        slug: slugify(fields.propertyType.name),
      });
    }

    updateData.propertyTypeId = fields.propertyType.id;
  }

  if (fields.country) {
    let country;
    if (fields.country.exists && fields.country.id) {
      country = await PropertyType.findByPk(fields.country.id);
    } else if (!fields.country.exists && fields.country.name) {
      country = await PropertyType.create({
        tenantId: tenant.id,
        name: fields.country.name,
        slug: slugify(fields.country.name),
      });
    }

    updateData.countryId = fields.country.id;
  }

  if (fields.province) {
    let province;
    if (fields.province.exists && fields.province.id) {
      province = await PropertyType.findByPk(fields.province.id);
    } else if (!fields.province.exists && fields.province.name) {
      province = await PropertyType.create({
        tenantId: tenant.id,
        name: fields.province.name,
        slug: slugify(fields.province.name),
      });
    }

    updateData.provinceId = fields.province.id;
  }

  if (fields.city) {
    let city;
    if (fields.city.exists && fields.city.id) {
      city = await PropertyType.findByPk(fields.city.id);
    } else if (!fields.city.exists && fields.city.name) {
      city = await PropertyType.create({
        tenantId: tenant.id,
        name: fields.city.name,
        slug: slugify(fields.city.name),
      });
    }

    updateData.cityId = fields.city.id;
  }

  if (fields.neighborhood) {
    let neighborhood;
    if (fields.neighborhood.exists && fields.neighborhood.id) {
      neighborhood = await PropertyType.findByPk(fields.neighborhood.id);
    } else if (!fields.neighborhood.exists && fields.neighborhood.name) {
      neighborhood = await PropertyType.create({
        tenantId: tenant.id,
        name: fields.neighborhood.name,
        slug: slugify(fields.neighborhood.name),
      });
    }

    updateData.neighborhoodId = fields.neighborhood.id;
  }

  console.log(updateData, 'outgoing fields related');

  return updateData;
};
