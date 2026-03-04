import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface MetricTypeAttributes {
  id: string
  name: string
  slug: string
}

export type MetricTypeCreationAttributes = Optional<
  MetricTypeAttributes,
  "id"
>

export class MetricType
  extends Model<MetricTypeAttributes, MetricTypeCreationAttributes>
  implements MetricTypeAttributes
{
  declare id: string
  
  declare name: string
  declare slug: string

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

MetricType.init(
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
    modelName: "MetricType",
    tableName: "metric_types",
    timestamps: true,
    indexes: [
        {unique: true, fields: ["slug"]}
    ],
  }
)