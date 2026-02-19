"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("provinces", {
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

      countryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "countries",
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

    // Índice único compuesto (countryId + slug)
    await queryInterface.addIndex("provinces", ["countryId", "slug"], {
      unique: true,
      name: "provinces_country_slug_unique_index",
    });

    // Índice para mejorar performance en joins
    await queryInterface.addIndex("provinces", ["countryId"], {
      name: "provinces_country_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("provinces");
  },
};
