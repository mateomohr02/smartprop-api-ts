"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: "baab7c35-498d-451a-9d12-e962e2c0e870",
        role: "admin",
        name: "Mateo",
        lastName: "Mohr",
        password:
          "$2b$10$P02TjOG1k1Zj875snogm3O7U0guqPvCBVtjkU1H.ewWR8nDTc4SAu",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        email: "mohr.mateo@gmail.com",
        phone: "3751613750",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
