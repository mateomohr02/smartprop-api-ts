"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("neighborhoods", {
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

      cityId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "cities",
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

    // UNIQUE (cityId + slug)
    await queryInterface.addIndex("neighborhoods", ["cityId", "slug"], {
      unique: true,
      name: "neighborhoods_city_slug_unique_index",
    });

    // Índice para joins
    await queryInterface.addIndex("neighborhoods", ["cityId"], {
      name: "neighborhoods_city_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("neighborhoods");
  },
};
