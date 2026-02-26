import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";

export interface SearchAttributes {
  id: string;
  tenantId: string;
}

export type SearchCreationAttributes = Optional<
  SearchAttributes,
  "id"
>;

export class Search
  extends Model<SearchAttributes, SearchCreationAttributes>
  implements SearchAttributes
{
  declare id: string;
  declare tenantId: string;

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

  },
  {
    sequelize,
    tableName: "searches",
    timestamps: true,
    indexes: [
      {fields: ["tenantId"]},
    ],
  },
);
