'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Threads', [{
      id: 1,
      isOpen: true,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      id: 2,
      isOpen: false,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Threads', null, {});

  }
};
