const jwt = require('jsonwebtoken');
const db = require('../models');
const user = db.users;
const warehouse = db.warehouses;
const { sequelize } = require('./../models');
const axios = require('axios');

module.exports = {
    createWarehouse: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const {
                province,
                province_id,
                city,
                city_id,
                subdistrict,
                street,
                postcode,
            } = req.body;

            if (
                !province ||
                !province_id ||
                !city ||
                !city_id ||
                !subdistrict ||
                !street ||
                !postcode
            ) {
                return res.status(400).send({
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

            const addWarehouse = await warehouse.create(
                {
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

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Add New Warehouse Success!',
                data: addWarehouse,
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
    editWarehouse: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const {
                province,
                province_id,
                city,
                city_id,
                subdistrict,
                street,
                postcode,
            } = req.body;
            const { warehouse_id } = req.params;

            if (
                !province ||
                !province_id ||
                !city ||
                !city_id ||
                !subdistrict ||
                !street ||
                !postcode
            ) {
                return res.status(400).send({
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

            const editWarehouse = await warehouse.update(
                {
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
                { where: { id: warehouse_id } },
                { transaction: t },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Edit Warehouse Adress Success!',
                data: editWarehouse,
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
    deleteWarehouse: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { warehouse_id } = req.params;

            const deleteWarehouse = await warehouse.update(
                {
                    is_deleted: true,
                },
                {
                    where: {
                        id: warehouse_id,
                    },
                },
                { transaction: t },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Warehouse Deleted!',
                data: deleteWarehouse,
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
    getAllDataWarehouse: async (req, res) => {
        try {
            const dataWarehouse = await warehouse.findAll({
                where: {
                    is_deleted: false,
                },
            });

            return res.status(200).send({
                success: true,
                message: 'Warehouse Deleted!',
                data: dataWarehouse,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    getAvailableWarehouse: async (req, res) => {
        try {
            const availableWarehouse = await warehouse.findAll({
                where: {
                    user_id: null,
                    is_deleted: false,
                },
            });

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: availableWarehouse,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    assignAdminWareHouse: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { user_id } = req.params;
            const { warehouse_id } = req.body;

            const checkWarehouse = await warehouse.findOne({
                where: {
                    id: warehouse_id,
                },
            });

            const checkUser = await user.findOne({
                where: {
                    id: user_id,
                },
            });

            if (checkUser === null) {
                return res.status(404).send({
                    success: false,
                    message: 'User Not Found!',
                    data: null,
                });
            }

            if (checkWarehouse === null) {
                return res.status(404).send({
                    success: false,
                    message: 'Warehouse Not Found!',
                    data: null,
                });
            }

            if (checkWarehouse.user_id) {
                return res.status(404).send({
                    success: false,
                    message: 'Warehouse Admin Already Assigned!',
                    data: null,
                });
            } else {
                const assignAdmin = await warehouse.update(
                    {
                        user_id,
                    },
                    {
                        where: {
                            id: warehouse_id,
                        },
                    },
                    { transaction: t },
                );

                await t.commit();

                return res.status(200).send({
                    success: true,
                    message: 'Assign Warehouse Admin Success!',
                    data: assignAdmin,
                });
            }
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    unassignAdminWarehouse: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { user_id } = req.params;
            const { warehouse_id } = req.body;
            console.log(user_id);
            console.log(warehouse_id);

            const checkWarehouse = await warehouse.findOne({
                where: {
                    id: warehouse_id,
                },
            });

            const checkUser = await user.findOne({
                where: {
                    id: user_id,
                },
            });

            if (checkUser === null) {
                return res.status(404).send({
                    success: false,
                    message: 'User Not Found!',
                    data: null,
                });
            }

            if (checkWarehouse === null) {
                return res.status(404).send({
                    success: false,
                    message: 'Warehouse Not Found!',
                    data: null,
                });
            }

            if (checkWarehouse.user_id !== checkUser.id) {
                return res.status(400).send({
                    success: false,
                    message: 'Unassigned Failed!',
                    data: null,
                });
            } else {
                const unassignAdmin = await warehouse.update(
                    {
                        user_id: null,
                    },
                    {
                        where: {
                            id: warehouse_id,
                            user_id,
                        },
                    },
                    { transaction: t },
                );

                await t.commit();

                return res.status(200).send({
                    success: true,
                    message: 'Assign Warehouse Admin Success!',
                    data: unassignAdmin,
                });
            }
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
