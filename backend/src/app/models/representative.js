module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, INTEGER } = DataTypes;
  const Representative = sequelize.define(
    'Representative',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      firstName: { type: STRING, allowNull: false },
      lastName: { type: STRING, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'representatives' }
  );
  Representative.associate = models => {
    const { RepresentativeType, RelationshipType, Call } = models;
    Representative.belongsTo(RepresentativeType, {
      as: 'representativeType',
      foreignKey: 'representativeTypeId'
    });
    Representative.belongsTo(RelationshipType, {
      as: 'relationshipType',
      foreignKey: { name: 'relationshipTypeId', allowNull: true }
    });
    Representative.belongsTo(Call, { as: 'call', foreignKey: 'callId' });
  };
  return Representative;
};
