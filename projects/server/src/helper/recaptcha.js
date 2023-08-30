const axios = require('axios');

module.exports = {
    googleRecaptcha: async (tokenRecaptcha) => {
        try {
            const Recaptcha = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_API_KEY}&response=${tokenRecaptcha}`,
            );

            return Recaptcha.data.success
        } catch (error) {
            console.log(error);
        }
    },
};
