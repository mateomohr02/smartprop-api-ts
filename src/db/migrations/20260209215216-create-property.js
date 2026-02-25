"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("properties", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tenants",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM("draft", "active", "rented", "sold", "archived"),
        allowNull: false,
        defaultValue: "draft",
      },

      heat: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },

      metrics: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          views: 0,
          interactions: 0,
          shared: 0,
        },
      },

      isFeatured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      slug: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      title: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      propertyTypeId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "property_types",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },

      priceAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      priceCurrency: {
        type: Sequelize.ENUM("ARS", "USD", "EUR", "BRL"),
        allowNull: true,
      },

      expensesAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      expensesCurrency: {
        type: Sequelize.ENUM("ARS", "USD", "EUR", "BRL"),
        allowNull: true,
      },

      roomsAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      neighborhoodId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "neighborhoods",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },

      cityId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "cities",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },

      provinceId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "provinces",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },

      countryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "countries",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },

      financing: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },

      operation: {
        type: Sequelize.ENUM("rent", "sale", "short-term"),
        allowNull: true,
      },

      roomsSummary: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      surface: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      services: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      condition: {
        type: Sequelize.ENUM("new", "like-new", "good", "to-renovate"),
        allowNull: true,
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      availability: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      location: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      multimedia: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    /*
    =========================
    ÍNDICES
    =========================
    */

    await queryInterface.addIndex("properties", ["tenantId", "slug"], {
      unique: true,
      name: "properties_tenant_slug_unique_index",
    });

    await queryInterface.addIndex("properties", ["tenantId", "status"]);
    await queryInterface.addIndex("properties", ["tenantId", "operation"]);
    await queryInterface.addIndex("properties", ["tenantId", "propertyTypeId"]);

    await queryInterface.addIndex("properties", ["tenantId", "priceAmount"]);
    await queryInterface.addIndex("properties", ["tenantId", "roomsAmount"]);
    await queryInterface.addIndex("properties", ["tenantId", "cityId"]);
    await queryInterface.addIndex("properties", ["tenantId", "neighborhoodId"]);

    await queryInterface.addIndex("properties", ["tenantId", "heat"]);
    await queryInterface.addIndex("properties", ["isFeatured"]);

    await queryInterface.addIndex("properties", ["services"], {
      using: "GIN",
      name: "properties_services_gin_index",
    });

    await queryInterface.addIndex("properties", ["surface"], {
      using: "GIN",
      name: "properties_surface_gin_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("properties");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_properties_status";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_properties_priceCurrency";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_properties_expensesCurrency";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_properties_operation";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_properties_condition";',
    );
  },
};
