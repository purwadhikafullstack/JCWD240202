'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('warehouses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            province: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            province_id: {
                type: Sequelize.INTEGER,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city_id: {
                type: Sequelize.INTEGER,
            },
            subdistrict: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            street: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            postcode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            longitude: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            latitude: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('warehouses');
    },
};
