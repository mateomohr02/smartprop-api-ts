import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export type UserRole = "admin" | "user" | "viewer";

export interface UserAttributes {
  id: string;
  name: string;
  lastName: string;
  password: string;
  role: UserRole;
  email: string;
  phone?: string;
  isActive: boolean;
  tenantId: string;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "isActive"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string;
  declare role: UserRole;
  declare name: string;
  declare lastName: string;
  declare password: string;
  declare email: string;
  declare phone?: string;
  declare isActive: boolean;
  declare tenantId: string;

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
  declare readonly deletedAt: Date | null
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    role: {
      type: DataTypes.ENUM("admin", "user", "viewer"),
      allowNull: false,
      defaultValue: "user",
    },

    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(120),
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

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: true,
      }
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
    tableName: "users",
    timestamps: true,
    paranoid: true,
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
