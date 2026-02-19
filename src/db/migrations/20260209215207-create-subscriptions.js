"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Asegurar extensión para gen_random_uuid()
    await queryInterface.sequelize.query(
      `CREATE EXTENSION IF NOT EXISTS pgcrypto;`,
    );

    await queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
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
        onUpdate: "CASCADE",
      },

      planId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM("active", "past_due", "canceled", "expired"),
        allowNull: false,
        defaultValue: "active",
      },

      billingCycle: {
        type: Sequelize.ENUM("monthly", "quarterly", "semester", "yearly"),
        allowNull: false,
      },

      autoRenew: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      priceSnapshot: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      featuresSnapshot: {
        type: Sequelize.JSONB,
        allowNull: false,
      },

      startedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      endsAt: {
        type: Sequelize.DATE,
        allowNull: false,
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

    /*
     |--------------------------------------------------------------------------
     | Índices Optimizados
     |--------------------------------------------------------------------------
     */

    // 1️⃣ Buscar suscripción activa de un tenant
    await queryInterface.addIndex("subscriptions", ["tenantId", "status"], {
      name: "subscriptions_tenant_status_index",
    });

    // 2️⃣ Buscar suscripciones vencidas (CRON)
    await queryInterface.addIndex("subscriptions", ["status", "endsAt"], {
      name: "subscriptions_status_endsAt_index",
    });

    // 3️⃣ Garantizar una sola suscripción activa por tenant
    await queryInterface.addIndex("subscriptions", ["tenantId"], {
      unique: true,
      where: {
        status: "active",
        deletedAt: null,
      },
      name: "subscriptions_one_active_per_tenant",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subscriptions");

    // Eliminar ENUMs explícitamente
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_subscriptions_status";',
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_subscriptions_billingCycle";',
    );
  },
};
