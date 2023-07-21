'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class colors extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            colors.hasMany(models.products, {
                foreignKey: 'color_id',
            });
        }
    }
    colors.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'colors',
        },
    );
    return colors;
};
