module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, INTEGER } = DataTypes;
  const Victim = sequelize.define(
    'Victim',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true },
      name: { type: STRING, allowNull: false },
      identificationCode: { type: STRING, allowNull: false },
      firstName: { type: STRING, allowNull: false },
      lastName: { type: STRING, allowNull: false },
      phoneNumber: { type: STRING, allowNull: false },
      address: { type: STRING, allowNull: false },
      birthDate: { type: DATE, allowNull: true },
      age: { type: INTEGER, allowNull: true },
      sex: { type: STRING, allowNull: true },
      sexClarification: { type: STRING, allowNull: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'victims' }
  );
  Victim.associate = models => {
    const { IdentificationType, City, Disability, Assistance } = models;
    Victim.belongsTo(IdentificationType, { as: 'identificationType', foreignKey: 'identificationTypeId' });
    Victim.belongsTo(City, { as: 'city', foreignKey: 'cityId' });
    Victim.belongsToMany(Disability, {
      as: 'disabilities',
      through: 'disabilities_by_victim',
      foreignKey: 'victimId'
    });
    Victim.hasMany(Assistance, { as: 'assistances', foreignKey: 'victimId' });
  };
  return Victim;
};
