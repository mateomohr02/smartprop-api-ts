"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("metric_sources", [
      {
        id: "03701aa0-7073-4243-b646-0f27ed8a156b",
        name: "Organic",
        slug: "organic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7f84cb97-c93f-414a-b863-d6bafd9ad22c",
        name: "Facebook",
        slug: "facebook",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7a7aecae-e906-44bf-9500-d33a36a40480",
        name: "Instagram",
        slug: "instagram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a0d7331c-a966-4b12-bd37-7f12ae7997e8",
        name: "TitTok",
        slug: "tiktok",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c43e9690-96c5-4332-a12c-a687832cc80f",
        name: "Google Campaign",
        slug: "google-campaign",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1a304f5c-2c57-4103-8883-7efc9a23bad0",
        name: "LinkedIn",
        slug: "linkedin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("metric_sources", null, {});
  },
};
