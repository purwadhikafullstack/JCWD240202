'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('types', [
            {
                name: 'Manual Update',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Sales',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Mutation',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Canceled',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('types', null, {});
    },
};
