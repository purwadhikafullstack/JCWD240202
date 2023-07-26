'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user_addresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user_addresses.belongsTo(models.users, {
                foreignKey: 'user_id',
            });
        }
    }
    user_addresses.init(
        {
            user_id: DataTypes.INTEGER,
            receiver_name: DataTypes.STRING,
            receiver_number: DataTypes.STRING,
            province: DataTypes.STRING,
            province_id: DataTypes.INTEGER,
            city: DataTypes.STRING,
            city_id: DataTypes.INTEGER,
            subdistrict: DataTypes.STRING,
            street: DataTypes.STRING,
            postcode: DataTypes.INTEGER,
            longitude: DataTypes.STRING,
            latitude: DataTypes.STRING,
            is_primary: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            sequelize,
            modelName: 'user_addresses',
        },
    );
    return user_addresses;
};
