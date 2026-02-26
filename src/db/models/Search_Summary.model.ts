import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export interface SearchSummaryAttributes {
  id: string;
  tenantId: string;

  date: string; // YYYY-MM-DD

  filterType: 
    | "city"
    | "neighborhood"
    | "propertyType"
    | "operationType"
    | "bedrooms"
    | "bathrooms"
    | "garages"
    | "financing"
    | "rooms"
    | "characteristics"
    | "comodities";

  filterValue: string; // uuid o valor numérico serializado

  count: number;
}

export type SearchSummaryCreationAttributes =
  Optional<SearchSummaryAttributes, "id">;

export class SearchSummary
  extends Model<SearchSummaryAttributes, SearchSummaryCreationAttributes>
  implements SearchSummaryAttributes
{
  declare id: string;
  declare tenantId: string;

  declare date: string;
  declare filterType:
    | "city"
    | "neighborhood"
    | "propertyType"
    | "operationType"
    | "bedrooms"
    | "bathrooms"
    | "garages"
    | "financing"
    | "rooms"
    | "characteristics"
    | "comodities";

  declare filterValue: string;
  declare count: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

SearchSummary.init(
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

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    filterType: {
      type: DataTypes.ENUM(
        "city",
        "neighborhood",
        "propertyType",
        "operationType",
        "bedrooms",
        "bathrooms",
        "garages",
        "financing",
        "rooms",
        "characteristics",
        "comodities"
      ),
      allowNull: false,
    },

    filterValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "search_summaries",
    timestamps: true,
    indexes: [
      { fields: ["tenantId"] },
      { fields: ["tenantId", "date"] },
      { fields: ["tenantId", "filterType"] },
      { fields: ["tenantId", "filterType", "filterValue"] },
      { unique: true, fields: ["tenantId", "date", "filterType", "filterValue"] },
    ],
  }
);