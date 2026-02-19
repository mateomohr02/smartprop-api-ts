"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("property_comodity", {
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

      comodityId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "comodities",
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
    await queryInterface.addConstraint("property_comodity", {
      fields: ["tenantId", "propertyId", "comodityId"],
      type: "unique",
      name: "property_comodity_unique_per_tenant",
    });

    // Índices individuales
    await queryInterface.addIndex("property_comodity", ["tenantId"]);
    await queryInterface.addIndex("property_comodity", ["propertyId"]);
    await queryInterface.addIndex("property_comodity", ["comodityId"]);

    // Índice compuesto útil para consultas frecuentes
    await queryInterface.addIndex(
      "property_comodity",
      ["tenantId", "propertyId"],
      {
        name: "property_comodity_tenant_property_index",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("property_comodity");
  },
};
