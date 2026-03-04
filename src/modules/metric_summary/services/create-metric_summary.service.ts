import { Op, fn, col, literal } from "sequelize";
import { sequelize } from "@/db/sequelize";
import { Metric } from "@/db/models/Metric.model";
import { Metric_Summary } from "@/db/models/Metric_Summary.model";

type Period = "day" | "month";

function getDateTrunc(period: Period) {
  switch (period) {
    case "day":
      return "day";
    case "month":
      return "month";
  }
}

export async function generateMetricSummaries() {
  const periods: Period[] = ["day", "month"];

  await sequelize.transaction(async (transaction) => {
    for (const period of periods) {
      const dateTrunc = getDateTrunc(period);

      const metrics = await Metric.findAll({
        attributes: [
          "tenantId",
          "typeId",
          "sourceId",
          "campaignId",
          "propertyId",
          "postId",
          [fn("date_trunc", dateTrunc, col("createdAt")), "periodStart"],
          [fn("COUNT", col("id")), "amount"],
        ],
        group: [
          "tenantId",
          "typeId",
          "sourceId",
          "campaignId",
          "propertyId",
          "postId",
          "periodStart", 
        ],
        raw: true,
      });

      for (const row of metrics as any[]) {
        console.log(row, 'metric');
        const created = await Metric_Summary.upsert(
          {
            tenantId: row.tenantId,
            typeId: row.typeId,
            sourceId: row.sourceId,
            campaignId: row.campaignId,
            propertyId: row.propertyId,
            postId: row.postId,
            period,
            periodStart: row.periodStart,
            amount: Number(row.amount),
          },
          { transaction },
        );

        console.log(created, 'summary');
        
      }
    }
  });
}
