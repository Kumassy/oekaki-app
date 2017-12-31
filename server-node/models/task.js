'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var Task = sequelize.define('Task', {
//     title: DataTypes.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//         models.Task.belongsTo(models.User, {
//           onDelete: "CASCADE",
//           foreignKey: 'userId'
//         });
//       }
//     }
//   });
//   return Task;
// };
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING
  });

  Task.associate = function (models) {
    models.Task.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
