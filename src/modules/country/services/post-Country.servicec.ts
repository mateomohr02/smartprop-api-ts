import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { RequestUserDTO } from "@/modules/user/dtos/request-user.dto";
import { FindOrCreateCountrySchemaType } from "../schemas/findOrCreate-country.schema";
import { nameFormatter } from "@/shared/nameFormatter";
import { slugify } from "@/shared/slugify";
import { Country } from "@/db/models/Country.model";
import { AppError } from "@/utils/AppError";

export const postCountry = async (
  country: FindOrCreateCountrySchemaType,
  tenant: RequestTenantDTO,
  user: RequestUserDTO
) => {

  if (country.exists) {
    throw new AppError("Country already exists", 400);
  }

  if (!country.name) {
    throw new AppError("Country name is required", 400);
  }

  const name = nameFormatter(country.name);
  const slug = slugify(country.name);

  const existingCountry = await Country.findOne({
    where: { slug }
  });

  if (existingCountry) {
    throw new AppError("Country already exists", 409);
  }

  const createdCountry = await Country.create({
    name,
    slug
  });

  return createdCountry;
};