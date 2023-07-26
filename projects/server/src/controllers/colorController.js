const db = require('../models');
const color = db.colors;

module.exports = {
    getAllColor: async(req, res) => {
        try {
            const result = await color.findAll()
            res.status(200).send({
                success: true,
                message: 'get all categories success',
                data: result,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    }
}