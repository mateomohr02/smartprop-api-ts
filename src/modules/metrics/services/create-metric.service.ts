import { Metric } from "@/db/models/Metric.model"
import { CreateMetricSchemaType } from "../schemas/create-metric.schema"
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto"
import { MetricType } from "@/db/models/Metric_Type.model"
import { MetricSource } from "@/db/models/Metric_Source.model"
import { AppError } from "@/utils/AppError"

export const createMetric = async (
  metric: CreateMetricSchemaType,
  tenant: RequestTenantDTO
) => {
  
  const type = await MetricType.findOne({
    where: {
      slug: metric.typeSlug
    }
  })

  const source = await MetricSource.findOne({
    where: {
      slug: metric.sourceSlug
    }
  })

  if (!type || !source){
    throw new AppError("Invalid type or source", 400)
  }

  const newMetricData = {
    tenantId: tenant.id,
    typeId: type.id,
    sourceId: source.id,
    propertyId: metric.propertyId || "00000000-0000-0000-0000-000000000000",
    postId: metric.postId || "00000000-0000-0000-0000-000000000000",
    campaignId: metric.campaignId || "00000000-0000-0000-0000-000000000000"
  }

  const newMetric = await Metric.create(newMetricData)

  return newMetric

}
