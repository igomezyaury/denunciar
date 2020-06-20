const {
  USER_ROLES: { NORMAL }
} = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const User = sequelize.define(
    'User',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      username: { type: STRING, allowNull: false },
      firstName: { type: STRING, allowNull: false },
      lastName: { type: STRING, allowNull: false },
      identificationCode: { type: STRING, allowNull: false },
      birthDate: { type: DATE, allowNull: false },
      email: { type: STRING, allowNull: false, unique: true },
      password: { type: STRING, allowNull: false },
      rol: { type: STRING, allowNull: false, defaultValue: NORMAL },
      active: { type: BOOLEAN, allowNull: false },
      failedLoginAttempts: { type: INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'users' }
  );
  User.associate = models => {
    const { Assistance, IdentificationType } = models;
    User.hasMany(Assistance, { as: 'assistances', foreignKey: 'userId' });
    User.belongsTo(IdentificationType, {
      as: 'identificationType',
      foreignKey: { name: 'identificationTypeId' }
    });
  };
  return User;
};
