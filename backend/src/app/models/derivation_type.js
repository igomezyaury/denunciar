module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const DerivationType = sequelize.define(
    'DerivationType',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'derivation_types' }
  );
  DerivationType.associate = models => {
    const { Assistance } = models;
    DerivationType.belongsToMany(Assistance, {
      as: 'assistances',
      through: 'derivation_types_by_assistance',
      foreignKey: 'derivationTypeId'
    });
  };
  return DerivationType;
};
