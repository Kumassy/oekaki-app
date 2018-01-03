'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    avatar: DataTypes.INTEGER
  });

  User.associate = function(models) {
    models.User.hasMany(models.Account, { foreignKey: 'userId', as: 'accounts' });
  };

  return User;
};
