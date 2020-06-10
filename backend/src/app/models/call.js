module.exports = (sequelize, DataTypes) => {
  const { STRING, DATE, INTEGER } = DataTypes;
  const Call = sequelize.define(
    'Call',
    {
      id: { type: INTEGER, allowNull: false, primaryKey: true },
      issueAddress: { type: STRING, allowNull: false },
      createdAt: { type: DATE, allowNull: false },
      updatedAt: { type: DATE, allowNull: false },
      deletedAt: DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'calls' }
  );
  Call.associate = models => {
    const {
      Aggressor,
      Assistance,
      Representative,
      VulnerablePopulation,
      ComplaintReason,
      ViolenceType,
      OriginType
    } = models;
    Call.hasOne(Aggressor, { as: 'aggressor', foreignKey: 'callId' });
    Call.hasOne(Representative, { as: 'representative', foreignKey: 'callId' });
    Call.belongsTo(VulnerablePopulation, {
      as: 'vulnerablePopulation',
      foreignKey: { name: 'vulnerablePopulationId', allowNull: true }
    });
    Call.belongsTo(ComplaintReason, { as: 'complaintReason', foreignKey: 'complaintReasonId' });
    Call.belongsToMany(ViolenceType, {
      as: 'violenceTypes',
      through: 'violence_types_by_call',
      foreignKey: 'callId'
    });
    Call.belongsTo(OriginType, { as: 'originType', foreignKey: 'originTypeId' });
    Call.belongsTo(Assistance, { as: 'assistance', foreignKey: 'assistanceId' });
  };
  return Call;
};
