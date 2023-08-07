'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class informations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      informations.hasMany(models.stock_histories, {
        foreignKey: 'information_id'
      })
    }
  }
  informations.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'informations',
  });
  return informations;
};