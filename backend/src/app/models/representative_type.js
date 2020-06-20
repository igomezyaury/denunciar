module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const RepresentativeType = sequelize.define(
    'RepresentativeType',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'representative_types' }
  );
  RepresentativeType.associate = models => {
    const { Representative } = models;
    RepresentativeType.hasMany(Representative, { as: 'representatives', foreignKey: 'representativeTypeId' });
  };
  return RepresentativeType;
};
