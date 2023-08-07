'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mutations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mutations.hasMany(models.stock_histories, {
        foreignKey: 'mutation_id'
      })
      mutations.belongsTo(models.warehouses, {
        foreignKey: 'warehouse_origin_id'
      })
      mutations.belongsTo(models.products, {
        foreignKey: 'product_id'
      })
      mutations.hasMany(models.mutation_details, {
        foreignKey: 'mutation_id'
      })
      mutations.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
    }
  }
  mutations.init({
    product_id: DataTypes.INTEGER,
    warehouse_origin_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_approved: {type: DataTypes.BOOLEAN, defaultValue: false},
    is_rejected: {type: DataTypes.BOOLEAN, defaultValue: false}
  }, {
    sequelize,
    modelName: 'mutations',
  });
  return mutations;
};
