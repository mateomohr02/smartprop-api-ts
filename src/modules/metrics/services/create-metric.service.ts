import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { CreateMetricSchemaType } from "../schemas/create-metric.schema";
import { AppError } from "@/utils/AppError";
import { Metric } from "@/db/models/Metric.model";

export const createMetric = async (
  metric: CreateMetricSchemaType,
  tenant: RequestTenantDTO,
) => {

  if (metric.postId && metric.propertyId) {
    throw new AppError("Metric must have either postId or propertyId, not both", 400);
  }

  const metadata = metric.campaignId ? { campaignId: metric.campaignId } : null;

  const metricData = {
    tenantId: tenant.id,
    postId: metric.postId || null,
    source: metric.source || 'organic',
    propertyId: metric.propertyId || null,    
    type: metric.type,
    metadata    
  }

  const createdMetric = await Metric.create(metricData)

  return createdMetric;
};
