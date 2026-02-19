"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("characteristics", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      },

      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tenants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Índice único compuesto (tenantId + slug)
    await queryInterface.addIndex("characteristics", ["tenantId", "slug"], {
      unique: true,
      name: "characteristics_tenant_slug_unique_index",
    });

    // Índice para mejorar joins y filtros por tenant
    await queryInterface.addIndex("characteristics", ["tenantId"], {
      name: "characteristics_tenant_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("characteristics");
  },
};
