"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tenants", [
      {
        id: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        name: "Inmobiliaria Mohr",
        slug: "inmobiliaria-mohr",
        email: "inmo.mohr@gmail.com",
        phone: "3751613750",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("plans", null, {});
  },
};
