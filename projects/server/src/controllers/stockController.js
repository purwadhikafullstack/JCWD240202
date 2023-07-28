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
            const { page, warehouse, search, sort, category } = req.query;
            

            const paginationLimit = 10;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;

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

                if (wh) {
                    where = {
                        warehouse_id: wh.id,
                    };
                } else {
                    where = {
                        id: 0,
                    };
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
                where: where,
                offset: paginationOffset,
                limit: paginationLimit,
                include: [
                    {
                        model: db.products,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        where: cat,
                        include: [
                            {
                                model: db.categories,
                                attributes: ['name'],
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

            if (dataStock) {
                const totalPage = Math.ceil(dataStock.count / paginationLimit);

                return res.status(200).send({
                    success: true,
                    message: 'Fetch Success!',
                    data: dataStock,
                    totalPage: totalPage,
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
