module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const IdentificationType = sequelize.define(
    'IdentificationType',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'identification_types' }
  );
  IdentificationType.associate = models => {
    const { Victim, Aggressor, User } = models;
    IdentificationType.hasMany(Victim, { as: 'victims', foreignKey: 'identificationTypeId' });
    IdentificationType.hasMany(Aggressor, { as: 'aggressors', foreignKey: 'identificationTypeId' });
    IdentificationType.hasMany(User, { as: 'users', foreignKey: 'identificationTypeId' });
  };
  return IdentificationType;
};
