import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize";

export interface Property_ComodityAttributes {
  id: string
  propertyId: string
  comodityId: string
  tenantId: string
}

export type Property_ComodityCreationAttributes = Optional<
  Property_ComodityAttributes,
  "id"
>

export class Property_Comodity
  extends Model<Property_ComodityAttributes, Property_ComodityCreationAttributes>
  implements Property_ComodityAttributes
{
  declare id: string
  declare propertyId: string
  declare comodityId: string
  declare tenantId: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Property_Comodity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "properties",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    comodityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "comodities",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tenants",
        key: "id",
      },
      onDelete: "CASCADE",
    }
  },
  {
    sequelize,
    tableName: "property_comodity",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["tenantId", "propertyId", "comodityId"] }
    ]
  }
)
