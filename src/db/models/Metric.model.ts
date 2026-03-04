import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"
export interface MetricAttributes {
  id: string
  tenantId: string
  typeId: string
  sourceId: string
  campaignId?: string | "00000000-0000-0000-0000-000000000000"
  propertyId?: string | "00000000-0000-0000-0000-000000000000"
  postId?: string | "00000000-0000-0000-0000-000000000000"
  createdAt?: Date
  updatedAt?: Date
}

export type MetricCreationAttributes = Optional<
  MetricAttributes,
  "id" | "sourceId" | "campaignId" | "propertyId" | "postId"
>

export class Metric
  extends Model<MetricAttributes, MetricCreationAttributes>
  implements MetricAttributes
{
  declare id: string
  declare tenantId: string
  declare typeId: string 
  declare sourceId: string
  declare campaignId?: string | "00000000-0000-0000-0000-000000000000"
  declare propertyId?: string | "00000000-0000-0000-0000-000000000000"
  declare postId?: string | "00000000-0000-0000-0000-000000000000"

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Metric.init(
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
      onDelete: "CASCADE",
    },

    sourceId: {
      type: DataTypes.UUID,
      references: {
        model: "metric_sources",
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },

    campaignId: {
      type: DataTypes.UUID,
      references: {
        model: "campaigns",
        key: "id",
      },
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      onDelete: "CASCADE",
    },

    propertyId: {
      type: DataTypes.UUID,
      references: {
        model: "properties",
        key: "id",
      },
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      onDelete: "CASCADE",
    },

    postId: {
      type: DataTypes.UUID,
      references: {
        model: "posts",
        key: "id",
      },
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Metric",
    tableName: "metrics",
    timestamps: true,

    indexes: [
      { fields: ["tenantId"] },
      { fields: ["typeId"] },
      { fields: ["sourceId"] },
      { fields: ["campaignId"] },
      { fields: ["propertyId"] },
      { fields: ["postId"] },
      { fields: ["createdAt"] },

      // índice compuesto clave para agregaciones por periodo
      { fields: ["tenantId", "typeId", "createdAt"] },
    ],
  }
)