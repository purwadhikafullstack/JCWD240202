'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class stock_histories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            stock_histories.belongsTo(models.products, {
                foreignKey: 'product_id',
            });
            stock_histories.belongsTo(models.mutations, {
                foreignKey: 'mutation_id',
            });
            stock_histories.belongsTo(models.types, {
                foreignKey: 'type_id',
            });
            stock_histories.belongsTo(models.informations, {
                foreignKey: 'information_id',
            });
        }
    }
    stock_histories.init(
        {
            product_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            mutation_id: DataTypes.INTEGER,
            order_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            warehouse_id: DataTypes.INTEGER,
            type_id: DataTypes.INTEGER,
            information_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'stock_histories',
        },
    );
    return stock_histories;
};
