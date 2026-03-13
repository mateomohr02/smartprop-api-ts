"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("provinces", [
      {
        id: "f5b7f89f-edce-4f88-8472-12b89e00f05b",
        name: "Misiones",
        slug: "misiones",
        countryId: "0d556f84-a7d0-4c61-a97d-15daf53ac66b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c473381f-42d8-4a6b-8750-ad7067483932",
        name: "Córdoba",
        slug: "cordoba",
        countryId: "0d556f84-a7d0-4c61-a97d-15daf53ac66b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e0a72a6a-dd3f-4609-a68d-4d88db893100",
        name: "Entre Ríos",
        slug: "entre-rios",
        countryId: "0d556f84-a7d0-4c61-a97d-15daf53ac66b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "dc43d5b9-716f-4f9b-b439-241217766dff",
        name: "Santa Catarina",
        slug: "santa-catarina",
        countryId: "6eff0efd-48a0-48f1-908a-a52ae3379d37",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a4a1a138-8aea-4f73-a7b2-9c9da4103ac4",
        name: "Montevideo",
        slug: "montevideo",
        countryId: "ff05ea1d-f514-4e44-bbb6-4f265066f81e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("provinces", null, {});
  },
};
