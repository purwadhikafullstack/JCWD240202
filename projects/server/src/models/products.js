'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            products.hasMany(models.product_images, {
                foreignKey: 'product_id',
            });
            products.belongsTo(models.categories, {
                foreignKey: 'category_id',
            });
            products.belongsTo(models.colors, {
                foreignKey: 'color_id',
            });
            products.hasMany(models.cart_products, {
                foreignKey: 'product_id',
            });
            products.hasMany(models.product_stocks, {
                foreignKey: 'product_id',
            });
            products.hasMany(models.stock_histories, {
                foreignKey: 'product_id',
            });
            products.hasMany(models.mutations, {
                foreignKey: 'product_id',
            });
            products.hasMany(models.wishlists, {
                foreignKey: 'product_id',
            });
            products.hasMany(models.reviews, {
                foreignKey: 'product_id',
            });
        }
    }
    products.init(
        {
            name: DataTypes.STRING,
            category_id: { type: DataTypes.INTEGER, allowNull: true },
            color_id: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
            description: DataTypes.STRING(500),
            length: DataTypes.INTEGER,
            width: DataTypes.INTEGER,
            height: DataTypes.INTEGER,
            weight: DataTypes.INTEGER,
            is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
            total_stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        },
        {
            sequelize,
            modelName: 'products',
        },
    );
    return products;
};
