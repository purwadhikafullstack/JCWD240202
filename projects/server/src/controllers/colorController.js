const { Op } = require('sequelize');
const db = require('../models');
const color = db.colors;
const { sequelize } = require('../models');

module.exports = {
    getAllColor: async (req, res) => {
        try {
            const result = await color.findAll({
                order: [['name', 'ASC']],
            });
            res.status(200).send({
                success: true,
                message: 'get all colors success',
                data: result,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    addColor: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { name, color_code } = req.body;
            if (!name || !color_code)
                return res.status(404).send({
                    success: false,
                    message: 'All data required!',
                });
            const checkName = await color.findOne({
                where: {
                    [Op.or]: [{ name }, { color_code }],
                },
            });
            if (checkName)
                return res.status(404).send({
                    success: false,
                    message: 'Name or color code already used!',
                });
            const result = await color.create(
                {
                    name: name.toUpperCase(),
                    color_code,
                },
                { transaction: t },
            );
            await t.commit();
            return res.status(200).send({
                success: true,
                message: 'Add new color success!',
                data: result,
            });
        } catch (error) {
            await t.rollback();
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    deleteColor: async (req, res) => {
        try {
            const { id } = req.params;
            const colorCheck = await db.products.findOne({
                where: { color_id: id, is_deleted: false },
            });
            if (colorCheck) {
                return res.status(406).send({
                    success: false,
                    message: 'This color is currently being used!',
                });
            }
            const result = await color.destroy({
                where: { id },
            });
            return res.status(200).send({
                success: true,
                message: 'Delete color success!',
                data: result,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
