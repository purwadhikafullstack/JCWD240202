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
                    msg: "Email must be valid!",
                  },
                },
              },
            birth_date: DataTypes.DATE,
            password: DataTypes.STRING,
            profile_picture: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            is_verified: DataTypes.BOOLEAN,
            role: DataTypes.STRING,
            token_verification: DataTypes.STRING,
            token_password: DataTypes.STRING,
            token_edit_email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'users',
        },
    );
    return users;
};