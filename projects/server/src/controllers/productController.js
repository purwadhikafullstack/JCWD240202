const { sequelize } = require('../models');
const { Op } = require('sequelize');
const db = require('../models');
const { deleteFiles, deleteFilesPublic } = require('../helper/deleteFiles');
const categories = db.categories;
const products = db.products;
const product_images = db.product_images;

const getAllProducts = async (req, res) => {
    try {
        const { page, category, sort, search } = req.query;

        const paginationLimit = 12;
        const paginationOffset =
            (Number(page ? page : 1) - 1) * paginationLimit;

        if (category && sort) {
            const catQuery = category.replaceAll('%', ' ');
            let order = [];
            if (sort === 'name-asc') {
                order = [['name', 'ASC']];
            } else if (sort === 'name-desc') {
                order = [['name', 'DESC']];
            } else if (sort === 'price-asc') {
                order = [['price', 'ASC']];
            } else if (sort === 'price-desc') {
                order = [['price', 'DESC']];
            }

            const findCategory = await categories.findOne({
                where: {
                    name: catQuery,
                },
            });

            if (findCategory) {
                const result = await products.findAndCountAll({
                    where: {
                        category_id: findCategory.id,
                        name: { [Op.substring]: [search] },
                    },
                    offset: paginationOffset,
                    limit: paginationLimit,
                    include: [
                        { model: categories },
                        {
                            model: product_images,
                            where: { is_thumbnail: true },
                        },
                    ],
                    order: order,
                });

                const totalPage = Math.ceil(result.count / paginationLimit);

                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'get all data success',
                        data: result,
                        totalPage: totalPage,
                    });
                } else {
                    res.status(404).send({
                        success: false,
                        message: 'get data failed',
                        data: {},
                    });
                }
            } else {
                res.status(404).send({
                    success: false,
                    message: 'get data failed',
                    data: {},
                });
            }
        } else if (category) {
            const catQuery = category.replaceAll('%', ' ');

            const findCategory = await categories.findOne({
                where: {
                    name: catQuery,
                },
            });

            if (findCategory) {
                const result = await products.findAndCountAll({
                    where: {
                        category_id: findCategory.id,
                        name: { [Op.substring]: [search] },
                    },
                    offset: paginationOffset,
                    limit: paginationLimit,
                    include: [
                        { model: categories },
                        {
                            model: product_images,
                            where: { is_thumbnail: true },
                        },
                    ],
                });

                const totalPage = Math.ceil(result.count / paginationLimit);

                res.status(200).send({
                    success: true,
                    message: `get all products in ${catQuery} categories success`,
                    data: result,
                    totalPage: totalPage,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'no products found',
                    data: null,
                });
            }
        } else if (sort) {
            let order = [];

            if (sort) {
                if (sort === 'name-asc') {
                    order = [['name', 'ASC']];
                } else if (sort === 'name-desc') {
                    order = [['name', 'DESC']];
                } else if (sort === 'price-asc') {
                    order = [['price', 'ASC']];
                } else if (sort === 'price-desc') {
                    order = [['price', 'DESC']];
                }
            }

            const result = await products.findAndCountAll({
                where: { name: { [Op.substring]: [search] } },
                offset: paginationOffset,
                limit: paginationLimit,
                include: [
                    { model: categories },
                    { model: product_images, where: { is_thumbnail: true } },
                ],
                order: order,
            });

            const totalPage = Math.ceil(result.count / paginationLimit);

            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'get all data success',
                    data: result,
                    totalPage: totalPage,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: 'get all data failed',
                    data: {},
                });
            }
        } else {
            const result = await products.findAndCountAll({
                where: { name: { [Op.substring]: [search] } },
                offset: paginationOffset,
                limit: paginationLimit,
                include: [
                    { model: categories },
                    { model: product_images, where: { is_thumbnail: true } },
                ],
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
            include: [{ model: product_images }, { model: categories }],
        });

        if (findProduct) {
            res.status(200).send({
                success: true,
                message: `get product id ${id} success`,
                data: findProduct,
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

        const checkName = await products.findOne({
            where: {
                name,
            },
        });

        if (checkName)
            return res.status(406).send({
                success: false,
                message: 'Products name already used!',
                data: null,
            });

        const postProduct = await products.create(
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
            { transaction: t },
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

        // console.log(postProductImages[0].dataValues.id, 'masuk masukkkkkkk');

        // if (postProductImages) {

        //     await product_images.update(
        //         {
        //             is_thumbnail: 1,
        //         },
        //         {
        //             where: {
        //                 id: postProductImages[0].dataValues.id,
        //                 product_id: postProduct.dataValues.id,
        //             }
        //         },
        //     );
        // }
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
            data: { postProduct, postProductImages },
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
        const data = JSON.parse(req.body.data);
        console.log(data, id, req.files.images);

        if (!data)
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
            deleteFiles(req.files?.images);
            return res.status(406).send({
                success: false,
                message: 'Data not found!',
                data: null,
            });
        }

        const checkName = await products.findOne({
            where: {
                name: data.name,
            },
        });

        if (checkName) {
            deleteFiles(req.files?.images);
            return res.status(406).send({
                success: false,
                message: 'Products name already used!',
                data: null,
            });
        }

        const updateProduct = await products.update(
            { ...data },
            { where: { id: id } },
            { transaction: t },
        );

        const recentImage = await product_images.findAll({
            where: {
                product_id: id,
                // is_thumbnail: 0,
            },
        });
        console.log(recentImage, 'ini diaaaaaaa');

        const images = await req.files.images.map((value) => {
            return {
                name: value.filename,
                product_id: id,
            };
        });
        console.log(images.length, 'iniiii <<<<<<<<<<<');

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

        return res.status(200).send({
            success: true,
            message: 'Edit product success!',
            data: { updateProduct, updateProductImages, deleteRecent },
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
            where: { id },
        });

        if (!checkData)
            return res.status(406).send({
                success: false,
                message: 'Data not found!',
                data: null,
            });

        const result = await products.destroy(
            {
                where: { id },
            },
            { transaction: t },
        );

        const imageToDelete = await product_images.findAll({
            where: {
                product_id: id,
                // is_thumbnail: 0,
            },
        });

        await imageToDelete.map((value) => {
            product_images.destroy(
                {
                    where: { name: value?.dataValues.name },
                },
                { transaction: t },
            );
        });

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
        console.log(id);

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

module.exports = {
    getAllProducts,
    getProductDetails,
    addNewProduct,
    editProduct,
    deleteProduct,
    changeThumbnail,
};
