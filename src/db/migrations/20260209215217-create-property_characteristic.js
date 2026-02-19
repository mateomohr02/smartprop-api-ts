"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("property_characteristic", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "properties",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      characteristicId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "characteristics",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    CONSTRAINTS E ÍNDICES
    =========================
    */

    // Unique compuesto multi-tenant
    await queryInterface.addConstraint("property_characteristic", {
      fields: ["tenantId", "propertyId", "characteristicId"],
      type: "unique",
      name: "property_characteristic_unique_per_tenant",
    });

    // Índices para performance
    await queryInterface.addIndex("property_characteristic", ["tenantId"]);
    await queryInterface.addIndex("property_characteristic", ["propertyId"]);
    await queryInterface.addIndex("property_characteristic", [
      "characteristicId",
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("property_characteristic");
  },
};
