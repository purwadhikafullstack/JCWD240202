const { sequelize } = require('../models');
const { Op } = require('sequelize');
const db = require('../models');
const cart = db.carts;
const cartProduct = db.cart_products;
const orders = db.orders;
const warehouses = db.warehouses;

module.exports = {
    getAllTransaction: async (req, res) => {
        try {
            const uId = req.User.id
            const {
                warehouse,
                search,
                page,
                sort,
                startDate,
                endDate,
                statusId,
            } = req.query;
            console.log(startDate, endDate)
            const limit = 5;
            const offset = (Number(page ? page : 1) - 1) * limit;
            let order = [['createdAt', 'DESC']];
            let where = undefined;
            let whereStatus = undefined;
            if (startDate && endDate) {
                var dateEnd = new Date(endDate).setDate(
                    new Date(endDate).getDate() + 1,
                );
            }
            if (sort == 'Oldest') {
                order = [['createdAt', 'ASC']];
            } else if (sort == 'Newest')
            {
                order = [['createdAt', 'DESC']];
            }
            const admin = await db.users.findByPk(uId);
            if (admin.dataValues.role_id == 2) {
                const userWhId = await s.findOne({
                    where: { user_id: uId },
                });
                if (startDate && endDate) {
                    where = {
                        warehouse_id: userWhId.dataValues.id,
                        invoice_number: { [Op.substring]: [search] },
                        createdAt: {
                            [Op.between]: [
                                new Date(startDate),
                                new Date(dateEnd),
                            ],
                        },
                    };
                } else {
                    where = {
                        warehouse_id: userWhId.dataValues.id,
                        invoice_number: { [Op.substring]: [search] },
                    };
                }
            } else {
                if (warehouse) {
                    const whId = await warehouses.findOne({
                        where: {
                            city: warehouse,
                        },
                    });
                    if (!whId)
                        return res
                            .status(404)
                            .send({ message: 'Data not found!' });
                    if (startDate && endDate) {
                        where = {
                            warehouse_id: whId.dataValues.id,
                            invoice_number: { [Op.substring]: [search] },
                            createdAt: {
                                [Op.between]: [
                                    new Date(startDate),
                                    new Date(dateEnd),
                                ],
                            },
                        };
                    } else {
                        where = {
                            warehouse_id: whId.dataValues.id,
                            invoice_number: { [Op.substring]: [search] },
                        };
                    }
                } else if (!warehouse) {
                    if (startDate && endDate) {
                        where = {
                            invoice_number: { [Op.substring]: [search] },
                            createdAt: {
                                [Op.between]: [
                                    new Date(startDate),
                                    new Date(dateEnd),
                                ],
                            },
                        };
                    } else {
                        where = {
                            invoice_number: { [Op.substring]: [search] },
                        };
                    }
                }
            }
            if (statusId) {
                whereStatus = { status_id: statusId };
            }
            const result = await orders.findAndCountAll({
                where: where,
                include: [
                    { model: warehouses },
                    { model: cart, include: [{ model: cartProduct }] },
                    {
                        model: db.order_statuses,
                        where: whereStatus,
                        include: [{ model: db.statuses }],
                    },
                ],
                offset,
                limit,
                order,
            });
            const totalPage = Math.ceil(result.count / limit);
            return res.status(200).send({
                success: true,
                message: 'fetch success!',
                data: result,
                totalPage,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
