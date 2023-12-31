const { sequelize } = require('../models');
const { Op } = require('sequelize');
const db = require('../models');
const { deleteSingleFile } = require('../helper/deleteFiles');
const cart = db.carts;
const cartProduct = db.cart_products;
const orders = db.orders;
const warehouses = db.warehouses;

module.exports = {
    getAllTransaction: async (req, res) => {
        try {
            const uId = req.User.id;
            const {
                warehouse,
                search,
                page,
                sort,
                startDate,
                endDate,
                statusId,
            } = req.query;

            const limit = 5;
            const offset = (Number(page ? page : 1) - 1) * limit;
            let order = [['createdAt', 'DESC']];
            let where = undefined;
            let whereStatus = { is_active: true };
            if (startDate && endDate) {
                var dateEnd = new Date(endDate).setDate(
                    new Date(endDate).getDate() + 1,
                );
            }
            if (sort == 'Oldest') {
                order = [['createdAt', 'ASC']];
            } else if (sort == 'Newest') {
                order = [['createdAt', 'DESC']];
            }
            const admin = await db.users.findByPk(uId);
            if (admin.dataValues.role_id == 2) {
                const userWhId = await warehouses.findOne({
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
                } else if (startDate) {
                    where = {
                        warehouse_id: userWhId.dataValues.id,
                        invoice_number: { [Op.substring]: [search] },
                        createdAt: {
                            [Op.gte]: new Date(startDate),
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
                            city: warehouse.replace(/%/g, ' '),
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
                    } else if (startDate) {
                        where = {
                            warehouse_id: userWhId.dataValues.id,
                            invoice_number: { [Op.substring]: [search] },
                            createdAt: {
                                [Op.gte]: new Date(startDate),
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
                    } else if (startDate) {
                        where = {
                            invoice_number: { [Op.substring]: [search] },
                            createdAt: {
                                [Op.gte]: new Date(startDate),
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
                whereStatus['status_id'] = statusId;
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
            const toPage = await orders.count({
                where: where,
                include: [
                    {
                        model: db.order_statuses,
                        where: whereStatus,
                        include: [{ model: db.statuses }],
                    },
                ],
            });
            const totalPage = Math.ceil(toPage / limit);
            return res.status(200).send({
                success: true,
                message: 'fetch success!',
                data: result,
                totalPage,
                roleId: admin.dataValues.role_id,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    confirmationPayment: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const user_id = req.User.id;
            const { cart_id } = req.body;
            let nearestWh = 1;
            const data = await orders.findOne({
                where: {
                    cart_id,
                },
                include: [{ model: cart, include: [{ model: cartProduct }] }],
            });
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: 'Data not found!',
                });
            }
            const findAddress = await db.user_addresses.findOne({
                where: {
                    user_id: data.cart.user_id,
                },
                attributes: ['longitude', 'latitude'],
            });
            let where = await data.cart?.cart_products?.map((value) => {
                return {
                    product_id: value.product_id,
                    warehouse_id: data.warehouse_id,
                };
            });
            const stockWh = await db.product_stocks.findAll({
                where: {
                    [Op.or]: where,
                },
            });
            const findNearestWh = await warehouses.findAll({
                where: { is_deleted: false },
                attributes: [
                    'id',
                    [
                        sequelize.fn(
                            'ST_Distance_Sphere',
                            sequelize.fn(
                                'POINT',
                                findAddress.longitude,
                                findAddress.latitude,
                            ),
                            sequelize.fn(
                                'POINT',
                                sequelize.col('longitude'),
                                sequelize.col('latitude'),
                            ),
                        ),
                        'distance',
                    ],
                ],
                order: sequelize.fn(
                    'ST_Distance_Sphere',
                    sequelize.fn(
                        'POINT',
                        findAddress.longitude,
                        findAddress.latitude,
                    ),
                    sequelize.fn(
                        'POINT',
                        sequelize.col('longitude'),
                        sequelize.col('latitude'),
                    ),
                ),
            });

            let enoughStock = [];
            let historyMut = [];
            let mutation = [];
            let mutationDetail = [];
            let nextWh = [];
            let reqStock = [];

            await data.cart?.cart_products.map((product) => {
                stockWh.map((stockWh) => {
                    if (product.product_id === stockWh.product_id) {
                        if (product.quantity > stockWh.stock) {
                            nextWh.push({
                                product_id: product.product_id,
                                warehouse_id: findNearestWh[nearestWh].id,
                            });
                            reqStock.push({
                                product_id: product.product_id,
                                quantity: product.quantity - stockWh.stock,
                                whOriginId: data.warehouse_id,
                            });
                            if (stockWh.stock !== 0) {
                                enoughStock.push({
                                    product_id: product.product_id,
                                    resultStock: 0,
                                    product_stock_id: stockWh.id,
                                });
                            }
                        } else if (product.quantity < stockWh.stock) {
                            enoughStock.push({
                                product_id: product.product_id,
                                resultStock: stockWh.stock - product.quantity,
                                product_stock_id: stockWh.id,
                            });
                        }
                    }
                });
            });

            for (let i = 0; i < findNearestWh.length - 1; i++) {
                if (nextWh.length > 0) {
                    var stockNextWh = await db.product_stocks.findAll({
                        where: {
                            [Op.or]: nextWh,
                        },
                    });
                    nearestWh++;
                    nextWh = [];
                    reqStock.map((product) => {
                        stockNextWh.map((stockWh) => {
                            if (product.product_id === stockWh.product_id) {
                                if (product.quantity > stockWh.stock) {
                                    nextWh.push({
                                        product_id: product.product_id,
                                        warehouse_id:
                                            findNearestWh[nearestWh].id,
                                    });
                                    if (stockWh.stock !== 0) {
                                        enoughStock.push({
                                            product_id: product.product_id,
                                            resultStock: 0,
                                            product_stock_id: stockWh.id,
                                        });
                                        mutation.push({
                                            product_id: product.product_id,
                                            warehouse_origin_id:
                                                data.warehouse_id,
                                            user_id,
                                            is_approved: true,
                                            warehouse_destination_id:
                                                stockWh.warehouse_id,
                                        });
                                        mutationDetail.push({
                                            warehouse_destination_id:
                                                stockWh.warehouse_id,
                                            quantity: stockWh.stock,
                                            product_id: product.product_id,
                                        });
                                        historyMut.push(
                                            {
                                                product_id: product.product_id,
                                                warehouse_id:
                                                    stockWh.warehouse_id,
                                                quantity: stockWh.stock,
                                                user_id,
                                                type_id: 2,
                                                information_id: 3,
                                                cek: stockWh.warehouse_id,
                                            },
                                            {
                                                product_id: product.product_id,
                                                warehouse_id:
                                                    product.whOriginId,
                                                quantity: stockWh.stock,
                                                user_id,
                                                type_id: 1,
                                                information_id: 3,
                                                cek: stockWh.warehouse_id,
                                            },
                                        );
                                    }
                                    reqStock.push({
                                        product_id: product.product_id,
                                        quantity:
                                            product.quantity - stockWh.stock,
                                        whOriginId: product.whOriginId,
                                    });
                                    reqStock.shift();
                                } else if (product.quantity < stockWh.stock) {
                                    enoughStock.push({
                                        product_id: product.product_id,
                                        resultStock:
                                            stockWh.stock - product.quantity,
                                        product_stock_id: stockWh.id,
                                    });
                                    historyMut.push(
                                        {
                                            product_id: product.product_id,
                                            warehouse_id: stockWh.warehouse_id,
                                            quantity: product.quantity,
                                            user_id,
                                            type_id: 2,
                                            information_id: 3,
                                            cek: stockWh.warehouse_id,
                                        },
                                        {
                                            product_id: product.product_id,
                                            warehouse_id: product.whOriginId,
                                            quantity: product.quantity,
                                            user_id,
                                            type_id: 1,
                                            information_id: 3,
                                            cek: stockWh.warehouse_id,
                                        },
                                    );
                                    mutation.push({
                                        product_id: product.product_id,
                                        warehouse_origin_id: data.warehouse_id,
                                        user_id,
                                        is_approved: true,
                                        warehouse_destination_id:
                                            stockWh.warehouse_id,
                                    });
                                    mutationDetail.push({
                                        warehouse_destination_id:
                                            stockWh.warehouse_id,
                                        quantity: product.quantity,
                                        product_id: product.product_id,
                                    });
                                    reqStock.shift();
                                }
                            }
                        });
                    });
                }
            }
            if (mutation.length > 0) {
                mutation.map(async (value) => {
                    mutationDetail.map(async (val) => {
                        if (
                            value.product_id === val.product_id &&
                            value.warehouse_destination_id ===
                                val.warehouse_destination_id
                        ) {
                            const mut = await db.mutations.create(
                                {
                                    product_id: value.product_id,
                                    warehouse_origin_id:
                                        value.warehouse_origin_id,
                                    user_id,
                                    is_approved: value.is_approved,
                                },
                                { transaction: t },
                            );
                            const mutTail = await db.mutation_details.create(
                                {
                                    warehouse_destination_id:
                                        val.warehouse_destination_id,
                                    mutation_id: mut.id,
                                    quantity: val.quantity,
                                },
                                { transaction: t },
                            );
                            historyMut.map(async (value) => {
                                if (
                                    value.cek ===
                                        mutTail.warehouse_destination_id &&
                                    value.product_id === mut.product_id
                                ) {
                                    const sH = await db.stock_histories.create(
                                        {
                                            product_id: value.product_id,
                                            warehouse_id: value.warehouse_id,
                                            quantity: value.quantity,
                                            mutation_id: mut.id,
                                            order_id: data.id,
                                            user_id,
                                            type_id: value.type_id,
                                            information_id:
                                                value.information_id,
                                        },
                                        { transaction: t },
                                    );
                                }
                            });
                        }
                    });
                });
            }
            enoughStock.map(async (value) => {
                await db.product_stocks.update(
                    {
                        stock: value.resultStock,
                    },
                    {
                        where: {
                            id: value.product_stock_id,
                        },
                        transaction: t,
                    },
                );
            });

            await db.order_statuses.update(
                { is_active: 0 },
                { where: { status_id: 2, order_id: data.id }, transaction: t },
            );
            const createStatus = await db.order_statuses.create(
                { status_id: 3, order_id: data.id, is_active: 1 },
                { transaction: t },
            );
            await db.notifications.create(
                {
                    order_id: data.id,
                    user_id: data.cart.user_id,
                    message:
                        'Your payment has been confirmed by admin and your order is being processed',
                    title: 'Payment Success',
                },
                { transaction: t },
            );
            await t.commit();
            return res.status(200).send({
                success: true,
                message: 'Payment confirmation success!',
                data: historyMut,
                mutation,
                mutationDetail,
                enoughStock,
                findNearestWh,
                createStatus,
            });
        } catch (error) {
            await t.rollback();
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    cancelConfirmPayment: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { order_id } = req.body;
            const currentTime = new Date();

            const dataOrder = await orders.findByPk(order_id, {
                include: [{ model: cart, include: { model: cartProduct } }],
            });

            const findData = await db.order_statuses.findOne({
                where: {
                    order_id,
                    status_id: 2,
                    is_active: true,
                },
            });

            if (!findData) {
                res.status(404).send({
                    success: false,
                    message: 'Data not found',
                });
            } else {
                const changeStatus = await db.order_statuses.update(
                    { is_active: 0, is_rejected: 1 },
                    { where: { id: findData.id }, transaction: t },
                );
                const removeImage = await orders.update(
                    { payment_proof: null },
                    { where: { id: dataOrder.id }, transaction: t },
                );
                const createStatus = await db.order_statuses.create(
                    {
                        status_id: 1,
                        order_id,
                        is_active: 1,
                        expired: currentTime.getTime() + 24 * 60 * 60 * 1000,
                    },
                    { transaction: t },
                );
                deleteSingleFile(
                    `src/public/images/${dataOrder?.payment_proof}`,
                );

                const getProducts = dataOrder.cart.cart_products.map(
                    (value) => {
                        return {
                            id: value.product_id,
                            quantity: value.quantity,
                        };
                    },
                );
                let updateStock = '';
                for (let i = 0; i < getProducts.length; i++) {
                    updateStock += `SELECT total_stock INTO current_quantity FROM products WHERE id = ${getProducts[i].id};
                    UPDATE products SET total_stock = current_quantity + ${getProducts[i].quantity} WHERE id = ${getProducts[i].id};`;
                }

                const eventScheduler = await sequelize.query(
                    `CREATE EVENT payment_expired_${createStatus.id} ON SCHEDULE AT NOW() + INTERVAL 24 HOUR
                                DO BEGIN
                                DECLARE status_check INT;
                                DECLARE is_active_check INT;
                                DECLARE current_quantity INT;
                                SELECT status_id INTO status_check FROM order_statuses WHERE id = ? LIMIT 1;
                                SELECT is_active INTO is_active_check FROM order_statuses WHERE id = ? LIMIT 1;
                                IF status_check = 1 AND is_active_check = 1 THEN
                                INSERT INTO order_statuses (status_id, order_id, createdAt, updatedAt, is_active, is_rejected) VALUES (6, ?, current_timestamp(), current_timestamp(), 1, 0);
                                UPDATE order_statuses SET is_active = 0 WHERE id = ? AND status_id = 1;
                                ${updateStock}
                                END IF;
                                END;`,
                    {
                        replacements: [
                            createStatus.id,
                            createStatus.id,
                            dataOrder.id,
                            createStatus.id,
                        ],
                        transaction: t,
                    },
                );

                await t.commit();
                return res.status(200).send({
                    success: true,
                    message: 'Cancel payment confirmation success!',
                    data: null,
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
    },
    sendUserOrders: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const user_id = req.User.id;
            const { order_id } = req.body;
            const data = await orders.findOne({
                where: {
                    id: order_id,
                },
                include: [{ model: cart, include: [{ model: cartProduct }] }],
            });
            const stockHistory = await data.cart?.cart_products.map((value) => {
                return {
                    product_id: value.product_id,
                    quantity: value.quantity,
                    order_id: data.id,
                    user_id,
                    warehouse_id: data.warehouse_id,
                    type_id: 2,
                    information_id: 2,
                };
            });
            const updateStockHistory = await db.stock_histories.bulkCreate(
                stockHistory,
                { transaction: t },
            );
            const createStatus = await db.order_statuses.create(
                {
                    status_id: 4,
                    order_id,
                    is_active: 1,
                    expired: new Date(
                        new Date().setDate(new Date().getDate() + 7),
                    ),
                },
                { transaction: t },
            );
            await db.notifications.create(
                {
                    order_id,
                    user_id: data.cart.user_id,
                    message: 'Your order is on the way',
                    title: 'Order Sent',
                },
                { transaction: t },
            );
            const expired = await sequelize.query(`
            CREATE EVENT shipping_expired_${order_id} ON SCHEDULE AT NOW() + INTERVAL 7 DAY
            DO BEGIN
            DECLARE status_check INT;
            SELECT status_id INTO status_check FROM order_statuses WHERE id = ${order_id} AND is_active = 1 LIMIT 1;
            IF status_check = 4 THEN
            INSERT INTO order_statuses (status_id, order_id, is_active, createdAt, updatedAt) VALUES (5, "${order_id}", 1, current_timestamp(), current_timestamp());
            UPDATE order_statuses SET is_active = 0 WHERE order_id = "${order_id}" AND status_id = 4;
            END IF;
            END;`);
            await db.order_statuses.update(
                { is_active: 0 },
                { where: { status_id: 3, order_id }, transaction: t },
            );
            await t.commit();
            return res.status(200).send({
                success: true,
                message: 'Sending users order!',
                data: updateStockHistory,
                createStatus,
                expired,
            });
        } catch (error) {
            await t.rollback();
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    cancelReadyShipping: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const user_id = req.User.id;
            const { order_id } = req.body;
            let prevStock = [];
            let stockHis = [];
            let prevStockTotal = [];
            const data = await orders.findOne({
                where: {
                    id: order_id,
                },
                include: [{ model: cart, include: [{ model: cartProduct }] }],
            });
            const stockHistory = await db.stock_histories.findAll({
                where: {
                    order_id,
                    type_id: 2,
                },
            });
            await data.cart?.cart_products.map((val) => {
                prevStockTotal.push({
                    product_id: val.product_id,
                    stock: val.quantity,
                });
            });
            if (stockHistory.length === 0) {
                await data.cart?.cart_products.map((val) => {
                    prevStock.push({
                        product_id: val.product_id,
                        warehouse_id: data.warehouse_id,
                        stock: val.quantity,
                    });
                });
            } else {
                let totalFromMut = 0;
                const productStock = await data.cart?.cart_products.map(
                    async (product) => {
                        await stockHistory.map((value) => {
                            if (product.product_id === value.product_id) {
                                if (value.mutation_id) {
                                    prevStock.push({
                                        product_id: value.product_id,
                                        warehouse_id: value.warehouse_id,
                                        stock: value.quantity,
                                    });
                                    stockHis.push({
                                        product_id: value.product_id,
                                        warehouse_id: value.warehouse_id,
                                        stock: value.quantity,
                                    });
                                    totalFromMut += value.quantity;
                                }
                            }
                        });
                        if (totalFromMut !== 0) {
                            db.product_stocks.update(
                                {
                                    stock: product.quantity - totalFromMut,
                                },
                                {
                                    where: {
                                        product_id: product.product_id,
                                        warehouse_id: data.warehouse_id,
                                    },
                                    transaction: t,
                                },
                            );
                            totalFromMut = 0;
                        } else {
                            prevStock.push({
                                product_id: product.product_id,
                                warehouse_id: data.warehouse_id,
                                stock: product.quantity,
                            });
                        }
                    },
                );
                // await stockHistory.map(async (value) => {
                //     await db.mutation_details.destroy(
                //         {
                //             where: {
                //                 mutation_id: value.mutation_id,
                //             },
                //         },
                //         { transaction: t },
                //     );
                //     await db.mutations.destroy(
                //         {
                //             where: {
                //                 id: value.mutation_id,
                //             },
                //         },
                //         { transaction: t },
                //     );
                // });
            }
            prevStockTotal.map(async (value) => {
                const data = await db.products.findByPk(value.product_id);
                await db.products.update(
                    {
                        total_stock: value.stock + data.total_stock,
                    },
                    {
                        where: {
                            id: value.product_id,
                        },
                        transaction: t,
                    },
                );
            });
            if (prevStock.length > 0) {
                prevStock.map(async (value) => {
                    const data = await db.product_stocks.findOne({
                        where: {
                            product_id: value.product_id,
                            warehouse_id: value.warehouse_id,
                        },
                    });
                    await db.product_stocks.update(
                        {
                            stock: value.stock + data.stock,
                        },
                        {
                            where: {
                                product_id: value.product_id,
                                warehouse_id: value.warehouse_id,
                            },
                            transaction: t,
                        },
                    );
                });
            }
            if (stockHis.length > 0) {
                var createHis = stockHis.map((val) => {
                    return {
                        product_id: val.product_id,
                        warehouse_id: val.warehouse_id,
                        quantity: val.stock,
                        order_id,
                        user_id: user_id,
                        type_id: 1,
                        information_id: 4,
                    };
                });
                var createHistory = await db.stock_histories.bulkCreate(
                    createHis,
                    { transaction: t },
                );
            }

            await db.order_statuses.update(
                { is_active: 0 },
                { where: { status_id: 3, order_id }, transaction: t },
            );
            const createStatus = await db.order_statuses.create(
                { status_id: 6, order_id, is_active: 1 },
                { transaction: t },
            );
            await t.commit();
            return res.status(200).send({
                success: true,
                message: 'Cancel order success!',
                data: prevStock,
                createStatus,
                createHistory,
            });
        } catch (error) {
            await t.rollback();
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    transactionHistory: async (req, res) => {
        try {
            const { order_id } = req.params;
            const result = await db.order_statuses.findAll({
                where: { order_id },
                include: [{ model: orders }, { model: db.statuses }],
                order: [['id', 'DESC']],
            });
            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: 'data not found!',
                });
            }
            res.status(200).send({
                success: true,
                message: 'get transaction history success',
                data: result,
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
