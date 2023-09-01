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
        await queryInterface.bulkInsert('users', [
            {
                id: 1,
                first_name: 'super',
                last_name: 'admin',
                email: 'superadmin@ikewa.com',
                password: '$2b$10$5iRMukmznkTwQyhBMkOOuel.Ntws5h4A6MnbeQ3LDD.eZqfehY1Gm',
                is_verified: true,
                role_id: 3,
                googleSignIn: 0,
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
        await queryInterface.bulkDelete('users', null, {});
    },
};
