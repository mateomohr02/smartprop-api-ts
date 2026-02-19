import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface CityAttributes {
  id: string
  name: string
  slug: string
  provinceId: string
}

export type CityCreationAttributes = Optional<
  CityAttributes,
  "id"
>

export class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare provinceId: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

City.init(
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
    provinceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'provinces',
          key: 'id'
        }
    }
  },
  {
    sequelize,
    tableName: "cities",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["provinceId", "slug"] },
      { fields: ['provinceId'] }
    ],
  }
)
