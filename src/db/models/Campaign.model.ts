import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface CampaignAttributes {
  id: string
  tenantId: string
  title: string
  sourceId: string
}

export type CampaignCreationAttributes = Optional<
  CampaignAttributes,
  "id" 
>

export class Campaign
  extends Model<CampaignAttributes, CampaignCreationAttributes>
  implements CampaignAttributes
{
  declare id: string
  declare tenantId: string
  declare title: string
  declare sourceId: string

  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Campaign.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    sourceId: {
      type: DataTypes.UUID,
      allowNull: false, 
      references: {
        model: "metric_sources",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    
  },
  {
    sequelize,
    tableName: "campaigns",
    timestamps: true,
    indexes: [
      { fields: ["tenantId"]},
      { fields: ["sourceId"]}
    ],
  }
)
