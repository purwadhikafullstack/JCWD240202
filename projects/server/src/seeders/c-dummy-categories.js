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
        await queryInterface.bulkInsert('categories', [
            {
                id: 1,
                name: 'LIVING ROOM',
                image: 'https://www.bhg.com/thmb/dgy0b4w_W0oUJUxc7M4w3H4AyDo=/1866x0/filters:no_upscale():strip_icc()/living-room-gallery-shelves-l-shaped-couch-ELeyNpyyqpZ8hosOG3EG1X-b5a39646574544e8a75f2961332cd89a.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'BEDROOM',
                image: 'https://hips.hearstapps.com/hmg-prod/images/ghk010121homefeature-008-1671137680.png?resize=1200:*',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'BATHROOM',
                image: 'https://hips.hearstapps.com/hmg-prod/images/allisonknizekdesign-erikabiermanphoto-5-1674499280.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'KITCHEN',
                image: 'https://i0.wp.com/media.dekoruma.com/article/2019/03/28111900/kitchen-set-dapur-modern-minimalis-dengan-kabinet-kayu.jpg?fit=1000%2C667&ssl=1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: 'DINING',
                image: 'https://www.southernliving.com/thmb/IZxhy8uo1y6G2H8ONFJqx3_8CgE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2577401_jacks_3791-1-51a1cd910a8d4a0099ebfa7760e9f488-257a0b98c4aa40ec84c0f059164194a0.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                name: 'WORKSPACE',
                image: 'https://image.archify.com/blog/03-How-to-Create-a-Comfortable-Workspace-at-Home.jpg',
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
        await queryInterface.bulkDelete('categories', null, {})
    },
};
