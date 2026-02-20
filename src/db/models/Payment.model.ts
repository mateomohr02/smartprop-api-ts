import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export type PaymentMethod = "mercado-pago" | "stripe";

export type PaymentStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface PaymentAttributes {
  id: string;
  method: PaymentMethod;
  paymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  providerStatus: string;
  metadata?: object | null;
  paidAt?: Date | null;
  tenantId: string;
  subscriptionId: string;
}

export type PaymentCreationAttributes = Optional<
  PaymentAttributes,
  "id" | "metadata" | "paidAt"
>;

export class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  declare id: string;
  declare method: PaymentMethod;
  declare paymentId: string;
  declare amount: number;
  declare currency: string;
  declare status: PaymentStatus;
  declare providerStatus: string;
  declare metadata: object | null;
  declare paidAt: Date | null;
  declare tenantId: string;
  declare subscriptionId: string;

  declare createdAt: Date;
  declare updatedAt: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    method: {
      type: DataTypes.ENUM("mercado-pago", "stripe"),
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "succeeded", "failed", "cancelled"),
      allowNull: false,
    },
    providerStatus: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    subscriptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "subscriptions",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "payments",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["method", "paymentId"],
      },
      {
        fields: ["tenantId"],
      },
      {
        fields: ["subscriptionId"],
      },
      {
        fields: ["status"],
      },
    ],
  }
);