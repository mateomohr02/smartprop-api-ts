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
import { Metric } from "./Metric.model";
import { Metric_Summary } from "./Metric_Summary.model";

import { Search } from "./Search.model";
import { SearchSummary } from "./Search_Summary.model";

import { Campaign } from "./Campaign.model";
import { Post } from "./Post.model";
import { MetricType } from "./Metric_Type.model";
import { MetricSource } from "./Metric_Source.model";

export const initModels = async () => {
  try {
    // ======================================================
    // MULTI-TENANT ROOT
    // ======================================================

    Tenant.hasMany(Subscription, {
      foreignKey: "tenantId",
      as: "subscriptions",
      onDelete: "CASCADE",
    });

    Subscription.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    Plan.hasMany(Subscription, {
      foreignKey: "planId",
      as: "subscriptions",
    });

    Subscription.belongsTo(Plan, {
      foreignKey: "planId",
      as: "plan",
    });

    Tenant.hasMany(User, {
      foreignKey: "tenantId",
      as: "users",
      onDelete: "CASCADE",
    });

    User.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    // 🔥 Tenant <-> Campaign
    Tenant.hasMany(Campaign, {
      foreignKey: "tenantId",
      as: "campaigns",
      onDelete: "CASCADE",
    });

    Campaign.belongsTo(Tenant, {
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

    Tenant.hasMany(Post, {
      foreignKey: "tenantId",
      as: "posts",
      onDelete: "CASCADE",
    });

    Post.belongsTo(Tenant, {
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
    // GEOGRAFÍA
    // ======================================================

    Country.hasMany(Province, { foreignKey: "countryId", as: "provinces" });
    Province.belongsTo(Country, { foreignKey: "countryId", as: "country" });

    Province.hasMany(City, { foreignKey: "provinceId", as: "cities" });
    City.belongsTo(Province, { foreignKey: "provinceId", as: "province" });

    City.hasMany(Neighborhood, { foreignKey: "cityId", as: "neighborhoods" });
    Neighborhood.belongsTo(City, { foreignKey: "cityId", as: "city" });

    // ======================================================
    // PROPERTY RELATIONS
    // ======================================================

    PropertyType.hasMany(Property, {
      foreignKey: "propertyTypeId",
      as: "properties",
    });

    Property.belongsTo(PropertyType, {
      foreignKey: "propertyTypeId",
      as: "propertyType",
    });

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

    Property.belongsToMany(Room, {
      through: Property_Room,
      foreignKey: "propertyId",
      otherKey: "roomId",
      as: "rooms",
    });

    Room.belongsToMany(Property, {
      through: Property_Room,
      foreignKey: "roomId",
      otherKey: "propertyId",
      as: "properties",
    });

    // ======================================================
    // SEARCH RELATIONS
    // ======================================================

    Tenant.hasMany(Search, {
      foreignKey: "tenantId",
      as: "searches",
      onDelete: "CASCADE",
    });

    Search.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    Tenant.hasMany(SearchSummary, {
      foreignKey: "tenantId",
      as: "search_summaries",
      onDelete: "CASCADE",
    });

    SearchSummary.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    // ======================================================
    // METRICS RELATIONS
    // ======================================================

    // TENANT
    Tenant.hasMany(Metric, {
      foreignKey: "tenantId",
      as: "metrics",
      onDelete: "CASCADE",
    });

    Metric.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    Tenant.hasMany(Metric_Summary, {
      foreignKey: "tenantId",
      as: "metric_summaries",
      onDelete: "CASCADE",
    });

    Metric_Summary.belongsTo(Tenant, {
      foreignKey: "tenantId",
      as: "tenant",
    });

    // PROPERTY
    Property.hasMany(Metric, {
      foreignKey: "propertyId",
      as: "property_metrics",
      onDelete: "SET NULL",
    });

    Metric.belongsTo(Property, {
      foreignKey: "propertyId",
      as: "property",
    });

    Property.hasMany(Metric_Summary, {
      foreignKey: "propertyId",
      as: "property_metric_summaries",
      onDelete: "SET NULL",
    });

    Metric_Summary.belongsTo(Property, {
      foreignKey: "propertyId",
      as: "property",
    });

    // POST
    Post.hasMany(Metric, {
      foreignKey: "postId",
      as: "post_metrics",
      onDelete: "SET NULL",
    });

    Metric.belongsTo(Post, {
      foreignKey: "postId",
      as: "post",
    });

    Post.hasMany(Metric_Summary, {
      foreignKey: "postId",
      as: "post_metric_summaries",
      onDelete: "SET NULL",
    });

    Metric_Summary.belongsTo(Post, {
      foreignKey: "postId",
      as: "post",
    });

    MetricType.hasMany(Metric, {
      foreignKey: "typeId",
      as: "metrics",
      onDelete: "CASCADE",
    });

    MetricType.hasMany(Metric_Summary, {
      foreignKey: "typeId",
      as: "metricSummaries",
      onDelete: "CASCADE",
    });

    // ==========================
    // MetricSource Relations
    // ==========================

    MetricSource.hasMany(Metric, {
      foreignKey: "sourceId",
      as: "metrics",
      onDelete: "CASCADE",
    });

    MetricSource.hasMany(Metric_Summary, {
      foreignKey: "sourceId",
      as: "metricSummaries",
      onDelete: "CASCADE",
    });

    MetricSource.hasMany(Campaign, {
      foreignKey: "sourceId",
      as: "campaigns",
      onDelete: "CASCADE",
    })

    Campaign.belongsTo(MetricSource, {
      foreignKey: "sourceId",
      as: "source",
    })

    // ==========================
    // Metric Relations
    // ==========================

    Metric.belongsTo(MetricType, {
      foreignKey: "typeId",
      as: "type",
    });

    Metric.belongsTo(MetricSource, {
      foreignKey: "sourceId",
      as: "source",
    });

    // ==========================
    // Metric_Summary Relations
    // ==========================

    Metric_Summary.belongsTo(MetricType, {
      foreignKey: "typeId",
      as: "type",
    });

    Metric_Summary.belongsTo(MetricSource, {
      foreignKey: "sourceId",
      as: "source",
    });

    // CAMPAIGN ↔ METRICS
    Campaign.hasMany(Metric, {
      foreignKey: "campaignId",
      as: "campaign_metrics",
      onDelete: "SET NULL",
    });

    Metric.belongsTo(Campaign, {
      foreignKey: "campaignId",
      as: "campaign",
    });

    Campaign.hasMany(Metric_Summary, {
      foreignKey: "campaignId",
      as: "campaign_metric_summaries",
      onDelete: "SET NULL",
    });

    Metric_Summary.belongsTo(Campaign, {
      foreignKey: "campaignId",
      as: "campaign",
    });

    // ======================================================
    // INTERMEDIATE TABLE ↔ TENANT
    // ======================================================

    Tenant.hasMany(Property_Characteristic, { foreignKey: "tenantId" });
    Tenant.hasMany(Property_Comodity, { foreignKey: "tenantId" });
    Tenant.hasMany(Property_Room, { foreignKey: "tenantId" });

    // ======================================================

    await sequelize.authenticate();
    console.log("DB connected");
  } catch (error) {
    console.error("DB error", error);
    process.exit(1);
  }
};
