'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            users.hasMany(models.user_addresses, {
                foreignKey: 'user_id',
            });
            users.hasMany(models.carts, {
                foreignKey: 'user_id',
            });
            users.belongsTo(models.roles, {
                foreignKey: 'role_id',
            });

            users.hasOne(models.warehouses, {
                foreignKey: 'user_id',
            });
            users.hasMany(models.stock_histories, {
                foreignKey: 'user_id'
            })
            users.hasMany(models.wishlists, {
                foreignKey: 'user_id',
            });
            users.hasMany(models.reviews, {
                foreignKey: 'user_id',
            });
        }
    }
    users.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        msg: 'Email must be valid!',
                    },
                },
            },
            birth_date: DataTypes.DATE,
            password: DataTypes.STRING,
            profile_picture: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
            role_id: DataTypes.INTEGER,
            token_verification: DataTypes.STRING,
            token_password: DataTypes.STRING,
            googleSignIn: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            sequelize,
            modelName: 'users',
        },
    );
    return users;
};
