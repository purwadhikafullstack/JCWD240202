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
const sequelize = require('sequelize');

const getClosestWarehouse = async (req, res) => {
    try {
        const { address_id } = req.query;

        const findAddress = await user_addresses.findOne({
            where: { id: address_id },
        });

        if (findAddress) {
            const warehouseData = await warehouses.findOne({
                attributes: [
                    'id',
                    'province',
                    'province_id',
                    'city',
                    'city_id',
                    'subdistrict',
                    'street',
                    'postcode',
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

            let distanceInKm = (
                warehouseData.dataValues.distance / 1000
            ).toFixed(2);

            res.status(200).send({
                success: true,
                message: 'get closest warehouse success',
                data: { warehouseData, distanceInKm },
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'address id not found',
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

const createUserOrder = async (req, res) => {
    try {
        const user_id = req.User.id;
        const {
            cart_id,
            shipping_address,
            courier,
            shipping_method,
            shipping_fee,
            total_weight,
            total_cart_price,
            total,
            warehouse_id,
            receiver_name,
            receiver_number,
        } = req.body;

        const findCart = await carts.findOne({
            where: { id: cart_id, user_id: user_id, is_checkout: false },
        });

        if (findCart) {
            const getCartProducts = await cart_products.findAll({
                where: { cart_id: findCart.id },
            });
            const getProductId = getCartProducts.map((value, index) => {
                return value.product_id;
            });
            const getProducts = await products.findAll({
                where: { id: getProductId },
            });
            const checkStock = getProducts.map((value) => {
                if (value.total_stock === 0) {
                    return 'out of stock';
                }
            });

            if (checkStock.includes('out of stock')) {
                res.status(400).send({
                    success: false,
                    message: `product out of stock`,
                    data: null,
                });
            } else {
                const timestamp = new Date().getTime();
                const invoiceNumber = `inv/${timestamp}`;

                const createOrder = await orders.create({
                    cart_id: findCart.id,
                    shipping_address,
                    courier,
                    shipping_method,
                    shipping_fee,
                    total_weight,
                    total_cart_price,
                    total,
                    warehouse_id,
                    invoice_number: invoiceNumber,
                    receiver_name: receiver_name,
                    receiver_number: receiver_number,
                });

                if (createOrder) {
                    const createStatus = await order_statuses.create({
                        status_id: 1,
                        order_id: createOrder.id,
                        is_active: true,
                    });

                    const updateCart = await carts.update(
                        { is_checkout: true },
                        { where: { id: findCart.id } },
                    );
                    const getCartProducts = await cart_products.findAll({
                        where: { cart_id: findCart.id },
                    });

                    const getProductIds = getCartProducts.map(async (value) => {
                        const findProduct = await products.findOne({
                            where: { id: value.product_id },
                        });

                        await products.update(
                            {
                                total_stock:
                                    findProduct.total_stock - value.quantity,
                            },
                            { where: { id: value.product_id } },
                        );
                    });

                    res.status(200).send({
                        success: true,
                        message: 'create new order success',
                        data: createOrder,
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: 'failed to create order',
                        data: null,
                    });
                }
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'invalid cart id',
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
module.exports = { getClosestWarehouse, createUserOrder };
