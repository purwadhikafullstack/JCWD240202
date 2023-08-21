const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const products = db.products;
const wishlists = db.wishlists;
const product_images = db.product_images;
const users = db.users;
const colors = db.colors;

const addNewWishlist = async (req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.User.id;

        const findProduct = await products.findOne({
            where: { id: product_id },
        });
        if (findProduct) {
            const checkWishlist = await wishlists.findOne({
                where: { product_id: findProduct.id, user_id: user_id },
            });
            if (!checkWishlist) {
                const createWishlist = await wishlists.create({
                    product_id: findProduct.id,
                    user_id: user_id,
                });

                res.status(200).send({
                    success: true,
                    message: 'Product Added to Wishlist',
                    data: {},
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'product already in wishlist',
                    data: null,
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'invalid product id',
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

const getUserWishlist = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { sort, page } = req.query;

        const orderSort = sort === 'oldest' ? 'ASC' : 'DESC';
        const limit = 5;
        const offset = (Number(page ? page : 1) - 1) * limit;

        const dataWishlist = await users.findByPk(user_id, {
            attributes: ['id'],
            include: [
                {
                    model: wishlists,
                    as: 'wishlists',
                    include: [
                        {
                            model: products,
                            include: [
                                {
                                    model: product_images,
                                    where: { is_thumbnail: true },
                                },
                                {
                                    model: colors,
                                },
                            ],
                        },
                    ],
                    order: [['createdAt', orderSort]],
                    offset,
                    limit,
                    separate: true,
                },
            ],
            order: [],
            distinct: true,
        });

        const countTotalWishlists = await wishlists.count({
            where: { user_id },
        });

        const totalPage = Math.ceil(countTotalWishlists / limit);

        res.status(200).send({
            success: true,
            message: 'user wishlists',
            data: dataWishlist,
            totalPage,
            totalProducts: countTotalWishlists,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const removeProductFromWishlist = async (req, res) => {
    try {
        const user_id = req.User.id;
        const { product_id } = req.params;

        const remove = await wishlists.destroy({
            where: { user_id, product_id },
        });

        if (remove) {
            res.status(200).send({
                success: true,
                message: 'product remove from wishlist',
                data: {},
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'product id or user id invalid',
                data: {},
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

module.exports = { addNewWishlist, getUserWishlist, removeProductFromWishlist };
