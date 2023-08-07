'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('statuses', [
            {
                name: 'Waiting For Payment',
                label: 'New Order',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Waiting For Payment Confirmation',
                label: 'Confirmation',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Order is being Processed',
                label: 'Processing',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'In Delivery',
                label: 'Shipped',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Order Confirmed',
                label: 'Done',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Order Cancelled',
                label: 'Cancelled',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('statuses', null, {});
    },
};
