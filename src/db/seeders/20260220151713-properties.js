"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("properties", [
      {
        id: "2a62abe2-42a5-4971-b9a3-74c86dd38a3c",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        status: "draft",
        heat: 0,
        metrics: JSON.stringify({
          views: 0,
          shared: 0,
          interactions: 0,
        }),
        isFeatured: false,
        slug: null,
        title: "Casa en Humboldt",
        description:
          "Casa en Humboldt de la IERPl, céntrica y con excelente iluminación",
        propertyTypeId: "bc21685c-8187-40a5-89de-393348669160",
        priceAmount: 65000,
        priceCurrency: "USD",
        expensesAmount: null,
        expensesCurrency: null,
        roomsAmount: null,
        neighborhoodId: null,
        cityId: null,
        provinceId: null,
        countryId: null,
        financing: null,
        operation: null,
        roomsSummary: null,
        surface: null,
        services: null,
        condition: null,
        age: null,
        availability: null,
        location: null,
        multimedia: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("properties", null, {});
  },
};
