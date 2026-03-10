import { Plan } from "@/db/models/Plan.model";
import { RequestPlanDTO } from "../dtos/request-plan.dto";

export const toRequestPlanDTOMapper = (plan: Plan) : RequestPlanDTO => {
  return {
    isActive: plan.isActive,
    features: plan.features,
  };
};
