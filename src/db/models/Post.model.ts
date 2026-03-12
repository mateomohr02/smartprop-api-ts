import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export type PostStatus = "active" | "drafted" | "archived"

export interface PostAttributes {
  id: string
  tenantId: string
  authorId: string
  slug: string
  title: string
  content: unknown[]
  status: PostStatus
  metrics: {
    views: number
    interactions: number
    shared: number
  }
}

export type PostCreationAttributes = Optional<
  PostAttributes,
  "id" | "status" | "slug" | "content"
>

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  declare id: string
  declare tenantId: string
  declare authorId: string
  declare title: string
  declare slug: string
  declare content: unknown[]
  declare status: PostStatus
  declare metrics: {
    views: number;
    interactions: number;
    shared: number;
  };


  declare readonly createdAt: Date
  declare readonly updatedAt: Date
  declare readonly deletedAt: Date | null
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    
    metrics: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        views: 0,
        interactions: 0,
        shared: 0
      }
    },

    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("active", "drafted", "archived"),
      allowNull: false,
      defaultValue: "drafted",
    },
 
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    }
    
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: true,
    paranoid: true,
    indexes: [
      { unique: true, fields: ["tenantId", "slug"] },
      { fields: ["authorId"]},
      { fields: ["tenantId", "status"] }
    ],
  }
)
