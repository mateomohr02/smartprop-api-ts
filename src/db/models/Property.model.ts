import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "@/db/sequelize";
import { Comodity } from "./Comodity.model";
import { Characteristic } from "./Characteristic.model";
import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import { Room } from "./Room.model";

export type PropertyStatus =
  | "draft"
  | "active"
  | "rented"
  | "sold"
  | "archived";

export type Currency = "ARS" | "USD" | "EUR" | "BRL";
export type PropertyOperationType = "rent" | "sale" | "short-term";
export type PropertyCondition = "new" | "like-new" | "good" | "to-renovate";
export type PropertyAvailabilityType = "immediate" | "date";

export interface PropertyAttributes {
  id: string;
  tenantId: string;
  status: PropertyStatus;

  //  heat ahora es columna
  heat: number;

  metrics: {
    views: number;
    interactions: number;
    shared: number;
  };

  isFeatured: boolean;
  slug?: string | null;

  title?: string | null;
  description?: string | null;
  propertyTypeId?: string | null;

  //  Precio como columnas
  priceAmount?: number | null;
  priceCurrency?: Currency | null;

  //  Expensas como columnas
  expensesAmount?: number | null;
  expensesCurrency?: Currency | null;

  //  Ambientes como columna
  roomsAmount?: number | null;

  //  Ubicación como columnas (sin calle/numero)
  neighborhoodId?: string | null;
  cityId?: string | null;
  provinceId?: string | null;
  countryId?: string | null;

  financing?: string | null;
  operation?: PropertyOperationType | null;

  //  JSON flexible restante
  rooms?: {
    bedrooms?: number | null;
    bathrooms?: number | null;
    garages?: number | null;
  } | null;

  surface?: {
    total?: number | null;
    covered?: number | null;
  } | null;

  services?: {
    light?: boolean | null;
    gas?: boolean | null;
    water?: boolean | null;
  } | null;

  condition?: PropertyCondition | null;
  age?: number | null;

  availability?: {
    type?: PropertyAvailabilityType | null;
    date?: Date | null;
  } | null;

  location?: {
    address?: {
      street: string;
      number?: number | null;
    } | null;
    coordinates?: {
      lat: number;
      lng: number;
    };
  } | null;

  multimedia?: {
    images?: string[] | null;
    videos?: string[] | null;
    blueprints?: string[] | null;
  } | null;
}

export type PropertyCreationAttributes = Optional<
  PropertyAttributes,
  "id" | "metrics" | "isFeatured" | "status" | "heat"
>;

export class Property
  extends Model<PropertyAttributes, PropertyCreationAttributes>
  implements PropertyAttributes
{
  declare id: string;
  declare tenantId: string;
  declare status: PropertyStatus;

  declare heat: number;

  declare metrics: {
    views: number;
    interactions: number;
    shared: number;
  };

  declare isFeatured: boolean;
  declare slug?: string;

  declare title?: string;
  declare description?: string;
  declare propertyTypeId?: string;

  declare priceAmount?: number;
  declare priceCurrency?: Currency;

  declare expensesAmount?: number;
  declare expensesCurrency?: Currency;

  declare roomsAmount?: number;

  declare neighborhoodId?: string;
  declare cityId?: string;
  declare provinceId?: string;
  declare countryId?: string;

  declare financing?: string;
  declare operation?: PropertyOperationType;

  declare rooms?: {
    bedrooms?: number;
    bathrooms?: number;
    garages?: number;
  };

  declare surface?: {
    total?: number;
    covered?: number;
  };

  declare services?: {
    light?: boolean;
    gas?: boolean;
    water?: boolean;
  };

  declare condition?: PropertyCondition;
  declare age?: number;

  declare availability?: {
    type?: PropertyAvailabilityType;
    date?: Date;
  };

  declare location?: PropertyAttributes["location"];
  declare multimedia?: PropertyAttributes["multimedia"];

  // Relaciones

  declare comodities?: Characteristic[];
  declare characteristics?: Characteristic[];
  declare detailRooms?: Room[];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // MIXINS MANY TO MANY (Comodities)

  declare getComodities: BelongsToManyGetAssociationsMixin<Comodity>;
  declare addComodity: BelongsToManyAddAssociationMixin<Comodity, string>;
  declare addComodities: BelongsToManyAddAssociationsMixin<Comodity, string>;
  declare setComodities: BelongsToManySetAssociationsMixin<Comodity, string>;

  declare getCharacteristics: BelongsToManyGetAssociationsMixin<Characteristic>;
  declare addCharacteristic: BelongsToManyAddAssociationMixin<Characteristic, string>;
  declare addCharacteristics: BelongsToManyAddAssociationsMixin<Characteristic, string>;
  declare setCharacteristics: BelongsToManySetAssociationsMixin<Characteristic, string>;

  declare getRooms: BelongsToManyGetAssociationsMixin<Characteristic>;
  declare addRoom: BelongsToManyAddAssociationMixin<Characteristic, string>;
  declare addRooms: BelongsToManyAddAssociationsMixin<Characteristic, string>;
  declare setRooms: BelongsToManySetAssociationsMixin<Characteristic, string>;
}

Property.init(
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

    status: {
      type: DataTypes.ENUM("draft", "active", "rented", "sold", "archived"),
      allowNull: false,
      defaultValue: "draft",
    },

    // 🔥 Heat ahora columna real
    heat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },

    metrics: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        views: 0,
        interactions: 0,
        shared: 0,
      },
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    slug: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    propertyTypeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "property_types",
        key: "id",
      },
      onDelete: "SET NULL",
    },

    // 🔥 Precio columnas
    priceAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    priceCurrency: {
      type: DataTypes.ENUM("ARS", "USD", "EUR", "BRL"),
      allowNull: true,
    },

    // 🔥 Expensas columnas
    expensesAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    expensesCurrency: {
      type: DataTypes.ENUM("ARS", "USD", "EUR", "BRL"),
      allowNull: true,
    },

    // 🔥 Ambientes columna
    roomsAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // 🔥 Ubicación columnas
    neighborhoodId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    cityId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    provinceId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    countryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    financing: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    operation: {
      type: DataTypes.ENUM("rent", "sale", "short-term"),
      allowNull: true,
    },

    rooms: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    surface: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    services: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    condition: {
      type: DataTypes.ENUM("new", "like-new", "good", "to-renovate"),
      allowNull: true,
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    availability: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    multimedia: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "properties",
    timestamps: true,

    indexes: [
      { unique: true, fields: ["tenantId", "slug"] },

      { fields: ["tenantId", "status"] },
      { fields: ["tenantId", "operation"] },
      { fields: ["tenantId", "propertyTypeId"] },

      // 🔥 filtros principales optimizados
      { fields: ["tenantId", "priceAmount"] },
      { fields: ["tenantId", "roomsAmount"] },
      { fields: ["tenantId", "cityId"] },
      { fields: ["tenantId", "neighborhoodId"] },

      // 🔥 orden principal
      { fields: ["tenantId", "heat"] },
      { fields: ["isFeatured"] },

      // 🔷 GIN solo donde aporta valor
      { using: "GIN", fields: ["services"] },
      { using: "GIN", fields: ["surface"] },
    ],
  },
);
