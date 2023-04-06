'use strict';

const {Guild} = require('../models')

const guildPlayers = [
  {
    name: 'TWIX',
    players: [
      {nickname: 'xDepcio', points: 1215, guildRank: 'leader'},
      {nickname: 'XDepccui', points: 1859, guildRank: 'vleader'},
      {nickname: 'SKAGENMACKA', points: 1497, guildRank: 'vleader'},
      {nickname: 'Hones', points: 1641, guildRank: 'master'},
      {nickname: 'N0rbi', points: 2134, guildRank: 'master'},
      {nickname: 'MaciusPL2015', points: 1158, guildRank: 'player'},
      {nickname: 'JDoooJD', points: 1301, guildRank: 'player'},
    ]
  },
  {
    name: 'BASE',
    players: [
      {nickname: 'xxxe', points: 2551, guildRank: 'leader'},
      {nickname: 'xDeppui', points: 2394, guildRank: 'player'},
      {nickname: 'xDepmy', points: 2253, guildRank: 'player'},
    ]
  },
  {
    name: 'GRUH',
    players: [
      {nickname: 'xDeprina', points: 2532, guildRank: 'leader'},
      {nickname: 'xxis', points: 2615, guildRank: 'player'},
      {nickname: 'xDepulette', points: 2246, guildRank: 'player'},
    ]
  },
  {
    name: 'CHLEB',
    players: [
      {nickname: 'xakin', points: 1975, guildRank: 'leader'},
      {nickname: 'xDeppiz', points: 1661, guildRank: 'player'},
      {nickname: 'xDepccem', points: 1430, guildRank: 'player'},
    ]
  },
  {
    name: 'BOOM',
    players: [
      {nickname: 'xea', points: 1424, guildRank: 'leader'},
      {nickname: 'xxlion', points: 2351, guildRank: 'player'},
      {nickname: 'xene', points: 2991, guildRank: 'player'},
    ]
  },
  {
    name: 'ZGON',
    players: [
      {nickname: 'xDepclion', points: 2317, guildRank: 'leader'},
      {nickname: 'xxxebur', points: 2738, guildRank: 'player'},
      {nickname: 'xDepccwill', points: 2288, guildRank: 'player'},
    ]
  },
  {
    name: 'XRAY',
    players: [
      {nickname: 'xebur', points: 1985, guildRank: 'leader'},
      {nickname: 'xDepcy', points: 1027, guildRank: 'player'},
      {nickname: 'Xxei', points: 2349, guildRank: 'player'},
    ]
  },
  {
    name: 'CRAP',
    players: [
      {nickname: 'sagenaster', points: 2880, guildRank: 'leader'},
      {nickname: 'agennio', points: 1836, guildRank: 'player'},
      {nickname: 'sagennina', points: 2007, guildRank: 'player'},
    ]
  },
  {
    name: 'PLAN',
    players: [
      {nickname: 'agenista', points: 2535, guildRank: 'leader'},
      {nickname: 'ssene', points: 2076, guildRank: 'player'},
      {nickname: 'skagenina', points: 2094, guildRank: 'player'},
    ]
  },
  {
    name: 'REKT',
    players: [
      {nickname: 'ennin', points: 2115, guildRank: 'leader'},
      {nickname: 'senka', points: 1961, guildRank: 'player'},
      {nickname: 'ssrina', points: 2511, guildRank: 'player'},
    ]
  },
  {
    name: 'LEKT',
    players: [
      {nickname: 'skagenenka', points: 1213, guildRank: 'leader'},
      {nickname: 'skagenicious', points: 1652, guildRank: 'player'},
      {nickname: 'skaggista', points: 1349, guildRank: 'player'},
    ]
  },
  {
    name: 'MACI',
    players: [
      {nickname: 'enui', points: 1789, guildRank: 'leader'},
      {nickname: 'sko', points: 2113, guildRank: 'player'},
      {nickname: 'skenui', points: 2660, guildRank: 'player'},
    ]
  },
  {
    name: 'GTP',
    players: [
      {nickname: 'sagennle', points: 1592, guildRank: 'leader'},
      {nickname: 'skmy', points: 1469, guildRank: 'player'},
      {nickname: 'skagenon', points: 1900, guildRank: 'player'},
    ]
  },
  {
    name: 'FIRE',
    players: [
      {nickname: 'ennui', points: 1507, guildRank: 'leader'},
      {nickname: 'skia', points: 1504, guildRank: 'player'},
      {nickname: 'Cubos', points: 1871, guildRank: 'player'},
    ]
  },
  {
    name: 'UFOL',
    players: [
      {nickname: 'Kajtoszek', points: 2866, guildRank: 'leader'},
      {nickname: 'xdf', points: 2968, guildRank: 'player'},
      {nickname: 'D2V', points: 2182, guildRank: 'player'},
    ]
  },
  {
    name: 'FLEX',
    players: [
      {nickname: 'Strati', points: 1386, guildRank: 'leader'},
      {nickname: 'Aycatine', points: 1184, guildRank: 'player'},
      {nickname: 'aycatie', points: 2603, guildRank: 'player'},
    ]
  },
  {
    name: 'NOLS',
    players: [
      {nickname: 'traycattmo', points: 1275, guildRank: 'leader'},
      {nickname: 'sttuy', points: 1379, guildRank: 'player'},
      {nickname: 'raycato', points: 2233, guildRank: 'player'},
    ]
  },
  {
    name: 'ZABA',
    players: [
      {nickname: 'strattite', points: 2580, guildRank: 'leader'},
      {nickname: 'straycatmo', points: 1926, guildRank: 'player'},
      {nickname: 'ststtenka', points: 2515, guildRank: 'player'},
    ]
  },
  {
    name: 'FOXY',
    players: [
      {nickname: 'ataster', points: 2097, guildRank: 'leader'},
      {nickname: 'stratui', points: 2150, guildRank: 'player'},
      {nickname: 'straycatem', points: 1292, guildRank: 'player'},
    ]
  },
  {
    name: 'GANG',
    players: [
      {nickname: 'strattea', points: 1103, guildRank: 'leader'},
      {nickname: 'straycat', points: 2024, guildRank: 'player'},
      {nickname: 'attrine', points: 2094, guildRank: 'player'},
    ]
  },
  {
    name: 'KRDS',
    players: [
      {nickname: 'ststtene', points: 1575, guildRank: 'leader'},
      {nickname: 'aycattee', points: 2471, guildRank: 'player'},
      {nickname: 'traycatio', points: 1614, guildRank: 'player'},
    ]
  },
  {
    name: 'HASA',
    players: [
      {nickname: 'straycataf', points: 1446, guildRank: 'leader'},
      {nickname: 'straycataster', points: 1888, guildRank: 'player'},
      {nickname: 'Denku', points: 2429, guildRank: 'player'},
    ]
  },
]

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
    for(let i = 0; i < guildPlayers.length; i++) {
      const {name, players} = guildPlayers[i]
      const guild = await Guild.findOne({where: {name: name}})

      for(let j = 0; j < players.length; j++) {
        const player = players[j]
        await guild.createPlayer(player)
      }
    }

    // await queryInterface.bulkInsert('Players', [
    //   {nickname: 'xDepcio', points: 1500, guildId: 1},
    //   {nickname: 'Kajtoszek', points: 1600, guildId: 1},
    //   {nickname: 'Cubos', points: 1700, guildId: 2},
    //   {nickname: 'MrEnglishMan', points: 1800, guildId: 2},
    //   {nickname: 'BoskiRomaneek', points: 1900, guildId: 3},
    //   {nickname: 'Maksmakl', points: 2000, guildId: 3},
    //   {nickname: 'Gumeczka', points: 2100, guildId: 3},
    //   {nickname: 'Marjusz_krvl', points: 2200, guildId: 4},
    //   {nickname: 's3tka', points: 2300, guildId: 5},
    // ])
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
