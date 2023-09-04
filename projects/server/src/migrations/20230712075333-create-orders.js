'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cart_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            shipping_address: {
                type: Sequelize.STRING,
            },
            payment_proof: {
                type: Sequelize.STRING,
            },
            is_payment_success: {
                type: Sequelize.BOOLEAN,
            },
            courier: {
                type: Sequelize.STRING,
            },
            shipping_method: {
                type: Sequelize.STRING,
            },
            shipping_fee: {
                type: Sequelize.INTEGER,
            },
            total_weight: {
                type: Sequelize.INTEGER,
            },
            total_cart_price: {
                type: Sequelize.INTEGER,
            },
            warehouse_id: {
                type: Sequelize.INTEGER,
            },
            receiver_name: {
                type: Sequelize.STRING,
            },
            receiver_number: {
                type: Sequelize.STRING,
            },
            invoice_number: {
                type: Sequelize.STRING,
            },
            total: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('orders');
    },
};
