import { PlanFeatures } from "@/db/models/Plan.model"

export interface RequestPlanDTO {
    isActive: boolean
    features: PlanFeatures
}