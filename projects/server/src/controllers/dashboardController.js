const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const users = db.users;

const getCustomer = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
        );
        const previousMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1,
        );

        const totalCustomer = await users.count({
            where: { role_id: 1 },
        });

        const newCustomer = await users.count({
            where: { role_id: 1, createdAt: { [Op.gte]: currentMonth } },
        });

        const previousMonthData = await users.count({
            where: {
                role_id: 1,
                createdAt: { [Op.gte]: previousMonth, [Op.lt]: currentMonth },
            },
        });

        res.status(200).send({
            success: true,
            message: 'get total customer success',
            data: { totalCustomer, newCustomer, previousMonthData },
        });
    } catch (error) {
        res.status(500).send({
            success: true,
            message: error.message,
            data: null,
        });
    }
};

module.exports = { getCustomer };
