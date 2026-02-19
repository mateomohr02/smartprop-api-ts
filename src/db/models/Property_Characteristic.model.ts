import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize";

export interface Property_CharacteristicAttributes {
  id: string
  propertyId: string
  characteristicId: string
  tenantId: string
}

export type Property_CharacteristicCreationAttributes = Optional<
  Property_CharacteristicAttributes,
  "id"
>

export class Property_Characteristic
  extends Model<Property_CharacteristicAttributes, Property_CharacteristicCreationAttributes>
  implements Property_CharacteristicAttributes
{
  declare id: string
  declare propertyId: string
  declare characteristicId: string
  declare tenantId: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Property_Characteristic.init(
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
    characteristicId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "characteristics",
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
    tableName: "property_characteristic",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["tenantId", "propertyId", "characteristicId"] }
    ]
  }
)
