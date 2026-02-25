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
  detail: RoomDetail
  tenantId: string
}

export type RoomDetail = {
  amount: number,
  size?: number[],
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
  declare detail: RoomDetail
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
    detail: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        amount: 1,
        size: []
      },
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
    tableName: "property_room",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["tenantId", "propertyId", "roomId"] }
    ]
  }
)
