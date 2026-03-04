"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("metrics", {
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      sourceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "metric_sources",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      campaignId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "campaigns",
          key: "id",
        },
        onUpdate: "CASCADE",
      },

      propertyId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "properties",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      postId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.addIndex("metrics", ["tenantId"]);
    await queryInterface.addIndex("metrics", ["typeId"]);
    await queryInterface.addIndex("metrics", ["sourceId"]);
    await queryInterface.addIndex("metrics", ["campaignId"]);
    await queryInterface.addIndex("metrics", ["propertyId"]);
    await queryInterface.addIndex("metrics", ["postId"]);
    await queryInterface.addIndex("metrics", ["createdAt"]);

    // Índice compuesto clave para agregaciones por periodo
    await queryInterface.addIndex("metrics", [
      "tenantId",
      "typeId",
      "createdAt",
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("metrics");
  },
};
