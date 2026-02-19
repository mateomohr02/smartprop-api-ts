import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface TenantAttributes {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  isActive: boolean
}

export type TenantCreationAttributes = Optional<
  TenantAttributes,
  "id" | "isActive"
>

export class Tenant
  extends Model<TenantAttributes, TenantCreationAttributes>
  implements TenantAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare email: string
  declare phone: string
  declare isActive: boolean

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
  declare readonly deletedAt: Date | null
}

Tenant.init(
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
    

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
    
  },
  {
    sequelize,
    tableName: "tenants",
    timestamps: true,
    paranoid: true,
    indexes: [
      { unique: true, fields: ["slug"] },
      { fields: ["isActive"] },
    ],
  }
)
