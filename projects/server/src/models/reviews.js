'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class reviews extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            reviews.belongsTo(models.users, {
                foreignKey: 'user_id',
            });
            reviews.belongsTo(models.products, {
                foreignKey: 'product_id',
            });
            reviews.belongsTo(models.orders, {
                foreignKey: 'order_id',
            });
        }
    }
    reviews.init(
        {
            user_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            comment: { type: DataTypes.STRING(500), allowNull: true },
            rating: DataTypes.INTEGER,
            order_id: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            sequelize,
            modelName: 'reviews',
        },
    );
    return reviews;
};
