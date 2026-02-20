import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";
import { PlanFeatures } from "./Plan.model";

export type BillingCycle = "monthly" | "quarterly" | "semester" | "yearly";

export type SubscriptionStatus = "active" | "past_due" | "canceled" | "expired";

export interface SubscriptionAttributes {
  id: string;

  tenantId: string;
  planId: string;

  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  autoRenew: boolean;

  priceSnapshot: number;
  featuresSnapshot: PlanFeatures;

  startedAt: Date;
  endsAt: Date;
}

export type SubscriptionCreationAttributes = Optional<
  SubscriptionAttributes,
  "id"
>;

export class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  declare id: string;

  declare tenantId: string;
  declare planId: string;

  declare status: SubscriptionStatus;
  declare billingCycle: BillingCycle;
  declare autoRenew: boolean;

  declare startedAt: Date;
  declare endsAt: Date;

  declare priceSnapshot: number;
  declare featuresSnapshot: PlanFeatures;

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
  declare readonly deletedAt: Date | null
}

Subscription.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "plans",
        key: "id",
      },
    },

    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tenants",
        key: "id",
      },
    },

    status: {
      type: DataTypes.ENUM("active", "past_due", "canceled", "expired"),
      allowNull: false,
      defaultValue: "active",
    },

    billingCycle: {
      type: DataTypes.ENUM("monthly", "quarterly", "semester", "yearly"),
      allowNull: false,
    },

    autoRenew: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    featuresSnapshot: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    priceSnapshot: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return Number(this.getDataValue("priceSnapshot"));
      },
    },

    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endsAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "subscriptions",
    timestamps: true,
    paranoid: true,
    indexes: [
      { fields: ["status", "endsAt"] },
      { fields: ["tenantId", "status"]}
    ],
  },
);
