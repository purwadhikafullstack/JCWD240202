const sequelize = require('sequelize');
const db = require('../models');
const products = db.products;
const product_images = db.product_images;
const users = db.users;
const carts = db.carts;
const cart_products = db.cart_products;
const orders = db.orders;

const userCheckout = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { cart_id } = req.body;

        const findCart = await carts.findOne({
            where: { id: cart_id, is_checkout: false },
            include: [{ model: cart_products, include: [{ model: products }] }],
        });
        const totalCartPrice = await cart_products.findAll({
            attributes: [
                [sequelize.literal('SUM(price*quantity)'), 'total_price'],
            ],
        });
        const totalWeight = await cart_products.findAll({
            attributes: [
                [
                    sequelize.literal('SUM(quantity*product.weight)'),
                    'total_weight',
                ],
            ],
            include: [{ model: products, attributes: [] }],
            group: ['cart_id'],
        });

        if (findCart && totalCartPrice && totalWeight) {
            const createOrder = await orders.create({
                cart_id: findCart.id,
                total_cart_price: totalCartPrice[0].dataValues.total_price,
                total_weight: totalWeight[0].dataValues.total_weight,
            });

            res.status(200).send({
                success: true,
                message: 'order created',
                data: {},
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports = { userCheckout };
