import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { FindOrCreateNeighborhoodSchemaType } from "../schemas/findOrCreate-neighborhood.schema";
import { AppError } from "@/utils/AppError";
import { nameFormatter } from "@/shared/nameFormatter";
import { slugify } from "@/shared/slugify";
import { City } from "@/db/models/City.model";
import { Neighborhood } from "@/db/models/Neighborhood.model";

export const postNeighborhood = async (newNeighborhood: FindOrCreateNeighborhoodSchemaType, tenant: RequestTenantDTO) => {

    if (newNeighborhood.exists) {
        throw new AppError("Neighborhood already exists", 400)
    }

    if(!newNeighborhood.name){
        throw new AppError("Neighborhood name is required", 400)
    }

    const name = nameFormatter(newNeighborhood.name);
    const slug = slugify(newNeighborhood.name);

    const existingNeighborhood = await Neighborhood.findOne({
        where: { slug, cityId: newNeighborhood.cityId }
    })

    if (existingNeighborhood) {
        throw new AppError("City already exists", 409)    
    }

    const existingCity = await City.findByPk(newNeighborhood.cityId);

    if (!existingCity) {
        throw new AppError("City not found", 404)
    }

    const createdNeighborhood = await Neighborhood.create({
        name,
        slug,
        cityId: existingCity.id
    })

    return createdNeighborhood;
}