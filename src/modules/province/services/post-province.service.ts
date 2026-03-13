import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { FindOrCreateProvinceSchemaType } from "../schemas/findOrCreate-province.schema";
import { AppError } from "@/utils/AppError";
import { nameFormatter } from "@/shared/nameFormatter";
import { slugify } from "@/shared/slugify";
import { Province } from "@/db/models/Province.model";
import { Country } from "@/db/models/Country.model";

export const postProvince = async (newProvince: FindOrCreateProvinceSchemaType, tenant: RequestTenantDTO) => {

    if (newProvince.exists) {
        throw new AppError("Province already exists", 400)
    }

    if(!newProvince.name){
        throw new AppError("Province name is required", 400)
    }

    const name = nameFormatter(newProvince.name);
    const slug = slugify(newProvince.name);

    const existingProvince = await Province.findOne({
        where: { slug, countryId: newProvince.countryId }
    })

    if (existingProvince) {
        throw new AppError("Province already exists", 409)    
    }

    const existingCountry = await Country.findByPk(newProvince.countryId);

    if (!existingCountry) {
        throw new AppError("Country not found", 404)
    }

    const createdProvince = await Province.create({
        name,
        slug,
        countryId: existingCountry.id
    })

    return createdProvince;

}