"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("metric_types", [
      {
        id: "018c25a5-d0e5-4a4c-b1d1-d799db8389dd",
        name: "Visit Site",
        slug: "visit-site",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "18c0ae7a-ccfd-4517-9d89-dbe1533fdd31",
        name: "Visit Blog",
        slug: "visit-blog",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "248ae32a-74ac-47aa-9de9-5b4c09ca75dd",
        name: "Visit Contact",
        slug: "visit-contact",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4f7254e6-f273-4019-b306-54e12a6887e2",
        name: "Detail Property",
        slug: "detail-property",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "35c053e4-f80e-415f-bc97-89ff3bbb6f3a",
        name: "Detail Post",
        slug: "deatil-post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8a91b1ec-3177-451e-9f33-ece0a7b70c0d",
        name: "Share Property",
        slug: "share-property",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "bcdfbb7e-0c66-4041-842b-e702230f0202",
        name: "Share Post",
        slug: "share-post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b59725c4-5896-4f64-bf55-c3ec5b09b917",
        name: "Contact Whatsapp",
        slug: "contact-whatsapp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2c84a509-3f38-4913-9c75-7700897d6901",
        name: "Contact Instagram",
        slug: "contact-instagram",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "76ccd622-5038-444f-97b6-720ea879eba4",
        name: "Contact Email",
        slug: "contact-email",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e4658bc0-3083-42e6-9793-ecab17fb0900",
        name: "Contact Form",
        slug: "contact-form",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("metric_types", null, {});
  },
};
