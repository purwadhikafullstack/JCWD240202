const db = require('../models');
const products = db.products;
const product_images = db.product_images;
const users = db.users;
const carts = db.carts;
const cart_products = db.cart_products;
const categories = db.categories;

const userAddToCart = async (req, res) => {
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
                );
                res.status(200).send({
                    success: true,
                    message: 'update quantity in cart success',
                    data: {},
                });
            } else {
                const addProduct = await cart_products.create({
                    product_id: product_id,
                    cart_id: findCart.id,
                    quantity: quantity,
                    price: findProduct.price,
                    product_name: findProduct.name,
                    image: findProduct.product_images[0].name,
                });
                res.status(200).send({
                    success: true,
                    message: 'add product to cart success',
                    data: addProduct,
                });
            }
        } else {
            const createCart = await carts.create({
                user_id: user_id,
            });
            if (createCart) {
                const createCartProduct = await cart_products.create({
                    product_id: product_id,
                    cart_id: findCart.id,
                    quantity: quantity,
                    price: findProduct.price,
                    product_name: findProduct.name,
                    image: findProduct.product_images[0].name,
                });
                res.status(200).send({
                    success: true,
                    message: 'create new cart success',
                    data: createCartProduct,
                });
            }
        }
    } catch (error) {
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

            res.status(200).send({
                success: true,
                message: 'get user cart success',
                data: findCartProducts,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'user cart not found',
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

module.exports = { userAddToCart, getUserCart };
