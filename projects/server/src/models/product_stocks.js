'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product_stocks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            product_stocks.belongsTo(models.products, {
                foreignKey: 'product_id',
            });
            product_stocks.belongsTo(models.warehouses, {
                foreignKey: 'warehouse_id',
            });
        }
    }
    product_stocks.init(
        {
            product_id: DataTypes.INTEGER,
            warehouse_id: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'product_stocks',
        },
    );
    return product_stocks;
};
