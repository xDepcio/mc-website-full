'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guild.hasMany(models.Player, {
        foreignKey: 'guildId',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  };
  Guild.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Guild',
  });
  return Guild;
};
