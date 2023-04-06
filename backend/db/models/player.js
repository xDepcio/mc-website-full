'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.belongsTo(models.Guild, {foreignKey: 'guildId'})
      Player.hasMany(models.Kill, {foreignKey: 'killerId'})
      Player.hasMany(models.Death, {foreignKey: 'deaderId'})
    }
  };
  Player.init({
    nickname: {
      type: DataTypes.STRING,
      unique: true
    },
    points: DataTypes.INTEGER,
    guildId: DataTypes.INTEGER,
    rank: DataTypes.STRING,
    guildRank: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
