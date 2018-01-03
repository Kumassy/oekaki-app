'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      id: 1,
      UserId: 1,
      ThreadId: 1,
      ImageId: 1,
      caption: 'orange',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      id: 2,
      UserId: 2,
      ThreadId: 2,
      ImageId: 10,
      caption: 'pen',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
