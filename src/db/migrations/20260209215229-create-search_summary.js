import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface) => {
    // 2️⃣ Crear tabla
    await queryInterface.createTable("search_summaries", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      filterType: {
        type: DataTypes.ENUM(
          "priceRange",
          "expensesRange",
          "roomsRange",
          "city",
          "neighborhood",
          "propertyType",
          "operationType",
          "bedrooms",
          "bathrooms",
          "garages",
          "financing",
          "rooms",
          "characteristics",
          "comodities",
        ),
        allowNull: false,
      },

      filterValue: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      count: {
        type: DataTypes.INTEGER,
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
    await queryInterface.addIndex("search_summaries", ["tenantId"]);
    await queryInterface.addIndex("search_summaries", ["tenantId", "date"]);
    await queryInterface.addIndex("search_summaries", [
      "tenantId",
      "filterType",
    ]);
    await queryInterface.addIndex("search_summaries", [
      "tenantId",
      "date",
      "filterType",
    ]);
    await queryInterface.addIndex("search_summaries", [
      "tenantId",
      "filterType",
      "filterValue",
    ]);

    await queryInterface.addConstraint("search_summaries", {
      fields: ["tenantId", "date", "filterType", "filterValue"],
      type: "unique",
      name: "unique_search_summary_per_day",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("search_summaries");

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_search_summaries_filterType";
    `);
  },
};
