import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize";

export interface CharacteristicAttributes {
  id: string
  name: string
  slug: string
  tenantId: string
}

export type CharacteristicCreationAttributes = Optional<
  CharacteristicAttributes,
  "id"
>

export class Characteristic
  extends Model<CharacteristicAttributes, CharacteristicCreationAttributes>
  implements CharacteristicAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare tenantId: string
  
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Characteristic.init(
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
    tableName: "characteristics",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["tenantId", "slug" ] },
      { fields: ["tenantId"] },
    ],
  }
)
