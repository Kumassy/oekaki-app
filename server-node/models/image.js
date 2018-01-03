'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: DataTypes.STRING
  });

  Image.associate = function(models) {
    models.Image.hasOne(models.Post);
  };

  return Image;
};
