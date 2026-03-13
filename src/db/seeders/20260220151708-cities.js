"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cities", [
      //MISIONES
      {
        id: "97c9f0e4-df21-4840-a1bc-04dfde45d927",
        name: "Eldorado",
        slug: "eldorado",
        provinceId: "f5b7f89f-edce-4f88-8472-12b89e00f05b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2689b91b-f91b-40e6-b8fe-ea641e6c1bc0",
        name: "Oberá",
        slug: "obera",
        provinceId: "f5b7f89f-edce-4f88-8472-12b89e00f05b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "73a0cb4d-01bf-4117-a057-419af3fea923",
        name: "Posadas",
        slug: "posadas",
        provinceId: "f5b7f89f-edce-4f88-8472-12b89e00f05b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //CÓRDOBA

      {
        id: "7ce79499-39b1-470b-a63a-58ba0b9ccab1",
        name: "Córdoba",
        slug: "cordoba",
        provinceId: "c473381f-42d8-4a6b-8750-ad7067483932",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: "75eab6dd-c5cb-401f-8330-ed5e5e2a8755",
        name: "Villa Carlos Paz",
        slug: "villa-carlos-paz",
        provinceId: "c473381f-42d8-4a6b-8750-ad7067483932",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //SANTA CATARINA

      {
        id: "8a855f08-96a5-4ff3-a1bf-7d3861c40e3a",
        name: "Florianópolis",
        slug: "florianopolis",
        provinceId: "dc43d5b9-716f-4f9b-b439-241217766dff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: "a02567fc-286e-471c-91bf-60b5b4bc402c",
        name: "Montevideo",
        slug: "montevideo",
        provinceId: "a4a1a138-8aea-4f73-a7b2-9c9da4103ac4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
