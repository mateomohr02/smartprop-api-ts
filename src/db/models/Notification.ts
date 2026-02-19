import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export interface NotificationAttributes {
  id: string;
  type: string;
  message: string;
  tenantId: string;
  userId?: string;
}

export type NotificationCreationAttributes = Optional<
  NotificationAttributes,
  "id"
>;

export class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  declare id: string;
  declare tenantId: string;
  declare type: string;
  declare message: string;
  declare userId?: string;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
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
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["tenantId", "email"],
      },
      {
        fields: ["tenantId", "isActive"],
      },
    ],
  },
);
