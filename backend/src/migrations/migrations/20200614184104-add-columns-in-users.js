'use strict';

module.exports = {
  up: (queryInterface, { STRING, INTEGER }) => {
    const promises = [];
    promises.push(
      queryInterface.addColumn('users', 'username', { type: STRING, allowNull: false }),
      queryInterface.addColumn('users', 'first_name', { type: STRING, allowNull: false }),
      queryInterface.addColumn('users', 'last_name', { type: STRING, allowNull: false }),
      queryInterface.addColumn('users', 'identification_code', { type: STRING, allowNull: false }),
      queryInterface.addColumn('users', 'birth_date', { type: STRING, allowNull: false }),
      queryInterface.addColumn('users', 'failed_login_attempts', {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      }),
      queryInterface.addColumn('users', 'identification_type_id', {
        type: INTEGER,
        references: {
          model: 'identification_types',
          key: 'id'
        },
        allowNull: false
      })
    );
    return Promise.all(promises);
  },

  down: queryInterface => {
    const promises = [];
    promises.push(
      queryInterface.removeColumn('users', 'username'),
      queryInterface.removeColumn('users', 'first_name'),
      queryInterface.removeColumn('users', 'last_name'),
      queryInterface.removeColumn('users', 'identification_code'),
      queryInterface.removeColumn('users', 'birth_date'),
      queryInterface.removeColumn('users', 'failed_login_attempts'),
      queryInterface.removeColumn('users', 'identification_type_id')
    );
    return Promise.all(promises);
  }
};
