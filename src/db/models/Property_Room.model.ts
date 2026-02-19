import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize";

export interface Property_RoomAttributes {
  id: string
  propertyId: string
  roomId: string
  tenantId: string
}

export type Property_RoomCreationAttributes = Optional<
  Property_RoomAttributes,
  "id"
>

export class Property_Room
  extends Model<Property_RoomAttributes, Property_RoomCreationAttributes>
  implements Property_RoomAttributes
{
  declare id: string
  declare propertyId: string
  declare roomId: string
  declare tenantId: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Property_Room.init(
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
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "rooms",
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
    tableName: "properties_rooms",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["tenantId", "propertyId", "roomId"] }
    ]
  }
)
