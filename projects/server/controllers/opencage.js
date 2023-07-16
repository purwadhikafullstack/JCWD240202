const axios = require('axios');

module.exports = {
    getLatLong: async (req, res) => {
        const { city } = req.query;

        try {
            const latLong = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.OC_API_KEY}`,
            );

            const latitude = latLong.data.results[0].geometry.lat;
            const longitude = latLong.data.results[0].geometry.lng;
            console.log(latitude);
            console.log(longitude);
            return res.status(200).send({ latitude, longitude });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
