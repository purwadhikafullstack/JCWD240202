const { sequelize } = require('../models');
const db = require('../models');
const categories = db.categories;
const { deleteSingleFile } = require('./../helper/deleteFiles');

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const findCategories = await categories.findAll({
                attributes: ['id', 'name', 'image'],
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
            const { name } = req.body;
            const image = req.files?.images[0]?.filename;

            if (!name || !image)
                return res.status(406).send({
                    success: false,
                    message: 'Name and image are required!',
                    data: null,
                });

            const checkName = await categories.findOne({
                where: {
                    name,
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
                    name,
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
            const image = req.files?.images[0]?.filename;
            console.log(Number(id));
            console.log(name);
            console.log(image);

            if (!name || !image) {
                deleteSingleFile(req.files?.images[0]?.path);
                return res.status(406).send({
                    success: false,
                    message: 'Name and image are required!',
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
                    image,
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

            const checkData = await categories.findOne({
                where: {
                    id,
                },
            });

            if (!checkData)
                return res.status(406).send({
                    success: false,
                    message: 'Data not found!',
                    data: null,
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
};
