const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const products = db.products;
const users = db.users;
const reviews = db.reviews;
const carts = db.carts;
const cart_products = db.cart_products;
const orders = db.orders;
const order_statuses = db.order_statuses;

const createNewReview = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user_id = req.User.id;
        const { comment, rating, order_id, product_id } = req.body;

        const findOrder = await orders.findOne({
            where: { id: order_id },
            include: [
                {
                    model: carts,
                    include: [{ model: cart_products, where: { product_id } }],
                },
                {
                    model: order_statuses,
                    where: { status_id: 5 },
                },
            ],
        });

        if (findOrder.cart !== null) {
            const checkReview = await reviews.findOne({
                where: { product_id, order_id, user_id },
            });

            if (!checkReview) {
                const createReview = await reviews.create(
                    {
                        user_id,
                        product_id,
                        order_id,
                        comment,
                        rating,
                    },
                    { transaction: t },
                );

                await t.commit();
                res.status(200).send({
                    success: true,
                    message: 'create new review success',
                    data: {},
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'user already made review',
                    data: null,
                });
            }
        } else {
            res.status(404).send({
                success: false,
                message: 'product not found in order',
                data: null,
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
};

const getProductReviews = async (req, res) => {
    try {
        const { product_id } = req.params;
        const { sort, rating, page } = req.query;

        const findProduct = await products.findOne({
            where: { id: product_id, is_deleted: false },
        });

        let where = { product_id };
        if (rating) {
            where = { product_id, rating };
        }
        let order = [['id', 'DESC']];
        if (sort === 'oldest') {
            order = [['id', 'ASC']];
        } else if (sort === 'highest') {
            order = [['rating', 'DESC']];
        } else if (sort === 'lowest') {
            order = [['rating', 'ASC']];
        }

        const limit = 5;
        const offset = (Number(page ? page : 1) - 1) * limit;

        if (findProduct) {
            const findReviews = await reviews.findAndCountAll({
                where,
                attributes: [
                    'user_id',
                    'product_id',
                    'comment',
                    'rating',
                    [
                        sequelize.fn(
                            'DATE_FORMAT',
                            sequelize.col('reviews.createdAt'),
                            '%d-%b-%Y',
                        ),
                        'createdAt',
                    ],
                ],
                include: [
                    {
                        model: users,
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'email',
                            'profile_picture',
                        ],
                    },
                ],
                order,
                offset,
                limit,
                distinct: true,
            });

            const totalPage = Math.ceil(findReviews.count / limit);

            res.status(200).send({
                success: true,
                message: 'get product reviews success',
                data: findReviews,
                totalPage,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'cannot find product',
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

const getUserReviews = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { order_id, product_id } = req.params;

        const checkOrder = await orders.findOne({
            where: { id: order_id },
        });

        if (checkOrder) {
            const findUserReviews = await reviews.findOne({
                where: { order_id, product_id },
            });

            res.status(200).send({
                success: true,
                message: 'get user reviews success',
                data: findUserReviews,
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'invalid order id',
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

const removeReview = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user_id = req.User.id;
        const { review_id } = req.params;

        const findReview = await reviews.findOne({
            where: { id: review_id, user_id },
        });
        if (findReview) {
            const removeReview = await reviews.destroy(
                {
                    where: {
                        id: findReview.id,
                    },
                },
                { transaction: t },
            );

            await t.commit();
            res.status(200).send({
                success: true,
                message: 'review deleted',
                data: {},
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'review not found',
                data: null,
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
};

module.exports = {
    createNewReview,
    getProductReviews,
    removeReview,
    getUserReviews,
};
