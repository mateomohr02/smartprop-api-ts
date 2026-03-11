import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { SearchedMetricSchemaType } from "../schemas/SearchedMetric.schema";
import { MetricType } from "@/db/models/Metric_Type.model";
import { AppError } from "@/utils/AppError";
import { MetricSource } from "@/db/models/Metric_Source.model";
import { Metric_Summary } from "@/db/models/Metric_Summary.model";
import { WhereOptions } from "sequelize";
import { Op } from "sequelize";
import { RequestSubscriptionDTO } from "@/modules/subscription/dtos/request-subscription.dto";

export const getMetricSummaries = async (
  tenant: RequestTenantDTO,
  searchedMetric: SearchedMetricSchemaType,
  subscription: RequestSubscriptionDTO,
) => {
  const metricType = await MetricType.findOne({
    where: {
      slug: searchedMetric.typeSlug,
    },
  });

  if (!metricType) {
    throw new AppError("Metric type not found", 400);
  }

  let sourceId: string | undefined;

  if (searchedMetric?.sourceSlug) {
    const source = await MetricSource.findOne({
      where: {
        slug: searchedMetric.sourceSlug,
      },
    });

    if (!source) {
      throw new AppError("Metric source not found", 400);
    }

    sourceId = source.id;
  }

  let attributes: string[];

  if (subscription?.features?.metrics === "base") {
    attributes = [
      "amount",
      "periodStart",
      "period",
      "tenantId",
      "typeId",
      "propertyId",
      "postId",
    ];
  } else {
    attributes = [
      "amount",
      "periodStart",
      "period",
      "tenantId",
      "typeId",
      "sourceId",
      "campaignId",
      "propertyId",
      "postId",
    ];
  }

  const where: WhereOptions = {
    tenantId: tenant.id,
    typeId: metricType.id,
    period: searchedMetric.period,
    periodStart: {
      [Op.gte]: searchedMetric.periodStart,
    },
    ...(subscription?.features?.metrics === "segmented" &&
      sourceId && { sourceId }),
    ...(subscription?.features?.metrics === "segmented" &&
      searchedMetric.campaignId && { campaignId: searchedMetric.campaignId }),
    ...(searchedMetric.propertyId && { propertyId: searchedMetric.propertyId }),
    ...(searchedMetric.postId && { postId: searchedMetric.postId }),
  };

  const metricSummaries = await Metric_Summary.findAll({
    where,
    attributes,
  });

  return metricSummaries;
};
