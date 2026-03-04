import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export type MetricPeriod = "day" | "week" | "month"

export interface MetricSummaryAttributes {
  id: string
  tenantId: string
  typeId: string
  period: MetricPeriod
  periodStart: Date
  amount: number
  sourceId: string
  campaignId?: string | "00000000-0000-0000-0000-000000000000"
  propertyId?: string | "00000000-0000-0000-0000-000000000000"
  postId?: string | "00000000-0000-0000-0000-000000000000"
}

export type MetricSummaryCreationAttributes = Optional<
  MetricSummaryAttributes,
  "id" | "campaignId" | "propertyId" | "postId"
>

export class Metric_Summary
  extends Model<
    MetricSummaryAttributes,
    MetricSummaryCreationAttributes
  >
  implements MetricSummaryAttributes
{
  declare id: string
  declare tenantId: string
  declare typeId:string
  declare period: MetricPeriod
  declare periodStart: Date
  declare amount: number
  declare sourceId: string
  declare campaignId?: string | "00000000-0000-0000-0000-000000000000"
  declare propertyId?: string | "00000000-0000-0000-0000-000000000000"
  declare postId?: string | "00000000-0000-0000-0000-000000000000"

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Metric_Summary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    typeId: {
      type: DataTypes.UUID,
      references: {
        model: "metric_types",
        key: "id",
      },
      allowNull: false,
    },

    period: {
      type: DataTypes.ENUM("day", "month"),
      allowNull: false,
    },

    periodStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    sourceId: {
      type: DataTypes.UUID,
      references: {
        model: "metric_sources",
        key: "id",
      },
      allowNull: false,
    },

    campaignId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:"00000000-0000-0000-0000-000000000000"
    },

    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:"00000000-0000-0000-0000-000000000000"
    },

    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:"00000000-0000-0000-0000-000000000000"
    },
  },
  {
    sequelize,
    modelName: "Metric_Summary",
    tableName: "metric_summaries",
    timestamps: true,

    indexes: [
      { fields: ["tenantId"] },
      { fields: ["typeId"] },
      { fields: ["period"] },
      { fields: ["periodStart"] },
      { fields: ["sourceId"] },
      { fields: ["campaignId"] },
      { fields: ["propertyId"] },
      { fields: ["postId"] },
      {
        unique: true,
        fields: [
          "tenantId",
          "typeId",
          "period",
          "periodStart",
          "sourceId",
          "campaignId",
          "propertyId",
          "postId",
        ],
      },
    ],
  }
)