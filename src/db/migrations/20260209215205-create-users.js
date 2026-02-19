"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear ENUM para role (Postgres)
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      role: {
        type: Sequelize.ENUM("admin", "user", "viewer"),
        allowNull: false,
        defaultValue: "user",
      },

      name: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      lastName: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      password: {
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
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

    // Índice único compuesto (email único por tenant)
    await queryInterface.addIndex("users", ["tenantId", "email"], {
      unique: true,
      name: "users_tenant_email_unique",
    });

    // Índice para consultas frecuentes
    await queryInterface.addIndex("users", ["tenantId", "isActive"], {
      name: "users_tenant_isActive_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");

    // Eliminar ENUM manualmente (Postgres)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";',
    );
  },
};
