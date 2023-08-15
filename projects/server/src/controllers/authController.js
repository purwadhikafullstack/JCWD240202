const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
const fs = require('fs');
const transporter = require('../helper/nodemailer');
const { hashPassword, hashCompare } = require('../lib/hashBcrypt');
const path = require('path');

const db = require('../models');
const user = db.users;

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

module.exports = {
    registration: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email)
                return res.status(400).send({
                    success: false,
                    message: 'Email is required',
                    data: null,
                });

            const result = await user.findOne({
                where: {
                    email,
                },
            });

            if (result) {
                return res.status(406).send({
                    success: false,
                    message: 'Email has already used!',
                    data: null,
                });
            } else {
                const result = await user.create({
                    email,
                });

                const data = await fs.readFileSync(
                    path.resolve(
                        '../server/src/email_template',
                        'activation.html',
                    ),
                    { encoding: 'utf-8' },
                );

                let payload = {
                    id: result.id,
                    email: result.email,
                    is_verified: false,
                };
                const token = jwt.sign(payload, 'coding-its-easy');
                await user.update(
                    {
                        token_verification: token,
                    },
                    {
                        where: {
                            id: result.id,
                        },
                    },
                );

                const tempCompile = await handlebars.compile(data);
                const tempResult = tempCompile({
                    email: email,
                    link: `http://localhost:3000/verification/${token}`,
                });
                await transporter.sendMail({
                    from: 'Admin',
                    to: 'jcwd2402@gmail.com',
                    subject: 'Verification Account',
                    html: tempResult,
                });
                return res.status(201).send({
                    success: true,
                    message:
                        'Resgister success! Check your email to verification!',
                    data: null,
                });
            }
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    verification: async (req, res) => {
        try {
            const { password, confirmPassword } = req.body;
            const uid = req.User.id;

            if (!password || !confirmPassword)
                return res.status(400).send({
                    success: false,
                    message: 'Password and confirm password are required!',
                    data: null,
                });

            if (pattern.test(password) == false) {
                return res.status(406).send({
                    success: false,
                    message:
                        'Password must be 8 characters, 1 uppercase, 1 lowercase and 1 number!',
                    data: null,
                });
            }

            if (password != confirmPassword) {
                return res.status(406).send({
                    success: false,
                    message: "Password doesn't match",
                    data: null,
                });
            }

            const isVerif = await user.findOne({
                where: {
                    id: uid,
                    is_verified: true,
                },
            });

            if (isVerif)
                return res.status(401).send({
                    success: false,
                    message: 'Your account has been verified',
                    data: null,
                });

            const result = await user.update(
                {
                    password: await hashPassword(password),
                    is_verified: true,
                    token_verification: false,
                },
                {
                    where: {
                        id: uid,
                    },
                },
            );
            return res.status(200).send({
                success: true,
                message: 'Verification success!',
                data: result,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(400).send({
                    success: false,
                    message: 'Email and password are required!',
                    data: null,
                });

            const result = await user.findOne({
                where: {
                    email,
                },
            });
            if (!result)
                return res.status(404).send({
                    success: false,
                    message: 'Wrong email or password!',
                    data: null,
                });

            const isUser = await hashCompare(password, result.password);
            if (!isUser)
                return res.status(404).send({
                    success: false,
                    message: 'Wrong email or password!',
                    data: null,
                });

            let payload = {
                id: result.id,
                email: result.email,
                is_verified: result.is_verified,
            };
            const token = jwt.sign(payload, 'coding-its-easy', {
                expiresIn: '1d',
            });

            res.status(200).send({
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
    reqForgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            const result = await user.findOne({
                where: {
                    email: email,
                },
            });

            if (!result)
                return res.status(404).send({
                    success: false,
                    message: 'Email not found!',
                    data: null,
                });

            const data = await fs.readFileSync(
                './email_template/resetPassword.html',
                'utf-8',
            );

            let payload = {
                id: result.id,
                email: result.email,
                is_verified: result.is_verified,
            };
            const token = jwt.sign(payload, 'coding-its-easy');
            await user.update(
                {
                    token_password: token,
                },
                {
                    where: {
                        id: result.id,
                    },
                },
            );

            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile({
                email: email,
                link: `http://localhost:3000/reset-password/${token}`,
            });
            await transporter.sendMail({
                from: 'Admin',
                to: 'jcwd2402@gmail.com',
                subject: 'Verification Account',
                html: tempResult,
            });
            return res.status(201).send({
                success: true,
                message: 'Check your email to reset your password!',
                data: null,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { password, confirmPassword } = req.body;
            const uid = req.User.id;

            if (!password || !confirmPassword)
                return res.status(400).send({
                    success: false,
                    message: 'Password and confirm password are required!',
                    data: null,
                });

            if (pattern.test(password) == false) {
                return res.status(406).send({
                    success: false,
                    message:
                        'Password must be 8 characters, 1 uppercase, 1 lowercase and 1 number!',
                    data: null,
                });
            }

            if (password != confirmPassword) {
                return res.status(406).send({
                    success: false,
                    message: "Password doesn't match",
                    data: null,
                });
            }

            const checkRequest = await user.findOne({
                where: {
                    id: uid,
                    token_password: '0',
                },
            });
            if (checkRequest)
                return res.status(401).send({
                    success: false,
                    message:
                        'Password reset may only be done once per request!',
                    data: null,
                });

            const result = await user.update(
                {
                    password: await hashPassword(password),
                    token_password: false,
                },
                {
                    where: {
                        id: uid,
                    },
                },
            );

            return res.status(200).send({
                success: true,
                message: 'Reset password success!!',
                data: result,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
