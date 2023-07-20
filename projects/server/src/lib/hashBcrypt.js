const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: async (password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            console.log(error);
            return null
        }
    },

    hashCompare: async (inputPassword, dbPassword) => {
        try {
            let match = await bcrypt.compare(inputPassword, dbPassword);
            return match;
        } catch (error) {
            return false;
        }
    },
};
