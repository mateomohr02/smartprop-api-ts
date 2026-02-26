"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("metric_summaries", {
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

      period: {
        type: Sequelize.ENUM("day", "week", "month", "year"),
        allowNull: false,
      },

      periodStart: {
        type: Sequelize.DATE,
        allowNull: false,
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

      campaign: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ammount: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

    await queryInterface.addIndex("metric_summaries", [
      "tenantId",
      "period",
      "periodStart",
    ]);

    await queryInterface.addIndex("metric_summaries", ["tenantId", "type"]);

    await queryInterface.addIndex("metric_summaries", [
      "tenantId",
      "propertyId",
    ]);

    await queryInterface.addIndex("metric_summaries", ["tenantId", "postId"]);

    await queryInterface.addIndex("metric_summaries", ["tenantId", "source"]);

    await queryInterface.addIndex("metric_summaries", ["tenantId", "campaign"]);

    await queryInterface.addConstraint("metric_summaries", {
      fields: [
        "tenantId",
        "period",
        "periodStart",
        "type",
        "source",
        "campaign",
        "propertyId",
        "postId",
      ],
      type: "unique",
      name: "metric_summaries_unique_period",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("metric_summaries");
  },
};
