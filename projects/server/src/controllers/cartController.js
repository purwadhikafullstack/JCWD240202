const db = require('../models');
const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const products = db.products;
const product_images = db.product_images;
const users = db.users;
const carts = db.carts;
const cart_products = db.cart_products;
const categories = db.categories;

const userAddToCart = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.User.id;

        const findUser = await users.findOne({
            where: { id: user_id },
        });
        const findProduct = await products.findOne({
            where: { id: product_id },
            include: [{ model: product_images, where: { is_thumbnail: true } }],
        });

        // Check if user already have a cart
        const findCart = await carts.findOne({
            where: { user_id: user_id, is_checkout: false },
        });
        if (findCart) {
            // check product exist in cart
            const checkCartProducts = await cart_products.findOne({
                where: { cart_id: findCart.id, product_id: product_id },
            });
            if (checkCartProducts) {
                const updateCart = await cart_products.update(
                    { quantity: checkCartProducts.quantity + quantity },
                    { where: { id: checkCartProducts.id } },
                    { transaction: t },
                );
            } else {
                const addProduct = await cart_products.create(
                    {
                        product_id: product_id,
                        cart_id: findCart.id,
                        quantity: quantity,
                        price: findProduct.price,
                        product_name: findProduct.name,
                        image: findProduct.product_images[0].name,
                    },
                    { transaction: t },
                );
            }
        } else {
            const createCart = await carts.create(
                {
                    user_id: user_id,
                },
                { transaction: t },
            );
            if (createCart) {
                const createCartProduct = await cart_products.create(
                    {
                        product_id: product_id,
                        cart_id: createCart.id,
                        quantity: quantity,
                        price: findProduct.price,
                        product_name: findProduct.name,
                        image: findProduct.product_images[0].name,
                    },
                    { transaction: t },
                );
            }
        }
        await t.commit();
        res.status(200).send({
            success: true,
            message: 'Add to cart success',
            data: {},
        });
    } catch (error) {
        await t.rollback();
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getUserCart = async (req, res) => {
    try {
        const user_id = req.User.id;

        const findCart = await carts.findOne({
            where: { user_id: user_id, is_checkout: false },
        });
        if (findCart) {
            const findCartProducts = await cart_products.findAndCountAll({
                where: { cart_id: findCart.id },
                include: [
                    { model: carts },
                    { model: products, include: [{ model: categories }] },
                ],
            });
            const totalWeight = await cart_products.findAll({
                where: { cart_id: findCart.id },
                attributes: [
                    [
                        Sequelize.literal('SUM(quantity*product.weight)'),
                        'total_weight',
                    ],
                ],
                include: [{ model: products, attributes: [] }],
                group: ['cart_id'],
            });

            const totalCartPrice = await cart_products.findAll({
                where: { cart_id: findCart.id },
                attributes: [
                    [Sequelize.literal('SUM(price*quantity)'), 'total_price'],
                ],
                group: ['cart_id'],
            });

            if (findCartProducts) {
                res.status(200).send({
                    success: true,
                    message: 'get user cart success',
                    data: findCartProducts,
                    totalWeight: totalWeight[0].dataValues.total_weight,
                    totalPrice: totalCartPrice[0].dataValues.total_price,
                });
            } else {
                const removeCart = await carts.destroy({
                    where: { id: findCart.id },
                });
                res.status(200).send({ message: 'cart removed' });
            }
        } else {
            res.send({
                message: 'user cart empty',
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

const deleteProductCart = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user_id = req.User.id;
        const { id } = req.params;

        const findCart = await carts.findOne({
            where: { user_id: user_id, is_checkout: false },
        });

        if (findCart) {
            const removeProduct = await cart_products.destroy(
                {
                    where: { product_id: id, cart_id: findCart.id },
                },
                { transaction: t },
            );
            if (removeProduct) {
                const checkProductCart = await cart_products.findAndCountAll({
                    where: { cart_id: findCart.id },
                });
                if (checkProductCart.count === 0) {
                    const removeCart = await carts.destroy(
                        {
                            where: { id: findCart.id },
                        },
                        { transaction: t },
                    );
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: 'failed to remove product from cart',
                    data: null,
                });
            }
        } else {
            res.status(404).send({
                success: true,
                message: 'cart not found',
                data: null,
            });
        }
        await t.commit();
        res.status(200).send({
            success: true,
            message: 'product deleted from cart success',
            data: null,
        });
    } catch (error) {
        await t.rollback();
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const modifyQuantity = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user_id = req.User.id;
        const { quantity } = req.body;
        const { id } = req.params;
        const findCart = await carts.findOne({
            where: { user_id: user_id, is_checkout: false },
        });
        if (findCart) {
            const findCartProduct = await cart_products.findOne({
                where: { cart_id: findCart.id, product_id: id },
            });
            if (findCartProduct) {
                const editQuantity = await cart_products.update(
                    {
                        quantity: findCartProduct.quantity + quantity,
                    },
                    { where: { id: findCartProduct.id } },
                    { transaction: t },
                );
                const checkQuantity = await cart_products.findOne({
                    where: { cart_id: findCart.id, product_id: id },
                });
                if (checkQuantity.quantity <= 0) {
                    const removeProduct = await cart_products.destroy(
                        {
                            where: { cart_id: findCart.id, product_id: id },
                        },
                        { transaction: t },
                    );
                    const checkCartProducts =
                        await cart_products.findAndCountAll({
                            where: { cart_id: findCart.id },
                        });

                    if (checkCartProducts.count === 0) {
                        const removeCart = await carts.destroy(
                            {
                                where: { id: findCart.id },
                            },
                            { transaction: t },
                        );
                        res.status(200).send({
                            success: true,
                            message: 'cart removed',
                            data: {},
                        });
                    } else {
                        res.status(200).send({
                            success: true,
                            message: 'product removed',
                            data: {},
                        });
                    }
                } else {
                    await t.commit();
                    res.status(200).send({
                        success: true,
                        message: 'quantity updated',
                        data: {},
                    });
                }
            } else {
                res.status(404).send({
                    success: false,
                    message: 'product not found',
                    data: {},
                });
            }
        }
    } catch (error) {
        await t.rollback();
        res.status(500).send({
            success: false,
            message: error.message,
            data: {},
        });
    }
};

const getNewestCartItem = async (req, res) => {
    try {
        const user_id = req.User.id;

        const findCart = await carts.findOne({
            where: { user_id: user_id, is_checkout: false },
        });

        if (findCart) {
            const findNewestItems = await cart_products.findAll({
                where: { cart_id: findCart.id },
                include: [
                    { model: products, include: [{ model: categories }] },
                ],
                order: [['updatedAt', 'DESC']],
                limit: 1,
            });

            res.status(200).send({
                success: true,
                message: 'newest item in cart',
                data: findNewestItems,
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'cart not found',
                data: null,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: {},
        });
    }
};

module.exports = {
    userAddToCart,
    getUserCart,
    deleteProductCart,
    modifyQuantity,
    getNewestCartItem,
};
