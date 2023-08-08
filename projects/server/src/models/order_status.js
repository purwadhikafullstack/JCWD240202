'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class order_statuses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            order_statuses.belongsTo(models.orders, {
                foreignKey: 'order_id',
            });
            order_statuses.belongsTo(models.statuses, {
                foreignKey: 'status_id',
            });
        }
    }
    order_statuses.init(
        {
            status_id: DataTypes.INTEGER,
            order_id: DataTypes.INTEGER,
            expired: DataTypes.DATE,
            is_rejected: { type: DataTypes.BOOLEAN, defaultValue: false },
            is_active: { type: DataTypes.BOOLEAN },
        },
        {
            sequelize,
            modelName: 'order_statuses',
        },
    );
    return order_statuses;
};
