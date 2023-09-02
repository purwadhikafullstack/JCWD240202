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
        await queryInterface.bulkInsert('warehouses', [
            {
                id: 1,
                user_id: null,
                province: 'Nanggroe Aceh Darussalam (NAD)',
                province_id: 21,
                city: 'Kabupaten Aceh Besar',
                city_id: 3,
                subdistrict: 'Ingin Jaya',
                street: 'Jl. Banda Aceh - Medan Km 4 Meunasah Manyang Depan Turunan Jembatan Pango Banda Aceh',
                postcode: 23116,
                longitude: '95.4961508',
                latitude: '5.3542491',
                is_deleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                user_id: null,
                province: 'Sumatera Barat',
                province_id: 32,
                city: 'Kota Padang',
                city_id: 318,
                subdistrict: 'Padang Barat',
                street: 'Jl. Nipah No.42C, Berok Nipah, Kec. Padang Bar., Kota Padang, Sumatera Barat',
                postcode: 25119,
                longitude: '100.3632561',
                latitude: '-0.9247587',
                is_deleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                user_id: null,
                province: 'DKI Jakarta',
                province_id: 6,
                city: 'Kota Jakarta Barat',
                city_id: 151,
                subdistrict: 'Grogol Petamburan',
                street: 'Jl. Tomang Raya No.9',
                postcode: 11440,
                longitude: '106.7438905',
                latitude: '-6.161569',
                is_deleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                user_id: null,
                province: 'Jawa Tengah',
                province_id: 10,
                city: 'Kota Semarang',
                city_id: 399,
                subdistrict: 'Semarang Barat',
                street: 'Jl. Kumudasmoro Tengah No. 5 Kelurahan Bongsari Kecamatan, Semarang Barat Kota Semarang',
                postcode: 50148,
                longitude: '110.4229104',
                latitude: '-6.9903988',
                is_deleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                user_id: null,
                province: 'Bali',
                province_id: 1,
                city: 'Kota Denpasar',
                city_id: 114,
                subdistrict: 'Denpasar Selatan',
                street: 'Jl. Kanda No.1, Sanur, Denpasar Sel., Kota Denpasar, Bali',
                postcode: 80114,
                longitude: '115.2191175',
                latitude: '-8.65249731',
                is_deleted: false,
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
        await queryInterface.bulkDelete('warehouses', null, {});
    },
};
