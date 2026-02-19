"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cities", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      provinceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "provinces",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Índice único compuesto (provinceId + slug)
    await queryInterface.addIndex("cities", ["provinceId", "slug"], {
      unique: true,
      name: "cities_province_slug_unique_index",
    });

    // Índice para joins y filtros
    await queryInterface.addIndex("cities", ["provinceId"], {
      name: "cities_province_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("cities");
  },
};
