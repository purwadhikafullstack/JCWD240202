'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class carts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            carts.hasMany(models.cart_products, {
                foreignKey: 'cart_id',
            });
        }
    }
    carts.init(
        {
            user_id: DataTypes.INTEGER,
            is_checkout: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'carts',
        },
    );
    return carts;
};
