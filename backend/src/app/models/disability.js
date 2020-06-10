module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const Disability = sequelize.define(
    'Disability',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'disabilities' }
  );
  Disability.associate = models => {
    const { Victim } = models;
    Disability.belongsToMany(Victim, {
      as: 'victims',
      through: 'disabilities_by_victim',
      foreignKey: 'disabilityId'
    });
  };
  return Disability;
};
