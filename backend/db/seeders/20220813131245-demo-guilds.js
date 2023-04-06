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
    await queryInterface.bulkInsert('Guilds', [
      {name: 'TWIX'},
      {name: 'BASE'},
      {name: 'GRUH'},
      {name: 'CHLEB'},
      {name: 'BOOM'},
      {name: 'ZGON'},
      {name: 'XRAY'},
      {name: 'CRAP'},
      {name: 'PLAN'},
      {name: 'REKT'},
      {name: 'LEKT'},
      {name: 'MACI'},
      {name: 'GTP'},
      {name: 'FIRE'},
      {name: 'UFOL'},
      {name: 'FLEX'},
      {name: 'NOLS'},
      {name: 'ZABA'},
      {name: 'FOXY'},
      {name: 'GANG'},
      {name: 'KRDS'},
      {name: 'HASA'},
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
