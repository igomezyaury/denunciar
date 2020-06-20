module.exports = (sequelize, DataTypes) => {
  const { TEXT } = DataTypes;
  return sequelize.define(
    'TokenBlacklist',
    {
      accessToken: {
        type: TEXT,
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'tokens_blacklist',
      timestamps: false,
      paranoid: false
    }
  );
};
