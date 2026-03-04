import { DataTypes } from "sequelize";

export default {
  up: async (queryInterface) => {
    // 2️⃣ Crear tabla
    await queryInterface.createTable("searches", {
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

      propertyTypeId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "property_types",
          key: "id",
        },
        onDelete: "SET NULL",
      },

      operationType: {
        type: DataTypes.ENUM("sale", "rent", "short-term"),
        allowNull: true,
      },

      minPriceAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      maxpriceAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      priceCurrency: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      minExpensesAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      maxExpensesAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      expensesCurrency: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      minRoomsAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      maxRoomsAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      garages: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      financing: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      countryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "countries", key: "id" },
        onDelete: "SET NULL",
      },

      provinceId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "provinces", key: "id" },
        onDelete: "SET NULL",
      },

      cityId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "cities", key: "id" },
        onDelete: "SET NULL",
      },

      neighborhoodId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "neighborhoods", key: "id" },
        onDelete: "SET NULL",
      },

      rooms: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
      },

      characteristics: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
      },

      comodities: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
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

    // 3️⃣ Indexes B-Tree normales
    await queryInterface.addIndex("searches", ["tenantId"]);
    await queryInterface.addIndex("searches", ["tenantId", "createdAt"]);
    await queryInterface.addIndex("searches", ["tenantId", "propertyTypeId"]);
    await queryInterface.addIndex("searches", ["tenantId", "operationType"]);
    await queryInterface.addIndex("searches", ["tenantId", "cityId"]);
    await queryInterface.addIndex("searches", ["tenantId", "neighborhoodId"]);
    await queryInterface.addIndex("searches", ["tenantId", "bedrooms"]);
    await queryInterface.addIndex("searches", ["tenantId", "bathrooms"]);
    await queryInterface.addIndex("searches", ["tenantId", "garages"]);

    await queryInterface.sequelize.query(`
      CREATE INDEX searches_rooms_gin
      ON searches
      USING GIN ("rooms");
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX searches_characteristics_gin
      ON searches
      USING GIN ("characteristics");
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX searches_comodities_gin
      ON searches
      USING GIN ("comodities");
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("searches");

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_searches_operationType";
    `);
  },
};
