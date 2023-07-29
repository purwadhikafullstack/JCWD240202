'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class warehouses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            warehouses.belongsTo(models.users, {
                foreignKey: 'user_id',
            });
            warehouses.hasMany(models.orders, {
                foreignKey: 'warehouse_id'
            })
        }
    }
    warehouses.init(
        {
            user_id: DataTypes.INTEGER,
            province: DataTypes.STRING,
            province_id: DataTypes.INTEGER,
            city: DataTypes.STRING,
            city_id: DataTypes.INTEGER,
            subdistrict: DataTypes.STRING,
            street: DataTypes.STRING,
            postcode: DataTypes.INTEGER,
            longitude: DataTypes.STRING,
            latitude: DataTypes.STRING,
            is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            sequelize,
            modelName: 'warehouses',
        },
    );
    return warehouses;
};
