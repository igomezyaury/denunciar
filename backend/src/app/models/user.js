const {
  USER_ROLES: { NORMAL }
} = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const User = sequelize.define(
    'User',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      email: { type: STRING, allowNull: false, unique: true },
      password: { type: STRING, allowNull: false },
      rol: { type: STRING, allowNull: false, defaultValue: NORMAL },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'users' }
  );
  User.associate = models => {
    const { Assistance } = models;
    User.hasMany(Assistance, { as: 'assistances', foreignKey: 'userId' });
  };
  return User;
};
