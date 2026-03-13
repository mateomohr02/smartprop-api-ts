import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { FindOrCreateCitySchemaType } from "../schemas/findOrCreate-city.schema";
import { AppError } from "@/utils/AppError";
import { nameFormatter } from "@/shared/nameFormatter";
import { slugify } from "@/shared/slugify";
import { Province } from "@/db/models/Province.model";
import { City } from "@/db/models/City.model";

export const postCity = async (newCity: FindOrCreateCitySchemaType, tenant: RequestTenantDTO) => {

    if (newCity.exists) {
        throw new AppError("City already exists", 400)
    }

    if(!newCity.name){
        throw new AppError("City name is required", 400)
    }

    const name = nameFormatter(newCity.name);
    const slug = slugify(newCity.name);

    const existingCity = await City.findOne({
        where: { slug, provinceId: newCity.provinceId}
    })

    if (existingCity) {
        throw new AppError("City already exists", 409)    
    }

    const existingProvince = await Province.findByPk(newCity.provinceId);

    if (!existingProvince) {
        throw new AppError("Province not found", 404)
    }

    const createdCity = await City.create({
        name,
        slug,
        provinceId: existingProvince.id
    })

    return createdCity;

}