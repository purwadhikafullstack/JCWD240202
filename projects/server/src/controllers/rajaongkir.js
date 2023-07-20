const axios = require('axios');

module.exports = {
    getProvinces: async (req, res) => {
        try {
            const getData = await axios.get(
                'https://api.rajaongkir.com/starter/province',
                {
                    headers: {
                        key: `${process.env.RO_API_KEY}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );
            const dataProvinces = getData.data.rajaongkir.results;

            return res.status(200).send(dataProvinces);
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    getCities: async (req, res) => {
        try {
            const getData = await axios.get(
                'https://api.rajaongkir.com/starter/city',
                {
                    headers: {
                        key: `${process.env.RO_API_KEY}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );
            const dataCities = getData.data.rajaongkir.results;

            return res.status(200).send(dataCities);
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
