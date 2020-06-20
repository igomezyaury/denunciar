module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const RelationshipType = sequelize.define(
    'RelationshipType',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'relationship_types' }
  );
  RelationshipType.associate = models => {
    const { Representative } = models;
    RelationshipType.hasMany(Representative, { as: 'representatives', foreignKey: 'relationshipTypeId' });
  };
  return RelationshipType;
};
