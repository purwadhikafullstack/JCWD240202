const db = require('../models');
const categories = db.categories;
const products = db.products;
const product_images = db.product_images;

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
            order: [['id', 'DESC']],
            limit: 12,
            include: [
                {
                    model: product_images,
                    where: { is_thumbnail: true },
                },
            ],
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
            order: [['id', 'ASC']],
            limit: 5,
            include: [
                {
                    model: product_images,
                    where: { is_thumbnail: true },
                },
            ],
        });

        if (bestSeller) {
            res.status(200).send({
                success: true,
                message: 'get new products success',
                data: bestSeller,
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

module.exports = {
    getAllCategories,
    getNewArrivals,
    getBestSeller,
};
