'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    threadId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    caption: DataTypes.STRING
  });

  Post.associate = function(models) {
    models.Post.belongsTo(models.User, {
      as: 'user',
      onDelete: 'CASCADE',
      foreignKey: 'userId'
    });
    models.Post.belongsTo(models.Thread, {
      as: 'thread',
      onDelete: 'CASCADE',
      foreignKey: 'threadId'
    });
    models.Post.belongsTo(models.Image, {
      as: 'image',
      onDelete: 'CASCADE',
      foreignKey: 'imageId'
    });
  };

  return Post;
};
