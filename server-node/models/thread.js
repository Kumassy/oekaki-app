'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    isOpen: DataTypes.BOOLEAN
  });

  Thread.associate = function(models) {
    models.Thread.hasMany(models.Post, { foreignKey: 'threadId', as: 'posts' });
    models.Thread.hasMany(models.Comment, { foreignKey: 'threadId', as: 'comments' });
  };

  return Thread;
};
