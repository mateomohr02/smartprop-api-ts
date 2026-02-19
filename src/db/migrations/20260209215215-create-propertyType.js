"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("property_types", {
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

    // UNIQUE (tenantId + slug)
    await queryInterface.addIndex("property_types", ["tenantId", "slug"], {
      unique: true,
      name: "property_types_tenant_slug_unique_index",
    });

    // INDEX tenantId
    await queryInterface.addIndex("property_types", ["tenantId"], {
      name: "property_types_tenant_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("property_types");
  },
};
