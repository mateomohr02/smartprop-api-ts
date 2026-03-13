"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("neighborhoods", [
      //CÓRDOBA
      {
        id: "66d582a6-52f7-460b-bd32-4ca8521fae42",
        name: "Nueva Córdoba",
        slug: "nueva-cordoba",
        cityId: "7ce79499-39b1-470b-a63a-58ba0b9ccab1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7db9537d-ef09-4e07-b59f-159568735511",
        name: "Cerro de las Rosas",
        slug: "cerro-de-las-rosas",
        cityId: "7ce79499-39b1-470b-a63a-58ba0b9ccab1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      //Eldorado

      {
        id: "c364a8e0-6ddb-4ba4-8a0c-6739db19a49e",
        name: "San Juan",
        slug: "san-juan",
        cityId: "97c9f0e4-df21-4840-a1bc-04dfde45d927",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "26ab0064-df02-4d48-a789-20bcec0bf0f6",
        name: "KM 11",
        slug: "km-11",
        cityId: "97c9f0e4-df21-4840-a1bc-04dfde45d927",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("neighborhoods", null, {});
  },
};
