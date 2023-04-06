'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kill.belongsTo(models.Player, {foreignKey: 'deaderId'})
    }
  };
  Kill.init({
    killerId: DataTypes.INTEGER,
    deaderId: DataTypes.INTEGER,
    pointsGained: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kill',
  });
  return Kill;
};
