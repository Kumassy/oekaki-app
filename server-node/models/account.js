'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    provider: DataTypes.STRING,
    uid: DataTypes.STRING,
    token: DataTypes.STRING,
    tokenSecret: DataTypes.STRING
  });

  Account.associate = function(models) {
    models.Account.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Account;
};
