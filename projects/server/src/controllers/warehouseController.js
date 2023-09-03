const db = require('../models');
const user = db.users;
const warehouse = db.warehouses;
const { sequelize } = require('./../models');
const axios = require('axios');
const { Op } = require('sequelize');

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
                    message: "Field can't be Empty!",
                });
            }

            if (
                postcode.toString().match(/[a-zA-Z]/) ||
                postcode.toString().length < 5
            ) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid Postal Code!',
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

            var product_id = [];

            const getAllProduct = await db.products.findAll({
                where: {
                    is_deleted: false,
                },
            });

            // find All product_id
            for (const item of getAllProduct) {
                product_id.push(item.id);
            }

            // product_stock for new Warehouse
            const productStockNewWh = product_id.map((value) => {
                return {
                    product_id: value,
                    warehouse_id: addWarehouse.id,
                    stock: 0,
                };
            });

            // create product_stock for new Warehouse
            const newWhProductStock = await db.product_stocks.bulkCreate(
                productStockNewWh,
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
                    message: "Field can't be Empty!",
                });
            }

            if (
                postcode.toString().match(/[a-zA-Z]/) ||
                postcode.toString().length < 5
            ) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid Postal Code!',
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
            const { id } = req.User;

            const findWh = await warehouse.findOne({
                where: {
                    id: warehouse_id,
                },
            });

            if (!findWh) {
                return res.status(404).send({
                    success: false,
                    message: 'Warehouse Not Found!',
                    data: null,
                });
            }

            var product_id = [];
            var stockDeletedWh = [];

            // Cari stock product wh yang akan didelete
            const findStock = await db.product_stocks.findAll({
                where: {
                    warehouse_id: findWh.id,
                },
            });

            // mapping stock dan product_id wh yang akan didelete
            for (const item of findStock) {
                if (item.stock > 0) {
                    product_id.push(item.product_id);
                    stockDeletedWh.push(item.stock);
                }
            }

            // cari stock Wh jakarta yang akan di tambahkan stock dari wh yang akan dihapus
            const findStockWhJkt = await db.product_stocks.findAll({
                where: {
                    warehouse_id: 3,
                    product_id: product_id,
                },
            });

            // mapping stock wh jakarta untuk update stocknya
            const stockToUpdate = findStockWhJkt.map((value, index) => {
                return {
                    product_id: value.product_id,
                    stock: value.stock + stockDeletedWh[index],
                };
            });

            // update stock wh jakarta
            for (const item of stockToUpdate) {
                await db.product_stocks.update(
                    {
                        stock: item.stock,
                    },
                    {
                        where: {
                            warehouse_id: 3,
                            product_id: item.product_id,
                        },
                    },
                    { transaction: t },
                );
            }

            // mapping bulkCreate untuk mutation
            const bulkCreateMutation = product_id.map((value, index) => {
                return {
                    product_id: value,
                    warehouse_origin_id: 3,
                    user_id: id,
                    is_approved: 1,
                };
            });

            // bulkCreate mutations
            let createMutation = await db.mutations.bulkCreate(
                bulkCreateMutation,
                { transaction: t },
            );

            // array untuk mutation_id
            var mutationId = [];

            // mapping createMutation untuk dapat mutation_id
            for (const item of createMutation) {
                mutationId.push(item.id);
            }

            // mapping bulkCreate untuk mutation detail
            const bulkCreateMutationDetail = stockDeletedWh.map(
                (value, index) => {
                    return {
                        warehouse_destination_id: findWh.id,
                        mutation_id: mutationId[index],
                        quantity: value,
                    };
                },
            );

            // bulkCreate mutation_details
            let createMutationDetails = await db.mutation_details.bulkCreate(
                bulkCreateMutationDetail,
                { transaction: t },
            );

            // Mapping bulkCreate stock_histories Wh JKT
            const bulkCreateStockHistoriesWhJkt = product_id.map(
                (value, index) => {
                    return {
                        product_id: value,
                        quantity: stockDeletedWh[index],
                        mutation_id: mutationId[index],
                        user_id: id,
                        warehouse_id: 3,
                        type_id: 1,
                        information_id: 3,
                    };
                },
            );

            // bulkCreate stock_histories Wh JKT
            let bulkCreateStockHistoriesWhJakarta =
                await db.stock_histories.bulkCreate(
                    bulkCreateStockHistoriesWhJkt,
                    { transaction: t },
                );

            // Mapping bulkCreate stock_histories Deleted Wh
            const bulkCreateStockHistoriesDeletedWarehouse = product_id.map(
                (value, index) => {
                    return {
                        product_id: value,
                        quantity: stockDeletedWh[index],
                        mutation_id: mutationId[index],
                        user_id: id,
                        warehouse_id: findWh.id,
                        type_id: 2,
                        information_id: 3,
                    };
                },
            );

            // bulkCreate stock_histories Wh JKT
            let bulkCreateStockHistoriesDeletedWh =
                await db.stock_histories.bulkCreate(
                    bulkCreateStockHistoriesDeletedWarehouse,
                    { transaction: t },
                );

            // delete product_stocks
            let deleteProduct = await db.product_stocks.destroy(
                {
                    where: {
                        warehouse_id: findWh.id,
                    },
                },
                { transaction: t },
            );

            // delete warehouse
            const deleteWarehouse = await warehouse.update(
                {
                    user_id: null,
                    is_deleted: true,
                },
                {
                    where: {
                        id: warehouse_id,
                    },
                    transaction: t
                },
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
            let order = [['id', 'DESC']];
            let where = { is_deleted: false };
            let uname = undefined;
            const { page, search, sort, warehouses } = req.query;

            const paginationLimit = 4;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;

            if (sort) {
                if (sort) {
                    if (sort === 'name-asc') {
                        order = [['city', 'ASC']];
                    } else if (sort === 'name-desc') {
                        order = [['city', 'DESC']];
                    } else if (sort === 'newest') {
                        order = [['id', 'DESC']];
                    } else if (sort === 'oldest') {
                        order = [['id', 'ASC']];
                    }
                }
            }

            if (search) {
                uname = {
                    [Op.or]: [
                        { first_name: { [Op.substring]: [search] } },
                        { last_name: { [Op.substring]: [search] } },
                    ],
                    role_id: 2,
                };
            }

            if (warehouses) {
                where = {
                    is_deleted: false,
                    city: warehouses.replace(/%/g, ' '),
                };
                if (search) {
                    uname = {
                        [Op.or]: [
                            { first_name: { [Op.substring]: [search] } },
                            { last_name: { [Op.substring]: [search] } },
                        ],
                        role_id: 2,
                    };
                }
            }

            const dataWarehouse = await db.warehouses.findAndCountAll({
                where,
                offset: paginationOffset,
                limit: paginationLimit,
                include: [
                    {
                        model: db.users,
                        where: uname,
                        attributes: [
                            'first_name',
                            'last_name',
                            'email',
                            'phone_number',
                            'role_id',
                        ],
                        include: [
                            {
                                model: db.roles,
                                attributes: ['name'],
                            },
                        ],
                    },
                ],
                order,
            });

            const totalPage = Math.ceil(dataWarehouse.count / paginationLimit);

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: dataWarehouse,
                totalPage: totalPage,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    getListWarehouse: async (req, res) => {
        try {
            let where = { is_deleted: false };
            const { id, role_id } = req.User;

            if (role_id === 2) {
                const checkAdminWh = await warehouse.findOne({
                    where: {
                        user_id: id,
                    },
                });

                if (checkAdminWh) {
                    where = {
                        user_id: { [Op.ne]: id },
                        is_deleted: false,
                    };
                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'Not Found!',
                    });
                }
            }

            const listWarehouse = await warehouse.findAll({
                where,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: db.product_stocks,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        include: [
                            {
                                model: db.products,
                                attributes: ['id', 'name', 'category_id'],
                                where: { is_deleted: false },
                                include: [
                                    {
                                        model: db.categories,
                                        attributes: {
                                            exclude: [
                                                'image',
                                                'createdAt',
                                                'updatedAt',
                                            ],
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: listWarehouse,
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
                    message: 'Unassign Warehouse Admin Success!',
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
    getAllWarehouse: async (req, res) => {
        try {
            const warehouses = await warehouse.findAll();

            res.status(200).send({
                success: true,
                message: 'get all warehouses success',
                data: warehouses,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
