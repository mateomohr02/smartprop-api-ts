"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("metrics", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      },

      type: {
        type: Sequelize.ENUM(
          "visit_site",
          "visit_blog",
          "visit_post",
          "visit_property",
          "share_property",
          "share_post",
          "search",
          "contact_whatsapp",
          "contact_email",
          "contact_instagram",
          "contact_facebook",
          "contact_form",
        ),
        allowNull: false,
      },

      source: {
        type: Sequelize.ENUM(
          "organic",
          "instagram",
          "facebook",
          "tiktok",
          "google",
        ),
        allowNull: false,
      },

      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: null,
      },

      propertyId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "properties",
          key: "id",
        },
        onDelete: "SET NULL",
      },

      postId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "SET NULL",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      deletedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("metrics", ["tenantId"]);
    await queryInterface.addIndex("metrics", ["tenantId", "type"]);
    await queryInterface.addIndex("metrics", ["tenantId", "source"]);
    await queryInterface.addIndex("metrics", ["tenantId", "propertyId"]);
    await queryInterface.addIndex("metrics", ["tenantId", "postId"]);
    await queryInterface.addIndex("metrics", ["tenantId", "createdAt"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("metrics");
  },
};
