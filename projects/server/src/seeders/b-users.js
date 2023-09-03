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
            {
                id: 2,
                first_name: 'Bimo',
                last_name: 'Handoko',
                email: 'admin.aceh@ikewa.com',
                password: '$2b$10$5iRMukmznkTwQyhBMkOOuel.Ntws5h4A6MnbeQ3LDD.eZqfehY1Gm',
                phone_number: '081214860987',
                is_verified: true,
                role_id: 2,
                googleSignIn: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                first_name: 'Dede',
                last_name: 'Inoen',
                email: 'admin.padang@ikewa.com',
                password: '$2b$10$5iRMukmznkTwQyhBMkOOuel.Ntws5h4A6MnbeQ3LDD.eZqfehY1Gm',
                phone_number: '081212165322',
                is_verified: true,
                role_id: 2,
                googleSignIn: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                first_name: 'Jajang',
                last_name: 'Khairullah',
                email: 'admin.jakarta@ikewa.com',
                password: '$2b$10$5iRMukmznkTwQyhBMkOOuel.Ntws5h4A6MnbeQ3LDD.eZqfehY1Gm',
                phone_number: '081287418462',
                is_verified: true,
                role_id: 2,
                googleSignIn: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                first_name: 'Imanuella',
                last_name: 'Cindy',
                email: 'admin.semarang@ikewa.com',
                password: '$2b$10$5iRMukmznkTwQyhBMkOOuel.Ntws5h4A6MnbeQ3LDD.eZqfehY1Gm',
                phone_number: '081234567890',
                is_verified: true,
                role_id: 2,
                googleSignIn: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                email: 'iggythefool@gmail.com',
                password: '$2b$10$5iRMukmznkTwQyhBMkOOuel.Ntws5h4A6MnbeQ3LDD.eZqfehY1Gm',
                is_verified: true,
                role_id: 1,
                token_verification: false,
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
