module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const VulnerablePopulation = sequelize.define(
    'VulnerablePopulation',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'vulnerable_populations' }
  );
  VulnerablePopulation.associate = models => {
    const { Call } = models;
    VulnerablePopulation.hasMany(Call, { as: 'calls', foreignKey: 'vulnerablePopulationId' });
  };
  return VulnerablePopulation;
};
