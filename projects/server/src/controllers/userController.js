const { sequelize } = require('../models');

const bcrypt = require('bcrypt');
const db = require('../models');
const { deleteSingleFile } = require('./../helper/deleteFiles');

const user = db.users;

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

module.exports = {
    keepLogin: async (req, res) => {
        try {
            const { id } = req.User;

            const result = await user.findOne({
                attributes: {
                    exclude: [
                        'password',
                        'token_verification',
                        'token_password',
                        'token_edit_email',
                        'createdAt',
                        'updatedAt',
                    ],
                },
                where: {
                    id,
                },
                include: { all: true },
            });

            if (result) {
                return res.status(200).send({
                    success: true,
                    message: 'Fetch Success!',
                    data: result,
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
    editProfile: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id, is_verified } = req.User;
            const { first_name, last_name, phone_number, birth_date } =
                req.body;

            if (is_verified === false) {
                return res.status(401).send({
                    success: false,
                    message: 'Not authorized!',
                    data: null,
                });
            }

            if (!first_name || !last_name || !phone_number || !birth_date) {
                return res.status(400).send({
                    success: false,
                    message: "Field can't be Empty",
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

            const updateProfile = await user.update(
                {
                    first_name,
                    last_name,
                    phone_number,
                    birth_date,
                },
                {
                    where: {
                        id,
                    },
                    transaction: t,
                },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Update profile success!',
                data: updateProfile,
            });
        } catch (error) {
            await t.rollback();
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    editProfilePicture: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.User;

            const result = await user.findOne({
                where: {
                    id,
                },
                transaction: t,
            });

            const updateImage = await user.update(
                {
                    profile_picture: req.files.images[0].filename,
                },
                {
                    where: {
                        id,
                    },
                    transaction: t,
                },
            );

            if (updateImage[0] === 0) {
                return res.status(400).send({
                    success: false,
                    message: 'Update profile picture failed!',
                    data: null,
                });
            }

            deleteSingleFile(`src/public/images/${result.profile_picture}`);

            await t.commit();

            return res.status(201).send({
                success: true,
                message: 'Update profile picture success!',
                data: null,
            });
        } catch (error) {
            await t.rollback();
            deleteSingleFile(req.files.images[0].path);
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    changePassword: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.User;
            const { prev_password, new_password, confirm_password } = req.body;

            const result = await user.findOne({
                where: {
                    id,
                },
                transaction: t,
            });

            const checkPassword = await bcrypt.compare(
                prev_password,
                result.password,
            );

            if (checkPassword === false) {
                return res.status(400).send({
                    success: false,
                    message: 'Please input the correct password!',
                    data: null,
                });
            }

            if (prev_password === new_password) {
                return res.status(400).send({
                    success: false,
                    message:
                        "New password can't be the same as your old password!",
                    data: null,
                });
            }

            if (!prev_password || !new_password || !confirm_password) {
                return res.status(400).send({
                    success: false,
                    message: "Field can't be empty",
                    data: null,
                });
            }

            if (pattern.test(new_password) === false) {
                return res.status(406).send({
                    success: false,
                    message:
                        'Password must be 8 characters, 1 uppercase, 1 lowercase and 1 number!',
                    data: null,
                });
            }

            if (new_password !== confirm_password) {
                return res.status(400).send({
                    success: false,
                    message: "Password doesn't match",
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(new_password, salt);

            const changePassword = await user.update(
                {
                    password: hashPassword,
                },
                {
                    where: {
                        id,
                    },
                    transaction: t,
                },
            );

            if (changePassword[0] === 0) {
                return res.status(400).send({
                    success: false,
                    message: 'Update password failed!',
                    data: null,
                });
            }

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Update password success!',
                data: changePassword,
            });
        } catch (error) {
            await t.rollback();
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
