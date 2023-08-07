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
        const { page } = req.query;

        const paginationLimit = 100;
        const paginationOffset =
            (Number(page ? page : 1) - 1) * paginationLimit;

        const getOrder = await orders.findAndCountAll({
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
                        '%d %b %Y',
                    ),
                    'createdAt',
                ],
            ],
            include: [
                { model: order_statuses, include: [{ model: statuses }] },
                {
                    model: carts,
                    where: { user_id: user_id },
                    include: [{ model: cart_products }],
                },
            ],
            order: [['id', 'DESC']],
        });

        if (getOrder.count === 0) {
            res.status(200).send({
                message: 'user do not have any transaction history',
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'get all user order success',
                data: getOrder,
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
                                '%d-%b-%Y %h:%i %p',
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
    const t = await sequelize.transaction();
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
                { transaction: t },
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
                await t.commit();
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

module.exports = { getAllUserOrder, getOrderDetails, postUserPaymentProof };
