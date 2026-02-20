import { DataTypes } from "sequelize";

export async function up(queryInterface) {
  // Crear ENUM para method
  await queryInterface.sequelize.query(`
    CREATE TYPE "enum_payments_method" AS ENUM ('mercado-pago', 'stripe');
  `);

  // Crear ENUM para status
  await queryInterface.sequelize.query(`
    CREATE TYPE "enum_payments_status" AS ENUM ('pending', 'succeeded', 'failed', 'cancelled');
  `);

  await queryInterface.createTable("payments", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    method: {
      type: "enum_payments_method",
      allowNull: false,
    },

    paymentId: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },

    status: {
      type: "enum_payments_status",
      allowNull: false,
    },

    providerStatus: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tenants",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    subscriptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "subscriptions",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  // Índice único method + paymentId
  await queryInterface.addIndex("payments", ["method", "paymentId"], {
    unique: true,
    name: "payments_method_paymentId_unique",
  });

  await queryInterface.addIndex("payments", ["tenantId"], {
    name: "payments_tenantId_index",
  });

  await queryInterface.addIndex("payments", ["subscriptionId"], {
    name: "payments_subscriptionId_index",
  });

  await queryInterface.addIndex("payments", ["status"], {
    name: "payments_status_index",
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("payments");

  // Eliminar ENUMs manualmente (Postgres no los borra solo)
  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_payments_method";`,
  );
  await queryInterface.sequelize.query(
    `DROP TYPE IF EXISTS "enum_payments_status";`,
  );
}
