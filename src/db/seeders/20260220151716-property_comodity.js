"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("property_comodity", [
      {
        id: "4758fcba-4434-46d4-ba44-810f43f99272",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        propertyId: "2a62abe2-42a5-4971-b9a3-74c86dd38a3c",
        comodityId: "78b1e54f-19ad-4259-8aa7-5f85f88be525",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("property_comodity", null, {});
  },
};
