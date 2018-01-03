'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [{
      id: 1,
      name: 'apple.png',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      id: 10,
      name: 'orange.png',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
