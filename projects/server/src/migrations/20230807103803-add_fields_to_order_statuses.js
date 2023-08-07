'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('order_statuses', 'expired', {
            type: Sequelize.DATE,
        });
        await queryInterface.addColumn('order_statuses', 'is_rejected', {
            type: Sequelize.BOOLEAN,
        });
        await queryInterface.addColumn('order_statuses', 'is_active', {
            type: Sequelize.BOOLEAN,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('order_statuses', 'expired');
        await queryInterface.removeColumn('order_statuses', 'is_rejected');
        await queryInterface.removeColumn('order_statuses', 'is_active');
    },
};
