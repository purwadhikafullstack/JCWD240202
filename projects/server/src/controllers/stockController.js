const db = require('../models');
const stock = db.product_stocks;
const { sequelize } = require('./../models');
const { Op } = require('sequelize');

module.exports = {
    getStock: async (req, res) => {
        try {
            let where = { is_deleted: false };
            let order = undefined;
            let wh = undefined;
            const { id, role_id } = req.User;
            const { page, warehouse, search, sort, category } = req.query;

            const paginationLimit = 15;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;

            const checkUserId = await db.users.findOne({
                attributes: ['first_name'],
                where: {
                    id,
                },
                include: [
                    {
                        model: db.roles,
                        attributes: ['name'],
                    },
                    {
                        model: db.warehouses,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                    },
                ],
            });

            if (role_id === 2) {
                wh = {
                    warehouse_id: checkUserId.warehouse.id,
                };
            }

            if (search) {
                where = {
                    name: { [Op.substring]: [search] },
                    is_deleted: false,
                };
            }

            if (category) {
                const findCategory = await db.categories.findOne({
                    where: {
                        name: category.replace(/%/g, ' '),
                    },
                });

                if (search) {
                    if (findCategory) {
                        where = {
                            name: { [Op.substring]: [search] },
                            category_id: findCategory.id,
                            is_deleted: false,
                        };
                    } else {
                        where = {
                            id: 0,
                        };
                    }
                } else if (findCategory === null) {
                    where = {
                        id: 0,
                    };
                } else {
                    where = {
                        category_id: findCategory.id,
                    };
                }
            }

            if (warehouse) {
                const checkWh = await db.warehouses.findOne({
                    where: {
                        city: warehouse.replace(/%/g, ' '),
                    },
                });
                if (role_id === 3) {
                    if (checkWh) {
                        wh = {
                            warehouse_id: checkWh.id,
                        };
                    } else {
                        where = {
                            id: 0,
                        };
                    }
                } else if (role_id === 2 && id != wh.user_id) {
                    return res.status(401).send({
                        message: 'Unauthorized!',
                    });
                }
            }

            if (sort) {
                if (sort === 'name-asc') {
                    order = [['name', 'ASC']];
                } else if (sort === 'name-desc') {
                    order = [['name', 'DESC']];
                } else if (sort === 'newest') {
                    order = [['createdAt', 'DESC']];
                } else if (sort === 'oldest') {
                    order = [['createdAt', 'ASC']];
                }
            }

            const dataStock = await db.products.findAndCountAll({
                attributes: [
                    'id',
                    'name',
                    'category_id',
                    'is_deleted',
                    'total_stock',
                    'createdAt',
                ],
                where: where,
                offset: paginationOffset,
                limit: paginationLimit,
                order,
                include: [
                    {
                        model: db.product_stocks,
                        attributes: {
                            exclude: ['updatedAt'],
                        },
                        where: wh,
                        include: [
                            {
                                model: db.warehouses,
                                attributes: ['id', 'city', 'city_id'],
                            },
                        ],
                    },
                    {
                        model: db.product_images,
                        attributes: ['name'],
                        where: { is_thumbnail: true },
                    },
                    {
                        model: db.categories,
                        attributes: ['name'],
                    },
                ],
                distinct: true,
            });

            const totalPage = Math.ceil(dataStock.count / paginationLimit);

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: dataStock,
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
    addStock: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { product_stock_id } = req.params;
            const { quantity } = req.body;
            const { id, role_id } = req.User;

            const checkWarehouse = await db.warehouses.findOne({
                where: {
                    user_id: id,
                },
            });

            const checkProduct = await stock.findOne({
                where: {
                    id: product_stock_id,
                },
            });

            if (!checkProduct) {
                return res.status(404).send({
                    success: false,
                    message: 'Product Not Found!',
                    data: null,
                });
            }

            if (
                role_id === 2 &&
                checkWarehouse.id !== checkProduct.warehouse_id
            ) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            if (checkProduct) {
                // Find Products Stock
                const findProduct = await db.products.findOne({
                    where: {
                        id: checkProduct.product_id,
                    },
                });

                var addQuantity = await stock.update(
                    {
                        stock: Number(checkProduct.stock) + Number(quantity),
                    },
                    { where: { id: product_stock_id } },
                    { transaction: t },
                );

                // Update total_stock in products table
                var updateTotalStock = await db.products.update(
                    {
                        total_stock:
                            Number(findProduct.total_stock) + Number(quantity),
                    },
                    {
                        where: {
                            id: findProduct.id,
                        },
                    },
                    { transaction: t },
                );

                await db.stock_histories.create(
                    {
                        product_id: checkProduct.product_id,
                        quantity,
                        type_id: 1,
                        information_id: 1,
                        user_id: id,
                        warehouse_id: checkProduct.warehouse_id,
                    },
                    { transaction: t },
                );

                await t.commit();

                return res.status(200).send({
                    success: true,
                    message: 'Quantity Updated!',
                    data: {
                        warehouseStock: addQuantity,
                        totalStock: updateTotalStock,
                    },
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
    reduceStock: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { product_stock_id } = req.params;
            const { quantity } = req.body;
            const { id, role_id } = req.User;

            const checkWarehouse = await db.warehouses.findOne({
                where: {
                    user_id: id,
                },
            });

            const checkProduct = await stock.findOne({
                where: {
                    id: product_stock_id,
                },
            });

            if (!checkProduct) {
                return res.status(404).send({
                    success: false,
                    message: 'Product Not Found!',
                    data: null,
                });
            }

            if (quantity > checkProduct.stock) {
                return res.status(400).send({
                    success: false,
                    message: 'Quantity Exceeds Available Stock!',
                    data: null,
                });
            }

            if (
                role_id === 2 &&
                checkWarehouse.id !== checkProduct.warehouse_id
            ) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            if (checkProduct) {
                // Find Products Stock
                const findProduct = await db.products.findOne({
                    where: {
                        id: checkProduct.product_id,
                    },
                });

                var reduceQuantity = await stock.update(
                    {
                        stock: Number(checkProduct.stock) - Number(quantity),
                    },
                    { where: { id: product_stock_id } },
                    { transaction: t },
                );

                var updateTotalStock = await db.products.update(
                    {
                        total_stock:
                            Number(findProduct.total_stock) - Number(quantity),
                    },
                    {
                        where: {
                            id: findProduct.id,
                        },
                    },
                    { transaction: t },
                );

                await db.stock_histories.create(
                    {
                        product_id: checkProduct.product_id,
                        quantity,
                        type_id: 2,
                        information_id: 1,
                        user_id: id,
                        warehouse_id: checkProduct.warehouse_id,
                    },
                    { transaction: t },
                );

                await t.commit();

                return res.status(200).send({
                    success: true,
                    message: 'Quantity Updated!',
                    data: {
                        warehouseStock: reduceQuantity,
                        totalStock: updateTotalStock,
                    },
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
