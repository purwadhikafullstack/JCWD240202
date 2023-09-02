const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const products = db.products;
const users = db.users;
const carts = db.carts;
const orders = db.orders;
const order_statuses = db.order_statuses;
const notifications = db.notifications;

const createNotification = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { order_id, title, message } = req.body;
        const admin_id = req.User.id;

        const findOrder = await orders.findByPk(order_id, {
            include: [{ model: carts }],
        });
        const checkStatus = await order_statuses.findOne({
            where: { status_id: 2, order_id, is_active: true },
        });

        if (!findOrder || !message || !title) {
            res.status(404).send({
                success: false,
                message: 'data not found',
                data: null,
            });
        } else {
            const createNotif = await notifications.create(
                {
                    order_id: findOrder.id,
                    user_id: findOrder.dataValues.cart.dataValues.user_id,
                    message,
                    title,
                },
                { transaction: t },
            );

            await t.commit();
            res.status(200).send({
                success: true,
                message: 'create notification success',
                data: {},
            });
        }
    } catch (error) {
        await t.rollback();
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getUserNotification = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { page } = req.query;

        const limit = 5;
        const paginationOffset = (Number(page ? page : 1) - 1) * limit;

        const getNotification = await notifications.findAndCountAll({
            attributes: [
                'id',
                'user_id',
                'order_id',
                'title',
                'message',
                'is_read',
                [
                    sequelize.fn(
                        'DATE_FORMAT',
                        sequelize.col('notifications.createdAt'),
                        '%a, %d-%b-%Y %h:%i %p',
                    ),
                    'createdAt',
                ],
            ],
            where: { user_id },
            order: [['id', 'DESC']],
            limit,
            offset: paginationOffset
        });

        const countUnReadNotif = await notifications.findAndCountAll({
            where: { user_id, is_read: false },
        });

        if (getNotification) {
            const totalPage = Math.ceil(getNotification.count / limit);
            res.status(200).send({
                success: true,
                message: 'get notification success',
                data: {
                    notifications: getNotification,
                    unReadCount: countUnReadNotif.count,
                },
                totalPage
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'get notification failed',
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

const getNotificationDetails = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { notification_id } = req.params;

        const getNotif = await notifications.findOne({
            where: { id: notification_id, user_id },
        });

        if (getNotif) {
            res.status(200).send({
                success: true,
                message: 'notification details',
                data: getNotif,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'notification not found',
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

const userReadNotification = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user_id = req.User.id;
        const { notification_id } = req.body;

        const findNotif = await notifications.findOne({
            where: { id: notification_id, user_id },
        });

        if (!findNotif) {
            res.status(404).send({
                success: false,
                message: 'notification not found',
                data: null,
            });
        } else {
            const readNotif = await notifications.update(
                { is_read: true },
                { where: { id: findNotif.id } },
                { transaction: t },
            );

            await t.commit();
            res.status(200).send({
                success: true,
                message: 'user read notification',
                data: {},
            });
        }
    } catch (error) {
        await t.rollback();
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    createNotification,
    getUserNotification,
    userReadNotification,
    getNotificationDetails,
};
