module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const OriginType = sequelize.define(
    'OriginType',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'origin_types' }
  );
  OriginType.associate = models => {
    const { Call } = models;
    OriginType.hasMany(Call, { as: 'calls', foreignKey: 'originTypeId' });
  };
  return OriginType;
};
