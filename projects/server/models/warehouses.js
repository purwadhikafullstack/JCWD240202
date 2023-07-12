'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  warehouses.init({
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    subdistrict: DataTypes.STRING,
    street: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'warehouses',
  });
  return warehouses;
};