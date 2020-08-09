module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const Assistance = sequelize.define(
    'Assistance',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      phoneNumber: { type: STRING, allowNull: false },
      firstCall: { type: BOOLEAN, allowNull: false },
      femicideRisk: { type: BOOLEAN, allowNull: false },
      code: { type: STRING, allowNull: false },
      summary: { type: STRING, allowNull: false },
      derivationObservation: { type: STRING, allowNull: false },
      assistanceType: { type: STRING, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'assistances' }
  );
  Assistance.associate = models => {
    const { Call, Victim, DerivationType, User } = models;
    Assistance.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    Assistance.belongsTo(DerivationType, { as: 'derivationType', foreignKey: 'derivationTypeId' });
    Assistance.belongsTo(Victim, { as: 'victim', foreignKey: 'victimId' });
    Assistance.hasOne(Call, { as: 'call', foreignKey: 'assistanceId' });
  };
  return Assistance;
};
