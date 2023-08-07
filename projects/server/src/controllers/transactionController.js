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
            const limit = 2;
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
            const toPage = await orders.count({
                where: where,
                include: [{
                    model: db.order_statuses,
                    where: whereStatus,
                    include: [{ model: db.statuses }],
                },]
            })
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
            const user_id = req.User.id
            const { cart_id } = req.body
            let nearestWh = 1
            const data = await orders.findOne({
                where: {
                    cart_id
                },
                include: [{ model: cart, include: [{ model: cartProduct }]}]
            })
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: 'Data not found!'
                })
            }
            const findAddress = await db.user_addresses.findOne({
                where: {
                    user_id: data.cart.user_id
                },
                attributes: ['longitude', 'latitude']
            })
            let where = await data.cart?.cart_products?.map((value) => {
                return {
                    product_id: value.product_id,
                    warehouse_id: data.warehouse_id
                }
            })
            const stockWh = await db.product_stocks.findAll({
                where: {
                    [Op.or] : where
                }
            })
            const findNearestWh = await warehouses.findAll({
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

            let enoughStock = []
            let history = []
            let historyMut = []
            let mutation = []
            let mutationDetail = []
            let nextWh = []
            let reqStock = []

            await data.cart?.cart_products.map((product) => {
                stockWh.map((stockWh) => {
                    if (product.product_id === stockWh.product_id) {
                        if (product.quantity > stockWh.stock) {
                            nextWh.push({product_id: product.product_id, warehouse_id: findNearestWh[nearestWh].id})
                            reqStock.push({ product_id: product.product_id, quantity: product.quantity - stockWh.stock, whOriginId: data.warehouse_id })
                            if (stockWh.stock !== 0) {
                                enoughStock.push({ product_id: product.product_id, resultStock: 0, product_stock_id: stockWh.id })
                            }
                            history.push({ product_id: product.product_id, quantity: product.quantity, order_id: data.id, user_id, warehouse_id: data.warehouse_id, type_id: 2, information_id: 2 })
                            mutation.push({ product_id: product.product_id, warehouse_origin_id: data.warehouse_id, user_id, is_approved: true, })
                        } else if (product.quantity < stockWh.stock) {
                            enoughStock.push({ product_id: product.product_id, resultStock: stockWh.stock - product.quantity, product_stock_id: stockWh.id })
                            history.push({product_id: product.product_id, quantity: product.quantity, order_id: data.id, user_id, warehouse_id: data.warehouse_id, type_id: 2, information_id: 2})
                       }
                    }
                })
            })

            for (let i = 0; i < findNearestWh.length - 1; i++) {
                if (nextWh.length > 0) {
                    var stockNextWh = await db.product_stocks.findAll({
                    where: {
                        [Op.or] : nextWh
                    }
                })
                    nearestWh++
                    nextWh = []
                    reqStock.map((product) => {
                        stockNextWh.map((stockWh) => {
                            if (product.product_id === stockWh.product_id) {
                                if (product.quantity > stockWh.stock) {
                                    console.log(reqStock, 'atassss')
                                    nextWh.push({ product_id: product.product_id, warehouse_id: findNearestWh[nearestWh].id })
                                    if (stockWh.stock !== 0) {
                                        enoughStock.push({ product_id: product.product_id, resultStock: 0, product_stock_id: stockWh.id })
                                        mutationDetail.push({ warehouse_destination_id: stockWh.warehouse_id, quantity: stockWh.stock, product_id: product.product_id })
                                        historyMut.push(
                                            { product_id: product.product_id, warehouse_id: stockWh.warehouse_id, quantity: stockWh.stock, user_id, type_id: 2, information_id: 3 },
                                            { product_id: product.product_id, warehouse_id: product.whOriginId, quantity: stockWh.stock, user_id, type_id: 1, information_id: 3},)
                                    }
                                        reqStock.push({ product_id: product.product_id, quantity: product.quantity - stockWh.stock, whOriginId: product.whOriginId })
                                        reqStock.shift()
                                } else if (product.quantity < stockWh.stock) {
                                    enoughStock.push({ product_id: product.product_id, resultStock: stockWh.stock - product.quantity, product_stock_id: stockWh.id })
                                    historyMut.push(
                                        { product_id: product.product_id, warehouse_id: stockWh.warehouse_id, quantity: product.quantity, user_id, type_id: 2, information_id: 3 },
                                        { product_id: product.product_id, warehouse_id: product.whOriginId, quantity: product.quantity, user_id, type_id: 1, information_id: 3},)
                                    mutationDetail.push({warehouse_destination_id: stockWh.warehouse_id, quantity: product.quantity, product_id: product.product_id})
                                    reqStock.shift()
                                }
                            }
                        })
                    })
                }
            }

            const updateMutation = await db.mutations.bulkCreate(mutation, { transaction: t })
            if (updateMutation) {
                await updateMutation.map(async (val) => {
                    mutationDetail.map(async (value) => {
                        if (val.product_id === value.product_id) {
                            await db.mutation_details.create({
                                warehouse_destination_id: value.warehouse_destination_id,
                                mutation_id: val.id,
                                quantity: value.quantity
                            })  
                        }
                    })
                })
                await updateMutation.map(async (val) => {
                    historyMut.map(async (value) => {
                        if (val.product_id === value.product_id) {
                            await db.stock_histories.create({
                                product_id: value.product_id,
                                warehouse_id: value.warehouse_id,
                                quantity: value.quantity,
                                mutation_id: val.id,
                                order_id: data.id,
                                user_id,
                                type_id: value.type_id,
                                information_id: value.information_id,
                            }, { transaction: t })
                        }
                    })
                })
            }
            enoughStock.map(async (value) => {
                await db.product_stocks.update({
                    stock: value.resultStock,
                }, {
                    where: {
                        id: value.product_stock_id
                    }
                }, { transaction: t })  
            })
            // confimation payment tidak generate log barang dikirim ke user
            // const updateStockHistory = await db.stock_histories.bulkCreate(history, { transaction: t })
            const changeStatus = await db.order_statuses.update({status_id: 3}, {where:{order_id: data.id}}, { transaction: t })

            await t.commit();

            // res.send({data, findNearestWh, stockWh, enoughStock, stockNextWh, history, mutation, historyMut, mutationDetail, reqStock, updateMutation, updateStockHistory})
            return res.status(200).send({
                success: true,
                message: 'Payment confirmation success!',
                data: history, historyMut, mutation, mutationDetail, enoughStock, findNearestWh
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
            const { order_id } = req.body
            const dataOrder = await orders.findByPk(order_id)
            const findData = await db.order_statuses.findOne({
                where: {
                    order_id,
                    status_id: 2
                }
            })
            if (!findData)
                return res.status(404).send({
                    success: false,
                    message: "Data not found"
                })
            const changeStatus = await db.order_statuses.update({ status_id: 1 }, { where: { order_id } }, { transaction: t })
            deleteSingleFile(`src/public/images/${dataOrder?.payment_proof}`);
            await t.commit();
            return res.status(200).send({
                success: true,
                message: "Cancel payment confirmation success!",
                data: changeStatus
            })
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
        // const t = await sequelize.transaction();
        try {
            const { order_id } = req.body
            let prevStock = []
            // let originStock = []
            const data = await orders.findOne({
                where: {
                    id: order_id
                },
                include: [{ model: cart, include: [{ model: cartProduct }]}]
            })
            const stockHistory = await db.stock_histories.findAll({
                where: {
                    order_id,
                    type_id: 2
                }
            })
            let totalFromMut = 0
            const productStoc = await data.cart?.cart_products.map(async (product) => {
                await stockHistory.map((value) => {
                    if (product.product_id === value.product_id) {
                        if (value.mutation_id) {
                            prevStock.push({ product_id: value.product_id, warehouse_id: value.warehouse_id, stock: value.quantity })
                            totalFromMut += value.quantity
                        } else {
                            prevStock.push({ product_id: product.product_id, warehouse_id: data.warehouse_id, stock: value.quantity })
                        }
                    }
                })
                if (totalFromMut !== 0) {
                    await db.product_stocks.update({
                        stock: product.quantity - totalFromMut
                    }, {
                        where: {
                            product_id: product.product_id,
                            warehouse_id: data.warehouse_id
                        }
                    })
                    console.log(product.quantity - totalFromMut)
                    totalFromMut = 0
                    console.log(totalFromMut)
                }
            })
            if (prevStock.length > 0) {
                prevStock.map(async (value) => {
                    await db.product_stocks.update({
                        stock: value.stock
                    }, {
                        where: {
                            product_id: value.product_id,
                            warehouse_id: value.warehouse_id
                        }
                    })
                }) 
            }
            // if (originStock.length > 0) {
            //     originStock.map(async (value) => {
            //         await db.product_stocks.update({
            //             stock: value.stock
            //         }, {
            //             where: {
            //                 product_id: value.product_id,
            //                 warehouse_id: value.warehouse_id
            //             }
            //         })
            //     })
            // }
            // const mutationId = new Set();
            // const getMutationId = stockHistory.filter((item) => {
            //     const isDuplicate = mutationId.has(item.mutation_id);
            //     mutationId.add(item.mutation_id);
            //     return !isDuplicate;
            // });
            await stockHistory.map(async (value) => {
                await db.mutations.destroy({
                    where: {
                        id: value.mutation_id
                    }
                })
                await db.mutation_details.destroy({
                    where: {
                        mutation_id: value.mutation_id
                    }
                })
            })
            const deleteStockHis = await db.stock_histories.destroy({
                where: {
                    order_id: data.id
                }
            })
            // res.send({ data, stockHistory, prevStock, deleteStockHis })
            return res.status(200).send({
                success: true,
                message: 'Confirmation payment success!',
                data: data, stockHistory, prevStock, deleteStockHis
            });
        } catch (error) {
            // await t.rollback();
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    }
};
