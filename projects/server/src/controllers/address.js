const db = require('./../models');
const address = db.user_addresses;
const { sequelize } = require('./../models');
const axios = require('axios');
const { Op } = require('sequelize');

module.exports = {
    userAddress: async (req, res) => {
        const { id } = req.User;
        try {
            const result = await address.findAll({
                where: {
                    user_id: id,
                },
            });
            return res.status(200).send({
                success: true,
                message: 'Fetch success!',
                data: result,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    addNewAddress: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id, is_verified } = req.User;
            const {
                receiver_name,
                receiver_number,
                province,
                province_id,
                city,
                city_id,
                subdistrict,
                street,
                postcode,
            } = req.body;

            if (is_verified === false) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            if (
                !receiver_name ||
                !receiver_number ||
                !province ||
                !province_id ||
                !city ||
                !city_id ||
                !subdistrict ||
                !street ||
                !postcode
            ) {
                res.status(400).send({
                    success: false,
                    message: "Field can't be Empty",
                });
            }

            const latLong = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${
                    process.env.OC_API_KEY
                }&q=${city
                    .split(' ')
                    .splice(1)
                    .toString()
                    .replace(/,/g, ' ')}&no_annotations=1&pretty=1`,
            );

            const dataAddress = await address.findAll({
                where: {
                    user_id: id,
                },
            });

            if (dataAddress.length <= 0) {
                var result = await address.create(
                    {
                        user_id: id,
                        receiver_name,
                        receiver_number,
                        province,
                        province_id,
                        city,
                        city_id,
                        subdistrict,
                        street,
                        postcode,
                        longitude: latLong.data?.results[0].geometry.lng,
                        latitude: latLong.data?.results[0].geometry.lat,
                    },
                    { transaction: t },
                );
            } else {
                var result = await address.create(
                    {
                        user_id: id,
                        receiver_name,
                        receiver_number,
                        province,
                        province_id,
                        city,
                        city_id,
                        subdistrict,
                        street,
                        postcode,
                        longitude: latLong.data?.results[0].geometry.lng,
                        latitude: latLong.data?.results[0].geometry.lat,
                        is_primary: false,
                    },
                    { transaction: t },
                );
            }

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Add New Address Success!',
                data: result,
            });
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    editAddress: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { is_verified } = req.User;
            const {
                receiver_name,
                receiver_number,
                province,
                province_id,
                city,
                city_id,
                subdistrict,
                street,
                postcode,
            } = req.body;
            const { address_id } = req.params;

            if (is_verified === false) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            if (
                !receiver_name ||
                !receiver_number ||
                !province ||
                !province_id ||
                !city ||
                !city_id ||
                !subdistrict ||
                !street ||
                !postcode
            ) {
                res.status(400).send({
                    success: false,
                    message: "Field can't be empty",
                    data: null,
                });
            }

            const latLong = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${
                    process.env.OC_API_KEY
                }&q=${city
                    .split(' ')
                    .splice(1)
                    .toString()
                    .replace(/,/g, ' ')}&no_annotations=1&pretty=1`,
            );

            const result = await address.update(
                {
                    receiver_name,
                    receiver_number,
                    province,
                    province_id,
                    city,
                    city_id,
                    subdistrict,
                    street,
                    postcode,
                    longitude: latLong.data?.results[0].geometry.lng,
                    latitude: latLong.data?.results[0].geometry.lat,
                },
                { where: { id: address_id } },
                { transaction: t },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Edit Address Success!',
                data: result,
            });
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    deleteAddress: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { is_verified } = req.User;
            const { address_id } = req.params;

            if (is_verified === false) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            const deleteAddress = await address.destroy(
                {
                    where: {
                        id: address_id,
                    },
                },
                { transaction: t },
            );

            await t.commit();

            res.status(200).send({
                success: true,
                message: 'Address deleted',
                data: deleteAddress,
            });
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    setPrimaryAddress: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { is_verified } = req.User;
            const { address_id } = req.params;

            if (is_verified === false) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            const changePrimary = await address.update(
                {
                    is_primary: false,
                },
                {
                    where: {
                        is_primary: true,
                    },
                },
                { transaction: t },
            );

            const changeNotPrimary = await address.update(
                {
                    is_primary: true,
                },
                {
                    where: {
                        id: address_id,
                    },
                },
                { transaction: t },
            );

            await t.commit();

            res.status(200).send({
                success: true,
                message: 'Update primary address success!',
                data: changeNotPrimary,
            });
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
