import { sequelize } from "../sequelize";
import { Tenant } from "./Tenant.model";
import { Subscription } from "./Subscription.model";
import { Plan } from "./Plan.model";
import { User } from "./User.model";
import { Country } from "./Country.model";
import { Province } from "./Province.model";
import { City } from "./City.model";
import { Neighborhood } from "./Neighborhood.model";

import { PropertyType } from "./PropertyType.model";
import { Room } from "./Room.model";
import { Characteristic } from "./Characteristic.model";
import { Comodity } from "./Comodity.model";

import { Property_Characteristic } from "./Property_Characteristic.model";
import { Property_Comodity } from "./Property_Comodity.model";
import { Property_Room } from "./Property_Room.model";

import { Property } from "./Property.model";

export const initModels = async () => {
  try {
    // ======================================================
    // MULTI-TENANT ROOT
    // ======================================================

    // Tenant - Subscription
    Tenant.hasMany(Subscription, {
      foreignKey: "tenantId",
      as: "subscriptions",
      onDelete: "CASCADE",
    });

    Subscription.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    // Plan - Subscription
    Plan.hasMany(Subscription, {
      foreignKey: "planId",
      as: "subscriptions",
    });

    Subscription.belongsTo(Plan, {
      foreignKey: "planId",
      as: "plan",
    });

    // Tenant - User
    Tenant.hasMany(User, {
      foreignKey: "tenantId",
      as: "users",
      onDelete: "CASCADE",
    });

    User.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    // ======================================================
    // TENANT - DOMAIN MODELS
    // ======================================================

    Tenant.hasMany(Property, {
      foreignKey: "tenantId",
      as: "properties",
      onDelete: "CASCADE",
    });

    Property.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    Tenant.hasMany(PropertyType, {
      foreignKey: "tenantId",
      as: "propertyTypes",
      onDelete: "CASCADE",
    });

    PropertyType.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    Tenant.hasMany(Room, {
      foreignKey: "tenantId",
      as: "rooms",
      onDelete: "CASCADE",
    });

    Room.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    Tenant.hasMany(Characteristic, {
      foreignKey: "tenantId",
      as: "characteristics",
      onDelete: "CASCADE",
    });

    Characteristic.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    Tenant.hasMany(Comodity, {
      foreignKey: "tenantId",
      as: "comodities",
      onDelete: "CASCADE",
    });

    Comodity.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    // ======================================================
    // GEOGRAFÍA (GLOBAL)
    // ======================================================

    Country.hasMany(Province, {
      foreignKey: "countryId",
      as: "provinces",
    });

    Province.belongsTo(Country, {
      foreignKey: "countryId",
      as: "country",
    });

    Province.hasMany(City, {
      foreignKey: "provinceId",
      as: "cities",
    });

    City.belongsTo(Province, {
      foreignKey: "provinceId",
      as: "province",
    });

    City.hasMany(Neighborhood, {
      foreignKey: "cityId",
      as: "neighborhoods",
    });

    Neighborhood.belongsTo(City, {
      foreignKey: "cityId",
      as: "city",
    });

    // ======================================================
    // PROPERTY RELATIONS
    // ======================================================

    // PropertyType
    PropertyType.hasMany(Property, {
      foreignKey: "propertyTypeId",
      as: "properties",
    });

    Property.belongsTo(PropertyType, {
      foreignKey: "propertyTypeId",
      as: "propertyType",
    });

    // Ubicación
    Country.hasMany(Property, { foreignKey: "countryId" });
    Property.belongsTo(Country, { foreignKey: "countryId", as: "country" });

    Province.hasMany(Property, { foreignKey: "provinceId" });
    Property.belongsTo(Province, { foreignKey: "provinceId", as: "province" });

    City.hasMany(Property, { foreignKey: "cityId" });
    Property.belongsTo(City, { foreignKey: "cityId", as: "city" });

    Neighborhood.hasMany(Property, { foreignKey: "neighborhoodId" });
    Property.belongsTo(Neighborhood, {
      foreignKey: "neighborhoodId",
      as: "neighborhood",
    });

    // ======================================================
    // MANY TO MANY
    // ======================================================

    // Characteristics
    Property.belongsToMany(Characteristic, {
      through: Property_Characteristic,
      foreignKey: "propertyId",
      otherKey: "characteristicId",
      as: "characteristics",
    });

    Characteristic.belongsToMany(Property, {
      through: Property_Characteristic,
      foreignKey: "characteristicId",
      otherKey: "propertyId",
      as: "properties",
    });

    // Comodities
    Property.belongsToMany(Comodity, {
      through: Property_Comodity,
      foreignKey: "propertyId",
      otherKey: "comodityId",
      as: "comodities",
    });

    Comodity.belongsToMany(Property, {
      through: Property_Comodity,
      foreignKey: "comodityId",
      otherKey: "propertyId",
      as: "properties",
    });

    // Rooms (detalle, no JSON)
    Property.belongsToMany(Room, {
      through: Property_Room,
      foreignKey: "propertyId",
      otherKey: "roomId",
      as: "rooms", // ✅
    });

    Room.belongsToMany(Property, {
      through: Property_Room,
      foreignKey: "roomId",
      otherKey: "propertyId",
      as: "properties",
    });

    // ======================================================
    // INTERMEDIATE TABLE ↔ TENANT (opcional pero recomendado)
    // ======================================================

    Tenant.hasMany(Property_Characteristic, {
      foreignKey: "tenantId",
    });

    Tenant.hasMany(Property_Comodity, {
      foreignKey: "tenantId",
    });

    Tenant.hasMany(Property_Room, {
      foreignKey: "tenantId",
    });

    // ======================================================

    await sequelize.authenticate();
    console.log("DB connected");
  } catch (error) {
    console.error("DB error", error);
    process.exit(1);
  }
};
