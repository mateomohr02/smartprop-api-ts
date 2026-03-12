import { Metric } from "@/db/models/Metric.model"
import { CreateMetricSchemaType } from "../schemas/create-metric.schema"
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto"
import { MetricType } from "@/db/models/Metric_Type.model"
import { MetricSource } from "@/db/models/Metric_Source.model"
import { AppError } from "@/utils/AppError"
import { Property } from "@/db/models/Property.model"
import { Post } from "@/db/models/Post.model"

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



  if (metric.typeSlug === "detail-property" && metric.propertyId) {
    const property = await Property.findByPk(metric.propertyId)
    
    if (!property) {
      throw new AppError("Invalid property", 400)
    }

    property.metrics.interactions += 1;
    await property.save()
  }

  if (metric.typeSlug === "detail-post" && metric.postId) {
    const post = await Post.findByPk(metric.postId)
    
    if (!post) {
      throw new AppError("Invalid post", 400)
    }

    post.metrics.interactions += 1;
    await post.save()
  }

  if (metric.typeSlug === "share-property" && metric.propertyId) {
    const property = await Property.findByPk(metric.propertyId)
    
    if (!property) {
      throw new AppError("Invalid property", 400)
    }

    property.metrics.shared += 1;
    await property.save()
  }

  if (metric.typeSlug === "share-post" && metric.postId) {
    const post = await Post.findByPk(metric.postId)
    
    if (!post) {
      throw new AppError("Invalid post", 400)
    }

    post.metrics.shared += 1;
    await post.save()
  }

  if(metric.typeSlug === "search"  && metric.propertyId){

    const property = await Property.findByPk(metric.propertyId)
    
    if (!property) {
      throw new AppError("Invalid property", 400)
    }

    property.metrics.views += 1;

    await property.save()

    //CREAR SEARCH *SI TIENE FILTROS SINO NO

    return "search"
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
