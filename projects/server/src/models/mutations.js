'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mutations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mutations.init({
    product_id: DataTypes.INTEGER,
    warehouse_origin_id: DataTypes.INTEGER,
    warehouse_destination_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'mutations',
  });
  return mutations;
};