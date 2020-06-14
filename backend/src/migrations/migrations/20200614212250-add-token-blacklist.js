'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, TEXT } = Sequelize;
    return queryInterface.createTable('tokens_blacklist', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: INTEGER
      },
      access_token: {
        type: TEXT,
        allowNull: false,
        unique: true
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('tokens_blacklist')
};
