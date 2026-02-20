import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export interface ModificationAttributes {
  id: string
  previousValue: unknown
  currentValue: unknown
  tenantId: string
  userId: string
  postId: string | null
  propertyId: string | null
}

export type ModificationCreationAttributes = Optional<
  ModificationAttributes,
  "id" | "postId" | "propertyId"
>;

export class Modification
  extends Model<ModificationAttributes, ModificationCreationAttributes>
  implements ModificationAttributes
{
  declare id: string
  declare previousValue: unknown
  declare currentValue: unknown
  declare tenantId: string
  declare userId: string
  declare postId: string | null
  declare propertyId: string | null

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
  declare readonly deletedAt: Date | null
}

Modification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    previousValue: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    currentValue: {
      type: DataTypes.JSONB,
      allowNull: false,
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "posts",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "properties",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "modifications",
    timestamps: true,
    paranoid: true,
    indexes: [
     { fields: ["tenantId"] },
     { fields: ["userId"] },
     { fields: ["postId"] },
     { fields: ["propertyId"]},
     { fields: ["tenantId", "propertyId"] },
     { fields: ["tenantId", "postId"] },
    ]
  },
);
