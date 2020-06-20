module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const ViolenceType = sequelize.define(
    'ViolenceType',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'violence_types' }
  );
  ViolenceType.associate = models => {
    const { Call } = models;
    ViolenceType.belongsToMany(Call, {
      as: 'calls',
      through: 'violence_types_by_call',
      foreignKey: 'violenceTypeId'
    });
  };
  return ViolenceType;
};
