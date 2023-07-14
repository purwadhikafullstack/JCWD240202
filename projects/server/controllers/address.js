const db = require('./../models');
const address = db.user_addresses;

module.exports = {
    userAddress: async (req, res) => {
        try {
            console.log('masukkkk');
            const result = await address.findAll({
                where: {
                    user_id: 1,
                },
            });
            return res.status(200).send({
                success: true,
                message: 'Fetch success!',
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
};
