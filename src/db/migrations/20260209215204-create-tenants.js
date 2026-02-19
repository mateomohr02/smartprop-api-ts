"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tenants", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },

      phone: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Índices adicionales
    await queryInterface.addIndex("tenants", ["slug"], {
      unique: true,
      name: "tenants_slug_unique",
    });

    await queryInterface.addIndex("tenants", ["isActive"], {
      name: "tenants_isActive_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tenants");
  },
};
