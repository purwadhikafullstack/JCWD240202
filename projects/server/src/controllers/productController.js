const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const { deleteFiles, deleteFilesPublic } = require('../helper/deleteFiles');
const categories = db.categories;
const products = db.products;
const product_images = db.product_images;
const colors = db.colors;
const product_stocks = db.product_stocks;

const getAllProducts = async (req, res) => {
    try {
        const { page, category, sort, search, color_id } = req.query;

        const paginationLimit = 12;
        const paginationOffset =
            (Number(page ? page : 1) - 1) * paginationLimit;

        let order = [['id', 'ASC']];
        if (sort) {
            if (sort === 'name-asc') {
                order = [['name', 'ASC']];
            } else if (sort === 'name-desc') {
                order = [['name', 'DESC']];
            } else if (sort === 'price-asc') {
                order = [['price', 'ASC']];
            } else if (sort === 'price-desc') {
                order = [['price', 'DESC']];
            } else if (sort === 'newest') {
                order = [['id', 'DESC']];
            } else if (sort === 'oldest') {
                order = [['id', 'ASC']];
            }
        }

        let whereColor = {};
        let whereCat = {};
        if (category) {
            const catQuery = category.replaceAll('%', ' ');

            const findCategory = await categories.findOne({
                where: {
                    name: catQuery,
                },
            });
            whereCat = { id: findCategory.id };
        }
        if (color_id) {
            whereColor = { id: color_id };
        }

        const result = await products.findAndCountAll({
            where: {
                name: { [Op.substring]: [search] },
                is_deleted: false,
            },
            offset: paginationOffset,
            limit: paginationLimit,
            include: [
                { model: categories, where: whereCat },
                { model: colors, where: whereColor },
                { model: product_images, where: { is_thumbnail: true } },
            ],
            order: order,
        });

        if (result) {
            const totalPage = Math.ceil(result.count / paginationLimit);
            res.status(200).send({
                success: true,
                message: 'get data success',
                data: result,
                totalPage,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'no data found',
                data: null,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const findProduct = await products.findOne({
            where: { id: id },
            include: [
                { model: product_images },
                { model: categories },
                { model: colors },
            ],
        });

        if (findProduct) {
            res.status(200).send({
                success: true,
                message: `get product id ${id} success`,
                data: { findProduct },
            });
        } else {
            res.status(404).send({
                success: false,
                message: `product not found`,
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

const addNewProduct = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const data = JSON.parse(req.body.data);
        const findWarehouse = await db.warehouses.findAll();

        if (
            !data.name ||
            !data.category_id ||
            !data.color_id ||
            !data.price ||
            !data.description ||
            !data.length ||
            !data.width ||
            !data.height ||
            !data.weight
        )
            return res.status(406).send({
                success: false,
                message: 'All data required!',
                data: null,
            });

        const checkName = await products.findOne({
            where: {
                name: data.name,
            },
        });

        if (checkName)
            return res.status(406).send({
                success: false,
                message: 'Products name already used!',
                data: null,
            });

        const postProduct = await products.create(
            { ...data },
            { transaction: t },
        );
        const productStock = await findWarehouse.map((value) => {
            return {
                product_id: postProduct.id,
                warehouse_id: value.id,
                stock: 0,
            };
        });
        const createProductStock = await product_stocks.bulkCreate(
            productStock,
            {
                transaction: t,
            },
        );

        const images = await req.files.images.map((value) => {
            return {
                name: value.filename,
                product_id: postProduct.dataValues.id,
            };
        });

        const postProductImages = await product_images.bulkCreate(images, {
            transaction: t,
        });

        await t.commit();

        await product_images.update(
            {
                is_thumbnail: true,
            },
            {
                where: {
                    id: postProductImages[0].dataValues.id,
                    product_id: postProduct.dataValues.id,
                },
            },
            { transaction: t },
        );

        return res.status(200).send({
            success: true,
            message: 'Create new product success!',
            data: { postProduct, postProductImages, createProductStock },
        });
    } catch (error) {
        deleteFiles(req.files.images);
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const editProduct = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const {
            name,
            category_id,
            color_id,
            price,
            description,
            length,
            width,
            height,
            weight,
        } = req.body;

        if (
            !name ||
            !category_id ||
            !color_id ||
            !price ||
            !description ||
            !length ||
            !width ||
            !height ||
            !weight
        )
            return res.status(406).send({
                success: false,
                message: 'All data required!',
                data: null,
            });

        const checkProduct = await products.findOne({
            where: {
                id,
            },
        });

        if (!checkProduct) {
            return res.status(406).send({
                success: false,
                message: 'Data not found!',
                data: null,
            });
        }

        const checkName = await products.findOne({
            where: {
                [Op.not]: [{ id: id }],
                name: name,
            },
        });

        if (checkName) {
            return res.status(406).send({
                success: false,
                message: 'Products name already used!',
                data: null,
            });
        }

        const updateProduct = await products.update(
            {
                name,
                category_id,
                color_id,
                price,
                description,
                length,
                width,
                height,
                weight,
            },
            { where: { id: id } },
            { transaction: t },
        );

        await t.commit();

        return res.status(200).send({
            success: true,
            message: 'Edit data product success!',
            data: { updateProduct },
        });
    } catch (error) {
        await t.rollback();
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const editProductImages = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const recentImage = await product_images.findAll({
            where: {
                product_id: id,
                // is_thumbnail: 0,
            },
        });

        const images = await req.files.images.map((value) => {
            return {
                name: value.filename,
                product_id: id,
            };
        });

        const updateProductImages = await product_images.bulkCreate(images, {
            transaction: t,
        });

        deleteFilesPublic(recentImage);

        const deleteRecent = await recentImage.map((value) => {
            product_images.destroy(
                {
                    where: { name: value?.dataValues.name },
                },
                { transaction: t },
            );
        });

        await t.commit();

        await product_images.update(
            {
                is_thumbnail: true,
            },
            {
                where: {
                    id: updateProductImages[0].dataValues.id,
                    product_id: id,
                },
            },
            { transaction: t },
        );

        return res.status(200).send({
            success: true,
            message: 'Update image product success!',
            data: updateProductImages,
        });
    } catch (error) {
        await t.rollback();
        deleteFiles(req.files?.images);
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const deleteProduct = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const checkData = await products.findOne({
            where: { id: Number(id) },
        });

        if (!checkData)
            return res.status(406).send({
                success: false,
                message: 'Data not found!',
                data: null,
            });

        const result = await products.update(
            {
                is_deleted: true,
            },
            {
                where: { id: checkData.id },
                transaction: t,
            },
        );

        const imageToDelete = await product_images.findAll({
            where: {
                product_id: checkData.id,
                is_thumbnail: 0,
            },
        });

        for (let i = 0; i < imageToDelete.length; i++) {
            const deleteImages = await product_images.destroy({
                where: { id: imageToDelete[i]?.dataValues?.id },
                transaction: t,
            });
        }

        deleteFilesPublic(imageToDelete);

        await t.commit();

        return res.status(200).send({
            success: true,
            message: 'Delete product success!',
            data: { result, imageToDelete },
        });
    } catch (error) {
        await t.rollback();
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const changeThumbnail = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params;

        const setNotThumbnail = await product_images.update(
            {
                is_thumbnail: false,
            },
            {
                where: {
                    product_id: id.product,
                    is_thumbnail: true,
                },
            },
            { transaction: t },
        );
        const setThumbnail = await product_images.update(
            {
                is_thumbnail: true,
            },
            {
                where: {
                    id: id.productImage,
                    product_id: id.product,
                },
            },
            { transaction: t },
        );

        await t.commit();

        return res.status(200).send({
            success: true,
            message: 'Set thumbnail product success!',
            data: { setThumbnail, setNotThumbnail },
        });
    } catch (error) {
        // await t.rollback();
        return res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;

        const findProduct = await products.findOne({
            where: { id: id },
        });

        if (findProduct) {
            const findRecommendation = await products.findAll({
                where: {
                    [Op.not]: [{ id: findProduct.id }],
                    category_id: findProduct.category_id,
                },
                include: [
                    { model: product_images, where: { is_thumbnail: true } },
                ],
                order: Sequelize.literal('rand()'),
                limit: 5,
            });

            res.status(200).send({
                success: true,
                message: 'get recommendation success',
                data: findRecommendation,
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'product not found',
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
    getAllProducts,
    getProductDetails,
    addNewProduct,
    editProduct,
    deleteProduct,
    changeThumbnail,
    getRelatedProducts,
    editProductImages,
};
