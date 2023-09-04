const axios = require('axios');

module.exports = {
    googleRecaptcha: async (tokenRecaptcha) => {
        try {
            const Recaptcha = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify?secret=6LeDOeYnAAAAAGrV2Jd0n48Oq57Qu-Q2E29A7aub&response=${tokenRecaptcha}`,
            );

            return Recaptcha.data.success
        } catch (error) {
            console.log(error);
        }
    },
};
