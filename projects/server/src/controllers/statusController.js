const db = require('../models');

module.exports = {
    getAllStatus: async (req, res) => {
        try {
            const result = await db.statuses.findAll({})
            return res.status(200).send({
                success: true,
                message: 'fetch success!',
                data: result,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    }
}