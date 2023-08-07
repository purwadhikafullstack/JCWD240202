'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class mutation_details extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            mutation_details.belongsTo(models.mutations, {
                foreignKey: 'mutation_id',
            });
            mutation_details.belongsTo(models.warehouses, {
                foreignKey: 'warehouse_destination_id',
            });
        }
    }
    mutation_details.init(
        {
            warehouse_destination_id: DataTypes.INTEGER,
            mutation_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'mutation_details',
        },
    );
    return mutation_details;
};
