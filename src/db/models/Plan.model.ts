import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"
 
export type MetricsPlan = 'base' | 'segmented'

export interface PlanFeatures {
    metrics: MetricsPlan
    cashflow: boolean
    propertiesManager: boolean
    ai: boolean
    socialMedia: boolean   
}

export interface PlanAttributes {
  id: string
  name: string
  slug: string
  price: number
  features: PlanFeatures
  isActive: boolean
}

export type PlanCreationAttributes = Optional<
  PlanAttributes,
  "id" | "isActive"
>

export class Plan
  extends Model<PlanAttributes, PlanCreationAttributes>
  implements PlanAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare price: number
  declare features: PlanFeatures
  declare isActive: boolean

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
  declare readonly deletedAt: Date | null
}

Plan.init(
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
      unique: true,
    },
    features: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return Number(this.getDataValue("price"))
        }
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    sequelize,
    tableName: "plans",
    timestamps: true,
    paranoid: true,
    indexes: [
      { unique: true, fields: ["slug"] },
      { fields: ["isActive"] },
    ],
  }
)
