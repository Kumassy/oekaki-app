'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    threadId: DataTypes.INTEGER,
    message: DataTypes.STRING
  });

  Comment.associate = function(models) {
    models.Comment.belongsTo(models.User, {
      as: 'user',
      onDelete: 'CASCADE',
      foreignKey: 'userId'
    });
    models.Comment.belongsTo(models.Thread, {
      as: 'thread',
      onDelete: 'CASCADE',
      foreignKey: 'threadId'
    });
  };
  return Comment;
};
