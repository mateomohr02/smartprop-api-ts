import { Country } from "@/db/models/Country.model";
import { Property } from "@/db/models/Property.model";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";

export const getAvailableCountries = async (tenant: RequestTenantDTO) => {

  const countries = await Country.findAll({
    attributes: ["id","name", "slug"],
    include: [
      {
        model: Property,
        as: "Properties",
        attributes: [],
        where: {
          tenantId: tenant.id,
          status: "active",
        },
        required: true, // INNER JOIN
      },
    ],
    group: ["Country.id"],
  });

  return countries;
};