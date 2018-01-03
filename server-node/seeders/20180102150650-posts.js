'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      id: 1,
      userId: 1,
      threadId: 1,
      imageId: 1,
      caption: 'orange',
      createdAt : new Date(),
      updatedAt : new Date()
    }, {
      id: 2,
      userId: 2,
      threadId: 2,
      imageId: 10,
      caption: 'pen',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
