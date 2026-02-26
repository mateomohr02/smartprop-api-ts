"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("subscriptions", [
      {
        id: "831f001f-648a-42bd-820b-1303faf6400c",
        tenantId: "ead57677-6dd7-47d5-9a39-e561af7ad1e0",
        planId: "65392c06-2737-4be7-a8c1-94ee909ba95d",
        status: "active",
        billingCycle: "yearly",
        autoRenew: true,
        priceSnapshot: 9999999,
        featuresSnapshot: JSON.stringify({
          ai: true,
          metrics: "segmented",
          cashflow: true,
          socialMedia: true,
          propertieManager: true,
        }),
        startedAt: "2026-02-20 11:53:14.293-03",
        endsAt: "2027-02-20 11:53:14.293-03",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subscriptions", null, {});
  },
};
