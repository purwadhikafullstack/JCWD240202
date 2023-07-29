'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class orders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            orders.belongsTo(models.carts, {
                foreignKey: 'cart_id',
            });
            orders.belongsTo(models.warehouses, {
                foreignKey: 'warehouse_id',
            });
            orders.hasMany(models.order_statuses, {
                foreignKey: "order_id"
            })
        }
    }
    orders.init(
        {
            cart_id: DataTypes.INTEGER,
            shipping_address: DataTypes.STRING,
            payment_proof: DataTypes.STRING,
            is_payment_success: DataTypes.BOOLEAN,
            courier: DataTypes.STRING,
            shipping_method: DataTypes.STRING,
            shipping_fee: DataTypes.INTEGER,
            total_weight: DataTypes.INTEGER,
            total_cart_price: DataTypes.INTEGER,
            warehouse_id: DataTypes.INTEGER,
            invoice_number: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'orders',
        },
    );
    return orders;
};
