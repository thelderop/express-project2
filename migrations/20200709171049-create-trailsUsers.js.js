'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trailsUsers', {
      userId: {
        type: Sequelize.INTEGER
      },
      trailId: {
        type: Sequelize.INTEGER
      },
      rank: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 5
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('trailsUsers');
  }
};
