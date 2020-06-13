module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, BOOLEAN, INTEGER } = DataTypes;
  const ComplaintReason = sequelize.define(
    'ComplaintReason',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      active: { type: BOOLEAN, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'complaint_reasons' }
  );
  ComplaintReason.associate = models => {
    const { Call } = models;
    ComplaintReason.hasMany(Call, { as: 'calls', foreignKey: 'complaintReasonId' });
  };
  return ComplaintReason;
};
