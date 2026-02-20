import { Plan } from "@/db/models/Plan.model";
import { UpdatePlanSchemaType } from "../schemas/update-PlanStatus.schema";
import { AppError } from "@/utils/AppError";

export const updatePlanStatus = async (newStatus: UpdatePlanSchemaType, planId: string) => {

    const plan = await Plan.findByPk(planId);

    if (!plan) {
        throw new AppError("Plan not found", 409);
    }
    
    plan.isActive = newStatus.isActive;

    await plan.save();

    return plan;
}