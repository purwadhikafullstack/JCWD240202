'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class statuses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            statuses.hasMany(models.order_statuses, {
                foreignKey: 'status_id',
            });
        }
    }
    statuses.init(
        {
            name: DataTypes.STRING,
            label: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'statuses',
        },
    );
    return statuses;
};
