import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface NeighborhoodAttributes {
  id: string
  name: string
  slug: string
  cityId: string
}

export type NeighborhoodCreationAttributes = Optional<
  NeighborhoodAttributes,
  "id"
>

export class Neighborhood
  extends Model<NeighborhoodAttributes, NeighborhoodCreationAttributes>
  implements NeighborhoodAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare cityId: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Neighborhood.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    cityId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'cities',
          key: 'id'
        }
    }
  },
  {
    sequelize,
    tableName: "neighborhoods",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["cityId", "slug"] },
      { fields: ['cityId'] }
    ],
  }
)
