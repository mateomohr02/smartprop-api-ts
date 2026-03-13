import { Property } from "@/db/models/Property.model";
import { Province } from "@/db/models/Province.model";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { AppError } from "@/utils/AppError";
import { GetProvincesForCountrySchemaType } from "../schemas/getProvincesForCountry.schema";

export const getAvailableProvinces = async (
  country: GetProvincesForCountrySchemaType,
  tenant: RequestTenantDTO,
) => {
  if (!tenant) {
    throw new AppError("Country and Tenant required", 400);
  }

  const where: any = {
    tenantId: tenant.id,
    status: "active",
  };

  if (country) {
    where.countryId = country.id;
  }

  const availableProvinces = await Province.findAll({
    attributes: ["id", "name", "slug", "countryId"],
    include: [
      {
        model: Property,
        as: "Properties",
        attributes: [],
        where,
        required: true,
      },
    ],
    group: ["Province.id"],
  });

  return availableProvinces;
};
