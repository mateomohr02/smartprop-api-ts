"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("countries", [
      {
        id: "0d556f84-a7d0-4c61-a97d-15daf53ac66b",
        name: "Argentina",
        slug: "argentina",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6eff0efd-48a0-48f1-908a-a52ae3379d37",
        name: "Brasil",
        slug: "brasil",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ff05ea1d-f514-4e44-bbb6-4f265066f81e",
        name: "Uruguay",
        slug: "uruguay",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
