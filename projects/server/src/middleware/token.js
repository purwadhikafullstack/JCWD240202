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
                message: error.message === "jwt expired"? "Expired, you must re-login!" : error.message,
                data: null,
            });
        }
    },
    checkAdminRole: async (req, res, next) => {
        if (req.User.role_id === 3) {
            return next();
        }

        return res.status(401).send({
            success: false,
            message: 'Unauthorized!',
            data: null,
        });
    },
    checkUserRole: async (req, res, next) => {
        if (req.User.role_id === 2 || req.User.role_id === 3) {
            return next();
        }

        return res.status(401).send({
            success: false,
            message: 'Unauthorized!',
            data: null,
        });
    },
    checkWhAdminRole: async (req, res, next) => {
        if (req.User.role_id === 2) {
            return next();
        }

        return res.status(401).send({
            success: false,
            message: 'Unauthorized!',
            data: null,
        });
    },
};
