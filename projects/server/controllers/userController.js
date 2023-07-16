const { sequelize } = require('../models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
const fs = require('fs');
const transporter = require('../helper/nodemailer');
const db = require('../models');
const deleteFiles = require('./../helper/deleteFiles');

const user = db.users;

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

module.exports = {
    keepLogin: async (req, res) => {
        try {
            const { id } = req.User;
            console.log(id);

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
            const { first_name, last_name, email, phone_number, birth_date } =
                req.body;
            const images = req.files.images;

            console.log(id, is_verified);
            console.log(first_name, last_name, email, phone_number, birth_date);
            console.log(req.files.images);
            console.log(images);
            console.log(images[0].path);

            if (is_verified === false) {
                {deleteFiles(req.files.images)}
                return res.status(401).send({
                    success: false,
                    message: 'Not authorized!',
                    data: null,
                });
            }
            const checkUser = await user.findOne({
                where: {
                    id,
                },
            });

            if (
                !first_name ||
                !last_name ||
                !email ||
                !phone_number ||
                !birth_date ||
                images < 1
            ) {
                {deleteFiles(req.files.images)}
                return res.status(400).send({
                    success: false,
                    message: 'Please fill out the form!',
                    data: null,
                });
            }

            const updateProfile = await user.update(
                {
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    birth_date,
                    profile_picture: images[0].path,
                },
                {
                    where: {
                        id,
                    },
                },
                { transaction: t },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Update profile success!',
                data: updateProfile,
            });
        } catch (error) {
            deleteFiles(req.files.images);
            return res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
