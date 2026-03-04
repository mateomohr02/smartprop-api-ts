import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface MetricSourceAttributes {
  id: string
  name: string
  slug: string
}

export type MetricSourceCreationAttributes = Optional<
  MetricSourceAttributes,
  "id"
>

export class MetricSource
  extends Model<MetricSourceAttributes, MetricSourceCreationAttributes>
  implements MetricSourceAttributes
{
  declare id: string
  
  declare name: string
  declare slug: string

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

MetricSource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },    
  },
  {
    sequelize,
    modelName: "MetricSource",
    tableName: "metric_sources",
    timestamps: true,
    indexes: [
        {unique: true, fields: ["slug"]}
    ],
  }
)