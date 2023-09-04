'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_addresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            receiver_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            receiver_number: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            province: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            province_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city_id: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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
            is_primary: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            is_chosen: {
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
        await queryInterface.dropTable('user_addresses');
    },
};
