import { PropertyType } from "@/db/models/PropertyType.model";
import { UpdatePropertySchemaType } from "../schemas/update-property.schema";
import { slugify } from "@/shared/slugify";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { Country } from "@/db/models/Country.model";
import { Province } from "@/db/models/Province.model";
import { City } from "@/db/models/City.model";
import { Neighborhood } from "@/db/models/Neighborhood.model";
import { AppError } from "@/utils/AppError";
import { nameFormatter } from "@/shared/nameFormatter";
import { Property } from "@/db/models/Property.model";

export const relatedFieldsMapper = async (
  updateData: any,
  fields: UpdatePropertySchemaType,
  tenant: RequestTenantDTO,
  property: Property
) => {
  

  if (!property) {
    throw new AppError("Property not found", 404)
  }

  let countryId: string | undefined = property.countryId;
  let provinceId: string | undefined = property.provinceId;
  let cityId: string | undefined = property.cityId;
  let neighborhoodId: string | undefined = property.neighborhoodId;

  // ---------------- PROPERTY TYPE ----------------
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

    updateData.propertyTypeId = updatePropertyType?.id;
  }

  // ---------------- COUNTRY ----------------
  if (fields.country) {
    if (fields.country.exists) {
      const country = await Country.findByPk(fields.country.id);

      if (!country) throw new AppError("Country not found", 404);

      countryId = country.id;
    } else {
      const country = await Country.create({
        name: nameFormatter(fields.country.name!),
        slug: slugify(fields.country.name!),
      });

      countryId = country.id;
    }
  }

  // ---------------- PROVINCE ----------------
  if (fields.province) {
    const finalCountryId = fields.province.countryId || countryId;

    if (!finalCountryId) {
      throw new AppError("Province requires countryId", 400);
    }

    if (fields.province.exists) {
      const province = await Province.findByPk(fields.province.id);

      if (!province) throw new AppError("Province not found", 404);

      if (province.countryId !== finalCountryId) {
        throw new AppError("Province does not belong to country", 400);
      }

      provinceId = province.id;
      countryId = province.countryId; // 🔥 sync
    } else {
      const province = await Province.create({
        name: nameFormatter(fields.province.name!),
        slug: slugify(fields.province.name!),
        countryId: finalCountryId,
      });

      provinceId = province.id;
      countryId = finalCountryId;
    }
  }

  // ---------------- CITY ----------------
  if (fields.city) {
    const finalProvinceId = fields.city.provinceId || provinceId;

    if (!finalProvinceId) {
      throw new AppError("City requires provinceId", 400);
    }

    if (fields.city.exists) {
      const city = await City.findByPk(fields.city.id);

      if (!city) throw new AppError("City not found", 404);

      if (city.provinceId !== finalProvinceId) {
        throw new AppError("City does not belong to province", 400);
      }

      cityId = city.id;
      provinceId = city.provinceId; // 🔥 sync
    } else {
      const city = await City.create({
        name: nameFormatter(fields.city.name!),
        slug: slugify(fields.city.name!),
        provinceId: finalProvinceId,
      });

      cityId = city.id;
      provinceId = finalProvinceId;
    }
  }

  // ---------------- NEIGHBORHOOD ----------------
  if (fields.neighborhood) {
    const finalCityId = fields.neighborhood.cityId || cityId;

    if (!finalCityId) {
      throw new AppError("Neighborhood requires cityId", 400);
    }

    if (fields.neighborhood.exists) {
      const neighborhood = await Neighborhood.findByPk(
        fields.neighborhood.id
      );

      if (!neighborhood)
        throw new AppError("Neighborhood not found", 404);

      if (neighborhood.cityId !== finalCityId) {
        throw new AppError(
          "Neighborhood does not belong to city",
          400
        );
      }

      neighborhoodId = neighborhood.id;
      cityId = neighborhood.cityId; // 🔥 sync
    } else {
      const neighborhood = await Neighborhood.create({
        name: nameFormatter(fields.neighborhood.name!),
        slug: slugify(fields.neighborhood.name!),
        cityId: finalCityId,
      });

      neighborhoodId = neighborhood.id;
      cityId = finalCityId;
    }
  }

  updateData = {
    ...updateData,
    countryId,
    provinceId,
    cityId,
    neighborhoodId,
  };

  return updateData;
};