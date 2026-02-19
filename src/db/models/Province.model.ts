import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface ProvinceAttributes {
  id: string
  name: string
  slug: string
  countryId: string
}

export type ProvinceCreationAttributes = Optional<
  ProvinceAttributes,
  "id"
>

export class Province
  extends Model<ProvinceAttributes, ProvinceCreationAttributes>
  implements ProvinceAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare countryId: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Province.init(
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
      allowNull: false,
    },

    countryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id'
        }
    }
  },
  {
    sequelize,
    tableName: "provinces",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["countryId", "slug"] },
      { fields: ['countryId'] }
    ],
  }
)
