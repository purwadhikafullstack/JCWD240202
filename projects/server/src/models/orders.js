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
                // as: 'latest_order_status',
                foreignKey: 'order_id',
            });
            orders.hasOne(models.stock_histories, {
                foreignKey: 'order_id',
            });
            orders.hasMany(models.reviews, {
                foreignKey: 'order_id',
            });
        }
    }
    orders.init(
        {
            cart_id: DataTypes.INTEGER,
            shipping_address: DataTypes.STRING,
            payment_proof: DataTypes.STRING,
            courier: DataTypes.STRING,
            shipping_method: DataTypes.STRING,
            shipping_fee: DataTypes.INTEGER,
            total_weight: DataTypes.INTEGER,
            total_cart_price: DataTypes.INTEGER,
            warehouse_id: DataTypes.INTEGER,
            invoice_number: { type: DataTypes.STRING, unique: true },
            total: DataTypes.INTEGER,
            receiver_name: DataTypes.STRING,
            receiver_number: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'orders',
        },
    );
    return orders;
};
