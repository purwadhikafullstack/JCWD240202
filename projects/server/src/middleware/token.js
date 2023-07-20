const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.headers.authorization;

        if (token === null || !token) {
            return res.status(401).send({
                success: false,
                message: 'Token not found!',
                data: null,
            });
        }
        try {
            token = token.split(' ')[1];
            let verifyUser = jwt.verify(token, 'coding-its-easy');

            if (!verifyUser) {
                return res.status(401).send({
                    success: false,
                    message: 'unauthorize',
                    data: null,
                });
            }

            req.User = verifyUser;
            next();
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
