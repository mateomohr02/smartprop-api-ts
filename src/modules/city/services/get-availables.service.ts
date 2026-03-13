import { Property } from "@/db/models/Property.model";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { AppError } from "@/utils/AppError";
import { GetCitiesForProvinceSchemaType } from "../schemas/getCitiesForProvince.schema";
import { City } from "@/db/models/City.model";

export const getAvailableCities = async (
  province: GetCitiesForProvinceSchemaType,
  tenant: RequestTenantDTO,
) => {

  if (!tenant) {
    throw new AppError("Tenant required", 400);
  }

  const where: any = {
    tenantId: tenant.id,
    status: "active",
  };

  if (province) {
    where.provinceId = province.id;
  }

  const availableCities = await City.findAll({
    attributes: ["id", "name", "slug", "provinceId"],
    include: [
      {
        model: Property,
        as: "Properties",
        attributes: [],
        where,
        required: true,
      },
    ],
    group: ["City.id"],
  });

  return availableCities;
};
