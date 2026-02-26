"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("comodities", [
      {
        id: "78b1e54f-19ad-4259-8aa7-5f85f88be525",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        name: "Encargado",
        slug: "encargado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comodities", null, {});
  },
};
