"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("property_room", {
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

      roomId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "rooms", // ⚠️ revisar si no es "comodities"
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      detail: {
        type: Sequelize.JSONB,
        defaultValue: {
          amount: 1,
          size: [],
        },
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
    await queryInterface.addConstraint("property_room", {
      fields: ["tenantId", "propertyId", "roomId"],
      type: "unique",
      name: "property_room_unique_per_tenant",
    });

    // Índices individuales
    await queryInterface.addIndex("property_room", ["tenantId"]);
    await queryInterface.addIndex("property_room", ["propertyId"]);
    await queryInterface.addIndex("property_room", ["roomId"]);

    // Índice compuesto útil para consultas frecuentes
    await queryInterface.addIndex("property_room", ["tenantId", "propertyId"], {
      name: "property_room_tenant_property_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("property_room");
  },
};
