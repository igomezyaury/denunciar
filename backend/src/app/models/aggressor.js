module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, INTEGER } = DataTypes;
  const Aggressor = sequelize.define(
    'Aggressor',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      firstName: { type: STRING, allowNull: true },
      lastName: { type: STRING, allowNull: true },
      occupation: { type: STRING, allowNull: true },
      identificationCode: { type: STRING, allowNull: true },
      address: { type: STRING, allowNull: true },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'aggressors' }
  );
  Aggressor.associate = models => {
    const { IdentificationType, City, Call } = models;
    Aggressor.belongsTo(IdentificationType, {
      as: 'identificationType',
      foreignKey: { name: 'identificationTypeId', allowNull: true }
    });
    Aggressor.belongsTo(City, { as: 'city', foreignKey: { name: 'cityId', allowNull: true } });
    Aggressor.belongsTo(Call, { as: 'call', foreignKey: 'callId' });
  };
  return Aggressor;
};
