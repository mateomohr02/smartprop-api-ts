import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { SearchedMetricSchemaType } from "../schemas/SearchedMetric.schema";
import { MetricType } from "@/db/models/Metric_Type.model";
import { AppError } from "@/utils/AppError";
import { MetricSource } from "@/db/models/Metric_Source.model";
import { Metric_Summary } from "@/db/models/Metric_Summary.model";
import { WhereOptions } from "sequelize";
import { Op } from "sequelize";

export const getMetricSummaries = async (
  tenant: RequestTenantDTO,
  searchedMetric: SearchedMetricSchemaType,
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

  if (searchedMetric.sourceSlug) {
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

  const where: WhereOptions = {
    tenantId: tenant.id,
    typeId: metricType.id,
    period: searchedMetric.period,
    periodStart: {
      [Op.gte]: searchedMetric.periodStart,
    },
    ...(sourceId && { sourceId }),
    ...(searchedMetric.campaignId && { campaignId: searchedMetric.campaignId }),
    ...(searchedMetric.propertyId && { propertyId: searchedMetric.propertyId }),
    ...(searchedMetric.postId && { postId: searchedMetric.postId }),
  };

  console.log(where);

  const metricSummaries = await Metric_Summary.findAll({
    where,
  });

  return metricSummaries;
};
