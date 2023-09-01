'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notifications.init({
    user_id: DataTypes.INTEGER,
    order_id: { type: DataTypes.INTEGER, allowNull: false},
    message: DataTypes.STRING(500),
    title: DataTypes.STRING,
    is_read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};