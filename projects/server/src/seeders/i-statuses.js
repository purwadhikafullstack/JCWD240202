'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('statuses', [
            {
                id: 1,
                name: 'Waiting for payment',
                label: 'New Order',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Waiting for payment confirmation',
                label: 'Confirmation',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'Order is being processed',
                label: 'Processing',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'In delivery',
                label: 'In Delivery',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: 'Order confirmed',
                label: 'Done',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                name: 'Order canceled',
                label: 'Canceled',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('statuses', null, {});
    },
};
