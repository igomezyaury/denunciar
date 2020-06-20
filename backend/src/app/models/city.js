module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const City = sequelize.define(
    'City',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'cities' }
  );
  City.associate = models => {
    const { Victim, Aggressor } = models;
    City.hasMany(Victim, { as: 'victims', foreignKey: 'cityId' });
    City.hasMany(Aggressor, { as: 'aggressors', foreignKey: 'cityId' });
  };
  return City;
};
