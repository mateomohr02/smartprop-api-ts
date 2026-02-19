import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize";

export interface PropertyTypeAttributes {
  id: string
  name: string
  slug: string
  tenantId: string
}

export type PropertyTypeCreationAttributes = Optional<
  PropertyTypeAttributes,
  "id"
>

export class PropertyType
  extends Model<PropertyTypeAttributes, PropertyTypeCreationAttributes>
  implements PropertyTypeAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare tenantId: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

PropertyType.init(
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
      allowNull: false
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
    tableName: "property_types",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["tenantId", "slug" ] },
      { fields: ["tenantId"] },
    ],
  }
)
