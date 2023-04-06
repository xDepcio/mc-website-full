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
    await queryInterface.bulkInsert('Kills', [
      {
        killerId: 1,
        deaderId: 4,
        pointsGained: 21
      },
      {
        killerId: 1,
        deaderId: 2,
        pointsGained: 12
      },
      {
        killerId: 3,
        deaderId: 5,
        pointsGained: 32
      },
      {
        killerId: 3,
        deaderId: 1,
        pointsGained: 9
      },
      {
        killerId: 3,
        deaderId: 17,
        pointsGained: 56
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
