const { Op } = require('sequelize');
const db = require('../models');
const categories = db.categories;
const products = db.products;
const product_images = db.product_images;
const colors = db.colors;

const getAllProducts = async (req, res) => {
    try {
        const { page, category, sort, search } = req.query;

        const paginationLimit = 12;
        const paginationOffset = (Number(page) - 1) * paginationLimit;

        if (category && sort) {
            const catQuery = category.replaceAll('%', ' ');
            let order = [];
            if (sort === 'name-asc') {
                order = [['name', 'ASC']];
            } else if (sort === 'name-desc') {
                order = [['name', 'DESC']];
            } else if (sort === 'price-asc') {
                order = [['price', 'ASC']];
            } else if (sort === 'price-desc') {
                order = [['price', 'DESC']];
            }

            const findCategory = await categories.findOne({
                where: {
                    name: catQuery,
                },
            });

            if (findCategory) {
                const result = await products.findAndCountAll({
                    where: {
                        category_id: findCategory.id,
                        name: { [Op.substring]: [search] },
                    },
                    offset: paginationOffset,
                    limit: paginationLimit,
                    include: [
                        { model: categories },
                        {
                            model: product_images,
                            where: { is_thumbnail: true },
                        },
                    ],
                    order: order,
                });

                const totalPage = Math.ceil(result.count / paginationLimit);

                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'get all data success',
                        data: result,
                        totalPage: totalPage,
                    });
                } else {
                    res.status(404).send({
                        success: false,
                        message: 'get data failed',
                        data: {},
                    });
                }
            } else {
                res.status(404).send({
                    success: false,
                    message: 'get data failed',
                    data: {},
                });
            }
        } else if (category) {
            const catQuery = category.replaceAll('%', ' ');

            const findCategory = await categories.findOne({
                where: {
                    name: catQuery,
                },
            });

            if (findCategory) {
                const result = await products.findAndCountAll({
                    where: {
                        category_id: findCategory.id,
                        name: { [Op.substring]: [search] },
                    },
                    offset: paginationOffset,
                    limit: paginationLimit,
                    include: [
                        { model: categories },
                        {
                            model: product_images,
                            where: { is_thumbnail: true },
                        },
                    ],
                });

                const totalPage = Math.ceil(result.count / paginationLimit);

                res.status(200).send({
                    success: true,
                    message: `get all products in ${catQuery} categories success`,
                    data: result,
                    totalPage: totalPage,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'no products found',
                    data: null,
                });
            }
        } else if (sort) {
            let order = [];

            if (sort) {
                if (sort === 'name-asc') {
                    order = [['name', 'ASC']];
                } else if (sort === 'name-desc') {
                    order = [['name', 'DESC']];
                } else if (sort === 'price-asc') {
                    order = [['price', 'ASC']];
                } else if (sort === 'price-desc') {
                    order = [['price', 'DESC']];
                }
            }

            const result = await products.findAndCountAll({
                where: { name: { [Op.substring]: [search] } },
                offset: paginationOffset,
                limit: paginationLimit,
                include: [
                    { model: categories },
                    { model: product_images, where: { is_thumbnail: true } },
                ],
                order: order,
            });

            const totalPage = Math.ceil(result.count / paginationLimit);

            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'get all data success',
                    data: result,
                    totalPage: totalPage,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: 'get all data failed',
                    data: {},
                });
            }
        } else {
            const result = await products.findAndCountAll({
                where: { name: { [Op.substring]: [search] } },
                offset: paginationOffset,
                limit: paginationLimit,
                include: [
                    { model: categories },
                    { model: product_images, where: { is_thumbnail: true } },
                ],
            });

            if (result) {
                const totalPage = Math.ceil(result.count / paginationLimit);
                res.status(200).send({
                    success: true,
                    message: 'get data success',
                    data: result,
                    totalPage,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'no data found',
                    data: null,
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const findProduct = await products.findOne({
            where: { id: id },
            include: [
                { model: product_images },
                { model: categories },
                { model: colors },
            ],
        });

        if (findProduct) {
            res.status(200).send({
                success: true,
                message: `get product id ${id} success`,
                data: findProduct,
            });
        } else {
            res.status(404).send({
                success: false,
                message: `product not found`,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;

        const findProduct = await products.findOne({
            where: { id: id },
        });

        if (findProduct) {
            const findRecommendation = await products.findAll({
                where: {
                    [Op.not]: [{ id: findProduct.id }],
                    category_id: findProduct.category_id,
                },
                include: [
                    { model: product_images, where: { is_thumbnail: true } },
                ],
                limit: 5,
            });

            res.status(200).send({
                success: true,
                message: 'get recommendation success',
                data: findRecommendation,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'product not found',
                data: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    getAllProducts,
    getProductDetails,
    getRelatedProducts,
};
