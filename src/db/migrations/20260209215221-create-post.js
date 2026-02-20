"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      title: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      content: {
        type: Sequelize.JSONB, // PostgreSQL recomendado
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("active", "drafted", "archived"),
        allowNull: false,
        defaultValue: "drafted",
      },

      authorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
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

    // Índice único multi-tenant
    await queryInterface.addIndex("posts", ["tenantId", "slug"], {
      unique: true,
      name: "posts_tenant_slug_unique",
    });

    // Índice por author
    await queryInterface.addIndex("posts", ["authorId"]);

    // Índice para listados por estado
    await queryInterface.addIndex("posts", ["tenantId", "status"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");

    // Limpiar ENUM manualmente (PostgreSQL)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_posts_status";',
    );
  },
};
