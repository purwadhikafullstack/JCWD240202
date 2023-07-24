const { hashPassword } = require('../lib/hashBcrypt');
const db = require('../models');
const user = db.users;
const warehouse = db.warehouses;
const role = db.roles;
const { sequelize } = require('./../models');

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

module.exports = {
    getDataAdmin: async (req, res) => {
        try {
            const result = await user.findAll({
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'birth_date',
                    'role_id',
                ],
                where: { role_id: 2 },
                include: { all: true },
            });

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
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
    editDataAdmin: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { first_name, last_name, phone_number, birth_date } =
                req.body;

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

            const updateDataAdmin = await user.update(
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
                },
                { transaction: t },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Update profile success!',
                data: updateDataAdmin,
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
    changePasswordAdmin: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { new_password, confirm_password } = req.body;

            if (!new_password || !confirm_password) {
                return res.status(400).send({
                    success: false,
                    message: "Field can't be empty",
                    data: null,
                });
            }

            if (
                pattern.test(new_password) === false ||
                pattern.test(confirm_password) === false
            ) {
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

            const newPass = await hashPassword(new_password);

            const changePass = await user.update(
                {
                    password: newPass,
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
                message: 'Change password success!',
                data: changePass,
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
    deleteAdmin: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const checkWarehouseAdmin = await warehouse.findOne({
                where: {
                    user_id: id,
                },
            });

            if (checkWarehouseAdmin) {
                const deleteData = await user.destroy(
                    {
                        where: {
                            id,
                        },
                    },
                    { transaction: t },
                );

                const updateWarehouseStatus = await warehouse.update(
                    {
                        user_id: null,
                    },
                    {
                        where: {
                            user_id: id,
                        },
                    },
                    { transaction: t },
                );
                await t.commit();

                return res.status(200).send({
                    success: true,
                    message: 'Admin deleted!',
                    data: updateWarehouseStatus,
                });
            } else {
                const deleteDataAdmin = await user.destroy(
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
                    message: 'Admin deleted!',
                    data: deleteDataAdmin,
                });
            }
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
