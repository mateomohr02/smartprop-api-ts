"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("metric_summaries", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },

      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      typeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "metric_types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      period: {
        type: Sequelize.ENUM("day", "week", "month"),
        allowNull: false,
      },

      periodStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      sourceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "metric_sources",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      campaignId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "campaigns",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      propertyId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "properties",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      postId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });

    // Índices individuales
    await queryInterface.addIndex("metric_summaries", ["tenantId"]);
    await queryInterface.addIndex("metric_summaries", ["typeId"]);
    await queryInterface.addIndex("metric_summaries", ["period"]);
    await queryInterface.addIndex("metric_summaries", ["periodStart"]);
    await queryInterface.addIndex("metric_summaries", ["sourceId"]);
    await queryInterface.addIndex("metric_summaries", ["campaignId"]);
    await queryInterface.addIndex("metric_summaries", ["propertyId"]);
    await queryInterface.addIndex("metric_summaries", ["postId"]);

    // Índice único compuesto (clave para evitar duplicados)
    await queryInterface.addIndex("metric_summaries", {
      unique: true,
      fields: [
        "tenantId",
        "typeId",
        "period",
        "periodStart",
        "sourceId",
        "campaignId",
        "propertyId",
        "postId",
      ],
      name: "metric_summaries_unique_period_dimension",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("metric_summaries");

    // Importante: eliminar el ENUM manualmente en Postgres
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_metric_summaries_period";',
    );
  },
};
