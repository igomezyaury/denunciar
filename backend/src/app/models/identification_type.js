module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN } = DataTypes;
  const IdentificationType = sequelize.define(
    'IdentificationType',
    {
      id: { type: STRING, allowNull: false, primaryKey: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'identification_types' }
  );
  IdentificationType.associate = models => {
    const { Victim, Aggressor } = models;
    IdentificationType.hasMany(Victim, { as: 'victims', foreignKey: 'identificationTypeId' });
    IdentificationType.hasMany(Aggressor, { as: 'aggressors', foreignKey: 'identificationTypeId' });
  };
  return IdentificationType;
};
