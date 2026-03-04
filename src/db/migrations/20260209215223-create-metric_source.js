import { DataTypes } from "sequelize";

export default {
  up: async (queryInterface) => {
    // 2️⃣ Crear tabla
    await queryInterface.createTable("metric_sources", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },

      slug: {
        type: DataTypes.STRING(120),
        allowNull: false,
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

    // 3️⃣ Indexes
    await queryInterface.addIndex("metric_sources", ["slug"]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("metric_sources");
  },
};
