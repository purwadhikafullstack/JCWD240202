const db = require('../models');
const categories = db.categories;
const products = db.products;
const product_images = db.product_images;
const orders = db.orders;
const order_statuses = db.order_statuses;
const carts = db.carts;
const cart_products = db.cart_products;
const { sequelize } = require('../models');

const getAllCategories = async (req, res) => {
    try {
        const findCategories = await categories.findAll({
            attributes: ['name', 'image'],
        });

        if (findCategories) {
            res.status(200).send({
                success: true,
                message: 'get all categories success',
                data: findCategories,
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'get categories failed',
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

const getNewArrivals = async (req, res) => {
    try {
        const newArrivals = await products.findAll({
            where: { is_deleted: false },
            limit: 10,
            include: [
                {
                    model: product_images,
                    where: { is_thumbnail: true },
                },
            ],
            order: [['id', 'DESC']],
        });

        if (newArrivals) {
            res.status(200).send({
                success: true,
                message: 'get new products success',
                data: newArrivals,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'no new products found',
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

const getBestSeller = async (req, res) => {
    try {
        const bestSeller = await products.findAll({
            where: { is_deleted: false },
            attributes: [
                'id',
                'name',
                'price',
                [
                    sequelize.literal(`(
                        SELECT SUM(cart_products.quantity)
                        FROM cart_products
                        INNER JOIN carts ON cart_products.cart_id = carts.id
                        INNER JOIN orders ON orders.cart_id = carts.id
                        INNER JOIN order_statuses ON order_statuses.order_id = orders.id
                        WHERE order_statuses.status_id = 5 AND order_statuses.is_active = true AND cart_products.product_id = products.id                           
                    )`),
                    'totalQuantity',
                ],
            ],
            include: [
                {
                    model: product_images,
                    attributes: ['name'],
                    where: { is_thumbnail: true },
                },
            ],
            order: [[sequelize.literal('totalQuantity'), 'DESC']],
            limit: 5,
        });

        res.status(200).send({
            success: true,
            message: 'get best seller success',
            data: bestSeller,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    getAllCategories,
    getNewArrivals,
    getBestSeller,
};
