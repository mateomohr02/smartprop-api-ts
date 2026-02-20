"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modifications", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      previousValue: {
        type: Sequelize.JSONB, // PostgreSQL recomendado
        allowNull: false,
      },

      currentValue: {
        type: Sequelize.JSONB,
        allowNull: false,
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

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
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

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    // Índices simples
    await queryInterface.addIndex("modifications", ["tenantId"]);
    await queryInterface.addIndex("modifications", ["userId"]);
    await queryInterface.addIndex("modifications", ["postId"]);
    await queryInterface.addIndex("modifications", ["propertyId"]);

    // Índices compuestos (optimización multi-tenant)
    await queryInterface.addIndex("modifications", ["tenantId", "propertyId"]);
    await queryInterface.addIndex("modifications", ["tenantId", "postId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("modifications");
  },
};
