'use strict';

const player = require("../models/player");

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
    for(let i = 0; i < 1000; i++) {
      let usedIds = new Set()
      let killerId = Math.floor(Math.random() * 65 + 1)
      usedIds.add(killerId)
      let deaderId = Math.floor(Math.random() * 65 + 1)
      usedIds.has(deaderId) ? deaderId = deaderId+1 : ''
      usedIds.add(deaderId)
      let points = Math.floor(Math.random() * 255 + 1)

      let kill = {
        killerId: killerId,
        deaderId: deaderId,
        pointsGained: points
      }

      let dead = {
        killerId: killerId,
        deaderId: deaderId,
        pointsLost: Math.floor(points*0.8)
      }

      await queryInterface.bulkInsert('Kills', [kill])
      await queryInterface.bulkInsert('Deaths', [dead])
    }


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
