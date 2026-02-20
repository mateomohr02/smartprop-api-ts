import { Plan } from "@/db/models/Plan.model";
import { CreatePlanSchemaType } from "../schemas/createPlan.schema";
import { slugify } from "@/shared/slugify";
import { AppError } from "@/utils/AppError";

export const createPlan = async (newPlan: CreatePlanSchemaType) => {

    const newPlanData = {...newPlan, slug: slugify(newPlan.name)}

    const planexists = await Plan.findOne({
        where: {
            slug: newPlanData.slug
        }
    })

    if (planexists) {
        throw new AppError("Plan already exists", 409)
    }

    const createdPlan = await Plan.create(newPlanData);

    return createdPlan;
}