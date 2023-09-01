const { Op } = require('sequelize');
const { sequelize } = require('../models');
const db = require('../models');
const categories = db.categories;
const products = db.products;
const product_images = db.product_images;
const colors = db.colors;
const { deleteSingleFile } = require('./../helper/deleteFiles');

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const findCategories = await categories.findAll({
                attributes: ['id', 'name', 'image'],
                order: [['name', 'ASC']],
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
    },
    addCategory: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const data = JSON.parse(req.body.data);
            const image = req.files?.images[0]?.filename;

            if (!data.name || !image)
                return res.status(406).send({
                    success: false,
                    message: 'Name and image are required!',
                    data: null,
                });

            const checkName = await categories.findOne({
                where: {
                    name: data.name,
                },
            });

            if (checkName)
                return res.status(406).send({
                    success: false,
                    message: 'Category name already used!',
                    data: null,
                });

            const result = await categories.create(
                {
                    name: data.name,
                    image,
                },
                { transaction: t },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Create new category success!',
                data: result,
            });
        } catch (error) {
            await t.rollback();
            deleteSingleFile(req.files?.images[0]?.path);
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    editCategory: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { name } = req.body;
            // const image = req.files?.images[0]?.filename;

            if (!name) {
                // deleteSingleFile(req.files?.images[0]?.path);
                return res.status(406).send({
                    success: false,
                    message: 'Name are required!',
                    data: null,
                });
            }

            const data = await categories.findOne({
                where: {
                    id,
                },
            });

            if (!data)
                return res.status(406).send({
                    success: false,
                    message: 'Data not found',
                    data: null,
                });

            const checkName = await categories.findOne({
                where: {
                    name,
                    [Op.not]: [{ id: id }],
                },
            });

            if (checkName)
                return res.status(406).send({
                    success: false,
                    message: 'Category name already used!',
                    data: null,
                });

            const result = await categories.update(
                {
                    name,
                },
                {
                    where: {
                        id: Number(id),
                    },
                },
                {
                    transaction: t,
                },
            );

            // deleteSingleFile(`src/public/images/${data?.image}`);

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Update category success!',
                data: result,
            });
        } catch (error) {
            await t.rollback();
            // deleteSingleFile(req.files?.images[0]?.path);
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    editImageCategory: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;

            const data = await categories.findOne({
                where: {
                    id,
                },
            });

            if (!data)
                return res.status(406).send({
                    success: false,
                    message: 'Data not found',
                    data: null,
                });

            const result = await categories.update(
                {
                    image: req.files?.images[0]?.filename,
                },
                {
                    where: {
                        id: id,
                    },
                },
                {
                    transaction: t,
                },
            );

            deleteSingleFile(`src/public/images/${data?.image}`);

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Update category success!',
                data: result,
            });
        } catch (error) {
            await t.rollback();
            deleteSingleFile(req.files?.images[0]?.path);
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    deleteCategory: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;

            const checkData = await db.products.findOne({
                where: {
                    category_id: id,
                    is_deleted: false,
                },
            });

            if (checkData)
                return res.status(406).send({
                    success: false,
                    message: 'This category is currently being used!',
                });

            const result = await categories.destroy(
                {
                    where: {
                        id,
                    },
                },
                { transaction: t },
            );

            if (result) {
                deleteSingleFile(`src/public/images/${checkData.image}`);
            }

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Delete category success!',
                data: result,
            });
        } catch (error) {
            await t.rollback();
            deleteSingleFile(req.files?.images[0]?.path);
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    getDetailCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { page, colorId } = req.query;

            const checkId = await categories.findOne({ where: { id: id } });
            let where = {};
            if (colorId) {
                where = { id: colorId };
            }

            if (checkId) {
                const paginationLimit = 8;
                const paginationOffset =
                    (Number(page ? page : 1) - 1) * paginationLimit;

                const getData = await categories.findOne({
                    where: { id: checkId.id },
                    include: [
                        {
                            model: products,
                            as: 'products',
                            limit: paginationLimit,
                            offset: paginationOffset,
                            include: [
                                {
                                    model: product_images,
                                    where: { is_thumbnail: true },
                                },
                                {
                                    model: colors,
                                    where,
                                },
                            ],
                        },
                    ],
                });

                const count = await products.count({
                    where: { category_id: checkId.id },
                    include: [{ model: colors, where }],
                    distinct: true,
                });

                const totalPage = Math.ceil(count / paginationLimit);

                res.status(200).send({
                    success: true,
                    message: 'get category products success',
                    data: getData,
                    totalPage,
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'invalid category id',
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
    },
};
