"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("characteristics", [
      {
        id: "9b37f793-8e70-4bef-bbc2-23b2d143820d",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        name: "Amoblado",
        slug: "amoblado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("characteristics", null, {});
  },
};
