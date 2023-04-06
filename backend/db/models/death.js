'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Death extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Death.belongsTo(models.Player, {foreignKey: 'killerId'})
    }
  };
  Death.init({
    deaderId: DataTypes.INTEGER,
    killerId: DataTypes.INTEGER,
    pointsLost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Death',
  });
  return Death;
};
