'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Deaths', [
      {
        killerId: 1,
        deaderId: 4,
        pointsLost: 17
      },
      {
        killerId: 1,
        deaderId: 2,
        pointsLost: 9
      },
      {
        killerId: 3,
        deaderId: 5,
        pointsLost: 28
      },
      {
        killerId: 3,
        deaderId: 1,
        pointsLost: 7
      },
      {
        killerId: 3,
        deaderId: 17,
        pointsLost: 48
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
