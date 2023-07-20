'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('user_addresses', 'province_id', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        });
        await queryInterface.addColumn('user_addresses', 'city_id', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        });
        await queryInterface.addColumn('user_addresses', 'receiver_number', {
            type: Sequelize.STRING,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('user_addresses', 'province_id');
        await queryInterface.removeColumn('user_addresses', 'city_id');
        await queryInterface.removeColumn('user_addresses', 'token_edit_email');
        await queryInterface.removeColumn('user_addresses', 'receiver_number');
    },
};
