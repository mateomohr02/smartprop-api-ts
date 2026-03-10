import { Subscription } from "@/db/models/Subscription.model";
import { RequestSubscriptionDTO } from "../dtos/request-subscription.dto";

export const toRequestSubscriptionDTOMapper = (
  sub: Subscription,
): RequestSubscriptionDTO => {
  return {
    status: sub.status,
    startedAt: sub.startedAt,
    features: sub.featuresSnapshot,
    endsAt: sub.endsAt,
  };
};
