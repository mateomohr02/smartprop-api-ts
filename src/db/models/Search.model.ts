import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export interface SearchAttributes {
  id: string;
  tenantId: string;

  propertyTypeId?: string | null;
  operationType?: string | null;

  minPriceAmount?: number | null;
  maxpriceAmount?: number | null;
  priceCurrency?: string | null;

  minExpensesAmount?: number | null;
  maxExpensesAmount?: number | null;
  expensesCurrency?: string | null;

  minRoomsAmount?: number | null;
  maxRoomsAmount?: number | null;

  bedrooms?: number | null;
  bathrooms?: number | null;
  garages?: number | null;

  financing?: boolean | null;

  rooms?: string[] | null;
  characteristics?: string[] | null;
  comodities?: string[] | null;

  countryId?: string | null;
  provinceId?: string | null;
  cityId?: string | null;
  neighborhoodId?: string | null;
}

export type SearchCreationAttributes = Optional<SearchAttributes, "id">;

export class Search
  extends Model<SearchAttributes, SearchCreationAttributes>
  implements SearchAttributes
{
  declare id: string;
  declare tenantId: string;

  declare propertyTypeId?: string | null;
  declare operationType?: string | null;

  declare minPriceAmount?: number | null;
  declare maxpriceAmount?: number | null;
  declare priceCurrency?: string | null;
  declare minExpensesAmount?: number | null;
  declare maxExpensesAmount?: number | null;
  declare expensesCurrency?: string | null;
  declare minRoomsAmount?: number | null;
  declare maxRoomsAmount?: number | null;

  declare bedrooms?: number | null;
  declare bathrooms?: number | null;
  declare garages?: number | null;

  declare financing?: boolean | null;
  declare countryId?: string | null;
  declare provinceId?: string | null;
  declare cityId?: string | null;
  declare neighborhoodId?: string | null;

  declare rooms?: string[] | null;
  declare characteristics?: string[] | null;
  declare comodities?: string[] | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Search.init(
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
    },

    propertyTypeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "property_types",
        key: "id",
      },
    },
    operationType: {
      type: DataTypes.ENUM("sale", "rent", "short-term"),
      allowNull: true,
    },
    minPriceAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxpriceAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    priceCurrency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    minExpensesAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxExpensesAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expensesCurrency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    minRoomsAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxRoomsAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    garages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    financing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    countryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "countries",
        key: "id",
      },
    },
    provinceId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "provinces",
        key: "id",
      },
    },
    cityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "cities",
        key: "id",
      },
    },
    neighborhoodId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "neighborhoods",
        key: "id",
      },
    },

    rooms: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },

    characteristics: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },

    comodities: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "searches",
    timestamps: true,
    indexes: [
      { fields: ["tenantId"] },
      { fields: ["tenantId", "createdAt"] },
      { fields: ["tenantId", "propertyTypeId"] },
      { fields: ["tenantId", "operationType"] },
      { fields: ["tenantId", "cityId"] },
      { fields: ["tenantId", "neighborhoodId"] },
      { fields: ["tenantId", "bedrooms"] },
      { fields: ["tenantId", "bathrooms"] },
      { fields: ["tenantId", "garages"] },
    ],
  },
);
