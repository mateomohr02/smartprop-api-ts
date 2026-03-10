import { PlanFeatures } from "@/db/models/Plan.model";
import { SubscriptionStatus } from "@/db/models/Subscription.model";

export interface RequestSubscriptionDTO {
    status: SubscriptionStatus
    features: PlanFeatures
    startedAt: Date
    endsAt: Date
}