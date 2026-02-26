import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";
import { MetricType, Source } from "./Metric.model";

export type Period = "day" | "week" | "month" | "year";

export interface MetricSummaryAttributes {
  id: string;
  tenantId: string;

  period: Period; //-> Day | Week | Month | Year
  periodStart: Date; //-> 2025-02-26 | 9 | 2 | 2025

  type: MetricType;
  ammount: number;
  source: Source;
  campaign: string | null;

  propertyId: string;
  postId: string;
}

export type MetricSummaryCreationAttributes = Optional<
  MetricSummaryAttributes,
  "id"
>;

export class MetricSummary
  extends Model<MetricSummaryAttributes, MetricSummaryCreationAttributes>
  implements MetricSummaryAttributes
{
  declare id: string;
  declare tenantId: string;

  declare period: Period;
  declare periodStart: Date;

  declare type: MetricType;
  declare ammount: number;
  declare source: Source;
  declare campaign: string | null;

  declare propertyId: string;
  declare postId: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

MetricSummary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tenants",
        key: "id",
      },
    },

    period: {
      type: DataTypes.ENUM("day", "week", "month", "year"),
      allowNull: false,
    },

    periodStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(
        "visit_site",
        "visit_blog",
        "visit_post",
        "visit_property",
        "share_property",
        "share_post",
        "search",
        "contact_whatsapp",
        "contact_email",
        "contact_instagram",
        "contact_facebook",
        "contact_form",
      ),
      allowNull: false,
    },
    ammount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM(
        "organic",
        "instagram",
        "facebook",
        "tiktok",
        "google",
      ),
      allowNull: false,
    },
    campaign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "properties",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "posts",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "metric_summaries",
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ["tenantId", "period", "periodStart"] },
      { fields: ["tenantId", "type"] },
      { fields: ["tenantId", "propertyId"] },
      { fields: ["tenantId", "postId"] },
      { fields: ["tenantId", "source"] },
      { fields: ["tenantId", "campaign"] },
      {
        unique: true,
        fields: [
          "tenantId",
          "period",
          "periodStart",
          "type",
          "source",
          "campaign",
          "propertyId",
          "postId",
        ],
      },
    ],
  },
);
