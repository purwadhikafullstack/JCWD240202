const jwt = require('jsonwebtoken');
const db = require('../models');
const user = db.users;
const { sequelize } = require('./../models');
const { hashCompare, hashPassword } = require('../lib/hashBcrypt');
const { googleRecaptcha } = require('./../helper/recaptcha');

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({
                    sucess: false,
                    message: 'Email and password are required!',
                    data: null,
                });
            }

            const result = await user.findOne({
                where: {
                    email,
                },
                include: [
                    {
                        model: db.warehouses,
                        attributes: [
                            'id',
                            'user_id',
                            'city',
                            'city_id',
                            'is_deleted',
                        ],
                    },
                ],
            });

            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: 'Wrong email or password!',
                    data: null,
                });
            }

            if (result.role_id === 1) {
                return res.status(404).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            if (result.role_id === 2 && result.warehouse === null) {
                return res.status(404).send({
                    success: false,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            const isAdmin = await hashCompare(password, result.password);
            if (!isAdmin) {
                return res.status(404).send({
                    success: false,
                    message: 'Wrong email or password!',
                    data: null,
                });
            }

            let payload = {
                id: result.id,
                email: result.email,
                role_id: result.role_id,
            };

            const token = jwt.sign(payload, 'coding-its-easy', {
                expiresIn: '1d',
            });

            return res.status(200).send({
                success: true,
                message: 'Login Success!',
                data: { token },
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    register: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const {
                first_name,
                last_name,
                email,
                phone_number,
                password,
                confirm_password,
                tokenRecaptcha,
            } = req.body;

            if (
                !first_name ||
                !last_name ||
                !email ||
                !phone_number ||
                !password ||
                !confirm_password
            ) {
                return res.status(400).send({
                    sucess: false,
                    message: "Field can't be Empty",
                    data: null,
                });
            }

            const checkEmail = await db.users.findOne({
                where: {
                    email,
                },
            });

            if (checkEmail) {
                return res.status(406).send({
                    success: false,
                    message: "Email is Already Used!",
                    data: null,
                });
            }

            if (pattern.test(password) === false) {
                return res.status(406).send({
                    success: false,
                    message:
                        'Password must be 8 characters, 1 uppercase, 1 lowercase and 1 number!',
                    data: null,
                });
            }

            if (password != confirm_password) {
                return res.status(406).send({
                    success: false,
                    message: "Password doesn't match",
                    data: null,
                });
            }

            if (phone_number.match(/[a-zA-Z]/) || phone_number.length < 12) {
                return res.status(406).send({
                    success: false,
                    message: 'Invalid phone number!',
                    data: null,
                });
            }

            const result = await user.findOne({
                where: {
                    email,
                },
            });

            const verifyRecaptcha = await googleRecaptcha(tokenRecaptcha);

            if (!verifyRecaptcha)
                return res.status(400).send({
                    success: false,
                    message: "You're not a Human, Please try again!",
                    data: null,
                });

            if (result) {
                return res.status(406).send({
                    success: false,
                    message: 'Email has already used!',
                    data: null,
                });
            } else {
                const createPassword = await hashPassword(password);

                const registerAdmin = await user.create(
                    {
                        first_name,
                        last_name,
                        email,
                        phone_number,
                        password: createPassword,
                        role_id: 2,
                    },
                    { transaction: t },
                );
            }

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Register success!',
                data: {},
            });
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
