import { DataTypes, sql } from '@sequelize/core';

export const up = async ({ context: sequelize }) => {
  await sequelize.queryInterface.createTable('Contact', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: sql.uuidV4
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: true },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sql.fn('NOW')
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  });
};

export const down = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('Contact');
};
