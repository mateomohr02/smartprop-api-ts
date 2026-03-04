import { DataTypes } from "sequelize";

const metricSources = ["organic", "instagram", "facebook", "tiktok", "google"];

export default {
  async up(queryInterface) {
    await queryInterface.createTable("campaigns", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },

      sourceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "metric_sources",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });

    await queryInterface.addIndex("campaigns", ["tenantId"]);

    await queryInterface.addIndex("campaigns", ["sourceId"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("campaigns");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_campaigns_source";',
    );
  },
};
