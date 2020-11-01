'use strict';

module.exports = {
  up: (queryInterface, { BOOLEAN }) => {
    const promises = [];
    promises.push(
      queryInterface.addColumn('aggressors', 'weapons_handling', { type: BOOLEAN, allowNull: true }),
      queryInterface.addColumn('aggressors', 'substances_use', { type: BOOLEAN, allowNull: true })
    );
    return Promise.all(promises);
  },

  down: queryInterface => {
    const promises = [];
    promises.push(
      queryInterface.removeColumn('aggressors', 'weapons_handling'),
      queryInterface.removeColumn('aggressors', 'substances_use')
    );
    return Promise.all(promises);
  }
};
