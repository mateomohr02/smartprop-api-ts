"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("property_types", [
      {
        id: "bc21685c-8187-40a5-89de-393348669160",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        name: "Casa",
        slug: "casa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ef80796b-2b4d-4a0d-8863-327cec6523a4",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        name: "Departamento",
        slug: "departamento",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("property_types", null, {});
  },
};
