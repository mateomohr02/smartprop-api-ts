"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rooms", [
      {
        id: "858a546c-a7aa-43b4-9a3d-3d7990c4fb11",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        name: "Balcón",
        slug: "balcon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
