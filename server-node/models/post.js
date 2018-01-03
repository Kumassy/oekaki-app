'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    UserId: DataTypes.INTEGER,
    ThreadId: DataTypes.INTEGER,
    ImageId: DataTypes.INTEGER,
    caption: DataTypes.STRING
  });

  Post.associate = function(models) {
    models.Post.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Post.belongsTo(models.Thread, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    models.Post.belongsTo(models.Image, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
