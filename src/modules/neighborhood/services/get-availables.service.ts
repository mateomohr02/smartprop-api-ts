import { Property } from "@/db/models/Property.model";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { AppError } from "@/utils/AppError";
import { GetNeighborhoodsForCitySchemaType } from "../schemas/getNeighborhoodsForCity.schema";
import { Neighborhood } from "@/db/models/Neighborhood.model";

export const getAvailableNeighborhoods = async (
  city: GetNeighborhoodsForCitySchemaType,
  tenant: RequestTenantDTO,
) => {

  if (!tenant) {
    throw new AppError("Tenant required", 400);
  }

  const where: any = {
    tenantId: tenant.id,
    status: "active",
  };

  if (city) {
    where.cityId = city.id;
  }

  const availableNeighborhoods = await Neighborhood.findAll({
    attributes: ["id", "name", "slug", "cityId"],
    include: [
      {
        model: Property,
        as: "Properties",
        attributes: [],
        where,
        required: true,
      },
    ],
    group: ["Neighborhood.id"],
  });

  return availableNeighborhoods;
};
