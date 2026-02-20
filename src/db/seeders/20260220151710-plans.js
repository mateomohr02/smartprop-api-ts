"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("plans", [
      {
        id: "65392c06-2737-4be7-a8c1-94ee909ba95d",
        name: "Admin",
        slug: "admin",
        price: 9999999,
        isActive: true,
        features: JSON.stringify({
          ai: true,
          metrics: "segmented",
          cashflow: true,
          socialMedia: true,
          propertieManager: true,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: "f813ae0a-a377-4c97-867d-a891b0ecaa74",
        name: "Basic",
        price: 45000,
        slug: "basic",
        isActive: true,
        features: JSON.stringify({
          metrics: "base",
          propertieManager: true,
          cashflow: false,
          ai: false,
          socialMedia: false,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: "580f28d5-c461-4701-80b9-61bc0926d293",
        name: "Pro",
        price: 65000,
        slug: "pro",
        isActive: true,
        features: JSON.stringify({
          metrics: "segmented",
          propertieManager: true,
          cashflow: true,
          ai: false,
          socialMedia: false,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("plans", null, {});
  },
};
