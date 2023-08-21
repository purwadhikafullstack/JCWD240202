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
const Sequelize = require('sequelize');
const { sequelize } = require('../models');

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
                        Sequelize.fn(
                            'ST_Distance_Sphere',
                            Sequelize.fn(
                                'POINT',
                                findAddress.longitude,
                                findAddress.latitude,
                            ),
                            Sequelize.fn(
                                'POINT',
                                Sequelize.col('longitude'),
                                Sequelize.col('latitude'),
                            ),
                        ),
                        'distance',
                    ],
                ],
                order: Sequelize.fn(
                    'ST_Distance_Sphere',
                    Sequelize.fn(
                        'POINT',
                        findAddress.longitude,
                        findAddress.latitude,
                    ),
                    Sequelize.fn(
                        'POINT',
                        Sequelize.col('longitude'),
                        Sequelize.col('latitude'),
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
                const currentTime = new Date();

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
                        expired: currentTime.getTime() + 24 * 60 * 60 * 1000,
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

                    const eventScheduler =
                        await sequelize.query(`CREATE EVENT payment_expired_${createStatus.id} ON SCHEDULE AT NOW() + INTERVAL 24 HOUR
                            DO BEGIN
                            DECLARE status_check INT;
                            DECLARE is_active_check INT;
                            SELECT status_id INTO status_check FROM order_statuses WHERE id = ${createStatus.id} LIMIT 1;
                            SELECT is_active INTO is_active_check FROM order_statuses WHERE id = ${createStatus.id} LIMIT 1;
                            IF status_check = 1 AND is_active_check = 1 THEN
                            INSERT INTO order_statuses (status_id, order_id, createdAt, updatedAt, is_active, is_rejected) VALUES (6, "${createStatus.order_id}", current_timestamp(), current_timestamp(), 1, 0);
                            UPDATE order_statuses SET is_active = 0 WHERE id = "${createStatus.id}" AND status_id = 1;
                            END IF;
                            END;`);

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
