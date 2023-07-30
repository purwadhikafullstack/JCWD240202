const db = require('../models');
const stock = db.product_stocks;
const { sequelize } = require('./../models');
const { Op } = require('sequelize');

module.exports = {
    getStock: async (req, res) => {
        try {
            let where = undefined;
            let cat = undefined;
            let order = undefined;
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
                where = {
                    warehouse_id: checkUserId.warehouse.id,
                };
            }

            if (search) {
                cat = {
                    name: { [Op.substring]: [search] },
                    is_deleted: false,
                };
            }

            if (category) {
                const findCategory = await db.categories.findOne({
                    where: {
                        name: category,
                    },
                });

                if (search) {
                    if (findCategory) {
                        cat = {
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
                    cat = {
                        category_id: findCategory.id,
                    };
                }
            }

            if (warehouse) {
                const wh = await db.warehouses.findOne({
                    where: {
                        city: warehouse,
                    },
                });
                if (role_id === 3) {
                    if (wh) {
                        where = {
                            warehouse_id: wh.id,
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
                if (sort) {
                    if (sort === 'name-asc') {
                        order = [[db.products, 'name', 'ASC']];
                    } else if (sort === 'name-desc') {
                        order = [[db.products, 'name', 'DESC']];
                    }
                }
            }

            const dataStock = await stock.findAndCountAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                where: where,
                offset: paginationOffset,
                limit: paginationLimit,
                include: [
                    {
                        model: db.products,
                        attributes: [
                            'id',
                            'name',
                            'category_id',
                            'color_id',
                            'is_deleted',
                        ],
                        where: cat,
                        include: [
                            {
                                model: db.categories,
                                attributes: ['name'],
                            },
                            {
                                model: db.colors,
                                attributes: ['name'],
                            },
                            {
                                model: db.product_images,
                                attributes: ['name'],
                                where: { is_thumbnail: 1 },
                            },
                        ],
                    },
                    {
                        model: db.warehouses,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                    },
                ],
                order,
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

            console.log(checkProduct.stock);
            console.log(Number(quantity));

            if (!checkProduct) {
                return res.status(404).send({
                    success: false,
                    message: 'Product Not Found!',
                    data: null,
                });
            } else if (
                role_id === 2 &&
                checkWarehouse.id !== checkProduct.warehouse_id
            ) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            } else {
                var addQuantity = await stock.update(
                    {
                        stock: Number(checkProduct.stock) + Number(quantity),
                    },
                    { where: { id: product_stock_id } },
                    { transaction: t },
                );

                await db.stock_histories.create(
                    {
                        product_stock_id: checkProduct.id,
                        quantity,
                        type_id: 1,
                        information_id: 1,
                    },
                    { transaction: t },
                );

                await t.commit();

                return res.status(200).send({
                    success: true,
                    message: 'Quantity Updated!',
                    data: addQuantity,
                });
            }
        } catch (error) {
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
            } else if (
                role_id === 2 &&
                checkWarehouse.id !== checkProduct.warehouse_id
            ) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            } else {
                var reduceQuantity = await stock.update(
                    {
                        stock: Number(checkProduct.stock) - Number(quantity),
                    },
                    { where: { id: product_stock_id } },
                    { transaction: t },
                );

                await db.stock_histories.create(
                    {
                        product_stock_id: checkProduct.id,
                        quantity,
                        type_id: 1,
                        information_id: 2,
                    },
                    { transaction: t },
                );

                await t.commit();

                return res.status(200).send({
                    success: true,
                    message: 'Quantity Updated!',
                    data: reduceQuantity,
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
