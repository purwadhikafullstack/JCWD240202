const axios = require('axios');

// axios.defaults.baseUrl = 'https://api.rajaongkir.com/starter/province';
// axios.defaults.headers.common['key'] = `${process.env.RO_API_KEY}`;
// axios.defaults.headers.post['Content-Type'] =
//     'application/x-www-form-urlencoded';

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
            console.log('provinces', dataProvinces);

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
            console.log('cities', dataCities);

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
