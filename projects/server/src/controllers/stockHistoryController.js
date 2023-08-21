const db = require('../models');
const log = db.stock_histories;
const { sequelize } = require('./../models');
const { Op } = require('sequelize');
const moment = require('moment');

module.exports = {
    getStockHistory: async (req, res) => {
        try {
            const { page, date, category, search, warehouse, sort } = req.query;
            const { id, role_id } = req.User;
            const dates = date
                ? moment(new Date(date)).format('MM/01/YYYY')
                : moment(new Date()).format('MM/01/YYYY');
            let product = undefined;
            let wh = undefined;
            let order = [['name', 'ASC']];
            const paginationLimit = 10;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;

            // Field untuk addition, reduction, dan menghitung final_stock
            var addition = [];
            var reduction = [];
            var after_addition = [];
            var after_reduction = [];
            var total_stock = [];
            var final_stock = [];

            if (category) {
                const findCategory = await db.categories.findOne({
                    where: {
                        name: category.replace(/%/g, ' '),
                    },
                });

                if (findCategory) {
                    product = {
                        category_id: findCategory.id,
                    };
                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'Category Not Found!',
                        data: null,
                    });
                }
            }

            if (search) {
                product = {
                    ...product,
                    name: { [Op.substring]: [search] },
                };
            }

            if (role_id === 2) {
                const findWhAdmin = await db.warehouses.findOne({
                    where: {
                        user_id: id,
                    },
                });
                if (findWhAdmin) {
                    wh = { warehouse_id: findWhAdmin.id };
                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'Warehouse Not Found!',
                        data: null,
                    });
                }
            }

            if (warehouse) {
                const findWh = await db.warehouses.findOne({
                    where: {
                        city: warehouse.replace(/%/g, ' '),
                    },
                });

                if (findWh) {
                    wh = { warehouse_id: findWh.id };
                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'Warehouse Not Found!',
                        data: null,
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

            const getProduct = await db.products.findAndCountAll({
                where: product,
                offset: paginationOffset,
                limit: paginationLimit,
                include: [{ model: db.categories }],
                order,
            });
            for await (const item of getProduct.rows) {
                var add = 0;
                var reduc = 0;
                var after_add = 0;
                var after_reduc = 0;

                add += await log.sum('quantity', {
                    where: {
                        product_id: item.id,
                        type_id:
                            role_id === 2
                                ? { [Op.in]: [1, 3, 4] }
                                : { [Op.in]: [1, 4] },
                        ...wh,
                        information_id: 1,
                        createdAt: {
                            [Op.lt]: moment(dates).add(1, 'month').toDate(),
                            [Op.gte]: dates,
                        },
                    },
                });
                addition.push(add);

                reduc += await log.sum('quantity', {
                    where: {
                        product_id: item.id,
                        type_id:
                            role_id === 2
                                ? { [Op.in]: [1, 2, 3] }
                                : { [Op.in]: [1, 2] },
                        ...wh,
                        information_id: 2,
                        createdAt: {
                            [Op.lt]: moment(dates).add(1, 'month').toDate(),
                            [Op.gte]: dates,
                        },
                    },
                });
                reduction.push(reduc);

                after_add += await log.sum('quantity', {
                    where: {
                        product_id: item.id,
                        type_id: { [Op.in]: [1, 3, 4] },
                        ...wh,
                        information_id: 1,
                        createdAt: {
                            [Op.gte]: moment(dates).add(1, 'month').toDate(),
                        },
                    },
                });
                after_addition.push(after_add);

                after_reduc += await log.sum('quantity', {
                    where: {
                        product_id: item.id,
                        type_id: { [Op.in]: [1, 2, 3] },
                        ...wh,
                        information_id: 2,
                        createdAt: {
                            [Op.gte]: moment(dates).add(1, 'month').toDate(),
                        },
                    },
                });
                after_reduction.push(after_reduc);

                if (role_id === 3 && !warehouse) {
                    total_stock.push(item.total_stock);
                } else {
                    const productStockWh = await db.product_stocks.findOne({
                        where: {
                            product_id: item.id,
                            ...wh,
                        },
                    });

                    total_stock.push(productStockWh.stock);
                }
            }

            total_stock.forEach((item, index) =>
                final_stock.push(
                    item + after_reduction[index] - after_addition[index],
                ),
            );

            const totalPage = Math.ceil(getProduct.count / paginationLimit);

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: { getProduct, addition, reduction, final_stock, dates },
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
    getStockLog: async (req, res) => {
        try {
            const { page, date, search, warehouse, sort } = req.query;
            const { id, role_id } = req.User;
            const paginationLimit = 10;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;
            const dates = date
                ? moment(new Date(date)).format('MM/01/YYYY')
                : moment(new Date()).format('MM/01/YYYY');

            let order = [['createdAt', 'DESC']];
            let productName = undefined;
            let where = undefined;

            if (role_id === 2) {
                const findWhAdmin = await db.warehouses.findOne({
                    where: {
                        user_id: id,
                    },
                });

                if (!findWhAdmin) {
                    return res.status(404).send({
                        success: false,
                        message: 'Warehouse Admin Not Found!',
                        data: null,
                    });
                } else {
                    where = {
                        warehouse_id: findWhAdmin.id,
                    };
                }
            }

            if (search) {
                productName = { name: { [Op.substring]: [search] } };
            }

            if (warehouse) {
                const findWh = await db.warehouses.findOne({
                    where: {
                        city: warehouse.replace(/%/g, ' '),
                    },
                });

                if (!findWh) {
                    return res.status(404).send({
                        success: false,
                        message: 'Warehouse Not Found!',
                        data: null,
                    });
                } else if (role_id === 2 && id != findWh.user_id) {
                    return res.status(404).send({
                        success: false,
                        message: 'Unauthorized!',
                        data: null,
                    });
                } else {
                    where = {
                        warehouse_id: findWh.id,
                    };
                }
            }

            if (sort) {
                if (sort === 'newest') {
                    order = [['createdAt', 'DESC']];
                } else if (sort === 'oldest') {
                    order = [['createdAt', 'ASC']];
                }
            }

            const stockLog = await log.findAndCountAll({
                offset: paginationOffset,
                limit: paginationLimit,
                order: order,
                where: {
                    ...where,
                    createdAt: {
                        [Op.lt]: moment(dates).add(1, 'month').toDate(),
                        [Op.gte]: dates,
                    },
                },
                include: [
                    {
                        model: db.products,
                        where: productName,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                    {
                        model: db.users,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'is_verified',
                            'role_id',
                        ],
                        include: [{ model: db.roles }],
                    },
                    {
                        model: db.warehouses,
                        attributes: ['id', 'city', 'city_id'],
                    },
                    {
                        model: db.types,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                    {
                        model: db.informations,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                ],
            });

            const exportLog = await log.findAll({
                order: order,
                where: {
                    ...where,
                    createdAt: {
                        [Op.lt]: moment(dates).add(1, 'month').toDate(),
                        [Op.gte]: dates,
                    },
                },
                include: [
                    {
                        model: db.products,
                        where: productName,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                    {
                        model: db.users,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'is_verified',
                            'role_id',
                        ],
                        include: [{ model: db.roles }],
                    },
                    {
                        model: db.warehouses,
                        attributes: ['id', 'city', 'city_id'],
                    },
                    {
                        model: db.types,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                    {
                        model: db.informations,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                ],
            });

            const totalPage = Math.ceil(stockLog.count / paginationLimit);

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: stockLog,
                export: exportLog,
                totalPage: totalPage,
                dates: dates,
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
