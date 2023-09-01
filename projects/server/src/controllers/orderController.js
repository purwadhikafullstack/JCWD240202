const { Op } = require('sequelize');
const db = require('../models');
const users = db.users;
const warehouses = db.warehouses;
const user_addresses = db.user_addresses;
const cart_products = db.cart_products;
const products = db.products;
const carts = db.carts;
const product_stocks = db.product_stocks;
const orders = db.orders;
const order_statuses = db.order_statuses;
const statuses = db.statuses;
const { sequelize } = require('../models');
const { deleteSingleFile } = require('./../helper/deleteFiles');

const getAllUserOrder = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { page, status_id, sort, search } = req.query;

        let where = {};
        let order = [
            ['id', 'DESC'],
            [order_statuses, 'id', 'ASC'],
        ];
        let searchInvoice = '';

        const paginationLimit = 5;
        const paginationOffset =
            (Number(page ? page : 1) - 1) * paginationLimit;

        if (status_id) {
            if (status_id === '0') {
                where = {};
            } else {
                where = { status_id: Number(status_id), is_active: true };
            }
        }
        if (sort) {
            if (sort === 'newest') {
                order = [
                    ['id', 'DESC'],
                    [order_statuses, 'id', 'ASC'],
                ];
            } else if (sort === 'oldest') {
                order = [
                    ['id', 'ASC'],
                    [order_statuses, 'id', 'ASC'],
                ];
            }
        }
        if (search) {
            searchInvoice = search;
        }

        const getOrder = await orders.findAndCountAll({
            where: {
                invoice_number: { [Op.substring]: [searchInvoice] },
            },
            offset: paginationOffset,
            limit: paginationLimit,
            attributes: [
                'id',
                'cart_id',
                'shipping_address',
                'payment_proof',
                'is_payment_success',
                'courier',
                'shipping_method',
                'shipping_fee',
                'total_weight',
                'total_cart_price',
                'total',
                'receiver_name',
                'receiver_number',
                'invoice_number',
                [
                    sequelize.fn(
                        'DATE_FORMAT',
                        sequelize.col('orders.createdAt'),
                        '%a, %d %b %Y',
                    ),
                    'createdAt',
                ],
            ],
            include: [
                {
                    model: order_statuses,
                    where,
                    include: [{ model: statuses }],
                },
                {
                    model: carts,
                    where: { user_id: user_id },
                    include: [{ model: cart_products }],
                },
            ],
            order,
            distinct: true,
        });

        if (getOrder.rows.length === 0) {
            res.status(200).send({
                message: 'No transaction yet',
            });
        } else {
            const totalPage = Math.ceil(getOrder.count / paginationLimit);
            res.status(200).send({
                success: true,
                message: 'get all user order success',
                data: getOrder,
                totalPage,
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

const getOrderDetails = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { order_id } = req.params;

        const getDetails = await orders.findOne({
            where: { id: order_id },
            include: [
                {
                    model: order_statuses,
                    as: 'order_statuses',
                    attributes: [
                        'id',
                        'status_id',
                        'order_id',
                        'is_active',
                        'is_rejected',
                        [
                            sequelize.fn(
                                'DATE_FORMAT',
                                sequelize.col('order_statuses.createdAt'),
                                '%a, %d-%b-%Y %h:%i %p',
                            ),
                            'createdAt',
                        ],
                    ],
                    include: [{ model: statuses }],
                },
                {
                    model: carts,
                    where: { user_id: user_id },
                    include: [{ model: cart_products }],
                },
            ],
            order: [[order_statuses, 'id', 'ASC']],
        });

        if (getDetails) {
            res.status(200).send({
                success: true,
                message: 'get user order detail',
                data: getDetails,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'order not found',
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

const postUserPaymentProof = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { order_id } = req.body;
        const payment_proof = req.files?.images[0]?.filename;

        if (!user_id) {
            res.status(400).send({
                success: false,
                message: 'User not found',
                data: null,
            });
        } else if (!payment_proof) {
            res.status(400).send({
                success: false,
                message: 'please upload payment proof',
                data: null,
            });
        }

        const findOrder = await orders.findOne({ where: { id: order_id } });
        if (findOrder) {
            const uploadProof = await orders.update(
                { payment_proof },
                { where: { id: findOrder.id } },
            );

            const updateStatus = await order_statuses.create({
                status_id: 2,
                order_id: findOrder.id,
                is_active: true,
            });

            const updatePrevStatus = await order_statuses.update(
                {
                    is_active: false,
                },
                { where: { status_id: 1, order_id: findOrder.id } },
            );

            if (uploadProof && updateStatus) {
                return res.status(200).send({
                    success: true,
                    message: 'upload payment proof success',
                    data: {},
                });
            } else {
                throw { message: 'failed to upload image' };
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'order not exist',
                data: null,
            });
        }
    } catch (error) {
        await t.rollback();
        deleteSingleFile(req.files?.images[0]?.path);
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const userCancelOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user_id = req.User.id;
        const { order_id } = req.body;

        const findOrder = await orders.findOne({
            where: { id: order_id },
            include: [{ model: carts, include: [{ model: cart_products }] }],
        });
        if (findOrder) {
            const getStatus = await order_statuses.findOne({
                where: {
                    order_id: findOrder.id,
                    status_id: 1,
                    is_active: true,
                },
            });
            if (getStatus) {
                const cancelOrder = await order_statuses.create(
                    {
                        order_id: findOrder.id,
                        status_id: 6,
                        is_active: true,
                    },
                    { transaction: t },
                );
                const updatePrev = await order_statuses.update(
                    {
                        is_active: false,
                    },
                    { where: { id: getStatus.id } },
                    { transaction: t },
                );

                const updateStock = findOrder.cart.cart_products.map(
                    async (value) => {
                        const getStock = await products.findOne({
                            where: { id: value.product_id },
                        });

                        await products.update(
                            {
                                total_stock:
                                    getStock.total_stock + value.quantity,
                            },
                            {
                                where: { id: value.product_id },
                            },
                            { transaction: t },
                        );
                    },
                );

                await t.commit();
                res.status(200).send({
                    success: true,
                    message: 'order cancelled',
                    data: {},
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'order cannot be cancelled',
                    data: null,
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'order not found',
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

const userConfirmDelivery = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { order_id } = req.body;

        const findOrder = await orders.findOne({
            where: { id: order_id },
            include: [{ model: carts, where: { user_id: user_id } }],
        });

        if (findOrder) {
            const createStatus = await order_statuses.create({
                status_id: 5,
                order_id: findOrder.id,
                is_rejected: false,
                is_active: true,
            });
            const updatePrev = await order_statuses.update(
                { is_active: false },
                {
                    where: { order_id: findOrder.id, status_id: 4 },
                },
            );

            res.status(200).send({
                success: true,
                message: 'order confirmed',
                data: findOrder,
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'invalid order',
                data: {},
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
    getAllUserOrder,
    getOrderDetails,
    postUserPaymentProof,
    userCancelOrder,
    userConfirmDelivery,
};
