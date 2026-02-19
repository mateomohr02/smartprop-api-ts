import {
  Model,
  DataTypes,
  Optional,
} from "sequelize"
import { sequelize } from "@/db/sequelize"

export interface CountryAttributes {
  id: string
  name: string
  slug: string
}

export type CountryCreationAttributes = Optional<
  CountryAttributes,
  "id"
>

export class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  declare id: string
  declare name: string
  declare slug: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Country.init(
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
      unique: true,
    }
  },
  {
    sequelize,
    tableName: "countries",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["slug"] }
    ],
  }
)
