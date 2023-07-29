const { sequelize } = require('../models');
const { Op } = require('sequelize');
const db = require('../models');
const cart = db.carts;
const cartProduct = db.cart_products;
const orders = db.orders;
const warehouse = db.warehouses;

module.exports = {
    getAllTransaction: async (req, res) => {
        try {
            const {
                warehouse_id,
                search,
                page,
                sort,
                startDate,
                endDate,
                status,
            } = req.query;
            const limit = 5;
            const offset = (Number(page ? page : 1) - 1) * limit;
            let order = [['updatedAt', 'DESC']];
            let where = undefined;
            let whereStatus = undefined;
            if (startDate && endDate) {
                var dateEnd = new Date(endDate).setDate(
                    new Date(endDate).getDate() + 1,
                );
            }
            if (sort == 'oldest') {
                order = [['createdAt', 'ASC']];
            }
            {
                order = [['createdAt', 'DESC']];
            }
            const admin = await db.users.findByPk(13);
            if (admin.dataValues.role_id == 2) {
                const userWhId = await warehouse.findOne({
                    where: { user_id: 13 },
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
                console.log('masuk 1');
                if (warehouse_id) {
                    const wh = await warehouse.findByPk(warehouse_id);
                    if (!wh)
                        return res
                            .status(404)
                            .send({ message: 'Data not found!' });
                    if (startDate && endDate) {
                        where = {
                            warehouse_id,
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
                            warehouse_id,
                            invoice_number: { [Op.substring]: [search] },
                        };
                    }
                } else if (!warehouse_id) {
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
            if (status) {
                whereStatus = { status_id: status };
                console.log(whereStatus)
            }
            const result = await orders.findAndCountAll({
                where: where,
                include: [
                    { model: warehouse },
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
            console.log(result.count);
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
