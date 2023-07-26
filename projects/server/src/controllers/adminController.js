const { hashPassword } = require('../lib/hashBcrypt');
const db = require('../models');
const user = db.users;
const warehouses = db.warehouses;
const role = db.roles;
const { sequelize } = require('./../models');
const { Op } = require('sequelize');

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

module.exports = {
    getDataAdmin: async (req, res) => {
        try {
            let order = [['createdAt', 'DESC']];
            let where = { role_id: 2 };
            const { page, sort, search, warehouse } = req.query;

            const paginationLimit = 5;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;

            if (sort) {
                if (sort === 'name-asc') {
                    order = [['first_name', 'ASC']];
                } else if (sort === 'name-desc') {
                    order = [['first_name', 'DESC']];
                }
            }

            if (search) {
                where = {
                    role_id: 2,
                    first_name: { [Op.like]: `%${search}%` },
                };
            }

            if (warehouse) {
                const warehouseId = await warehouses.findOne({
                    where: {
                        city: warehouse,
                    },
                });
                where['id'] = warehouseId.user_id;
            }

            const result = await user.findAndCountAll({
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone_number',
                    'role_id',
                    'createdAt',
                ],
                where,
                offset: paginationOffset,
                limit: paginationLimit,
                include: { all: true },
                order,
            });

            const totalPage = Math.ceil(result.count / paginationLimit);

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: result,
                totalPage: totalPage,
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
            const { first_name, last_name, phone_number } = req.body;

            if (!first_name || !last_name || !phone_number) {
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
            const checkWarehouseAdmin = await warehouses.findOne({
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

                const updateWarehouseStatus = await warehouses.update(
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
