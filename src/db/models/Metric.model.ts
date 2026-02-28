import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export type Source =  'organic' | 'instagram' | 'facebook' | 'tiktok' | 'google'

export type MetricType =
  | "visit_site" //-> Visit Site

  | "visit_blog" //-> Visit Blog
  | "visit_post" //-> Visit Blog Post
  
  | "visit_property" //-> Visit Property Detail

  | "share_property" //-> Share Property
  | "share_post" //-> Share Post
  
  | "search" //-> Filters Applied
  
  | "contact_whatsapp" //-> Contact Whatsapp
  | "contact_email" //-> Contact Email
  | "contact_instagram" //-> Contact Instagram
  | "contact_facebook" //-> Contact Facebook
  | "contact_form" //-> Contact Form Submitted

export interface MetricAttributes {
  id: string;
  tenantId: string;

  type: MetricType;
  source: Source;
  metadata: Record<string, any> | null;

  propertyId: string | null;
  postId: string | null;
}

export type MetricCreationAttributes = Optional<MetricAttributes, 
"id" | "metadata" | "propertyId" | "postId">;

export class Metric
  extends Model<MetricAttributes, MetricCreationAttributes>
  implements MetricAttributes
{
  declare id: string;
  declare tenantId: string;

  declare type: MetricType;
  declare source: Source;
  declare metadata: Record<string, any> | null;

  declare propertyId: string | null;
  declare postId: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Metric.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    type: {
      type: DataTypes.ENUM(
        "visit_site",
        "visit_blog",
        "visit_post",
        "visit_property",
        "share_property",
        "share_post",
        "search",
        "contact_whatsapp",
        "contact_email",
        "contact_instagram",
        "contact_facebook",
        "contact_form",
      ),
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM('organic', 'instagram', 'facebook', 'tiktok', 'google'),
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "properties",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "posts",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "metrics",
    timestamps: true,
    paranoid: true,
    indexes: [
        { fields: ["tenantId"] },
        { fields: ["tenantId", "type"] },
        { fields: ["tenantId","source"] },
        { fields: ["tenantId", "propertyId"] },
        { fields: ["tenantId", "postId"] },
        { fields: ["tenantId", "createdAt"] }
    ],
  },
);
