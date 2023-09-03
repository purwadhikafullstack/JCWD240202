const { create } = require('handlebars');
const db = require('../models');
const mutation = db.mutations;
const { sequelize } = require('./../models');
const { Op } = require('sequelize');

module.exports = {
    getProductListMutation: async (req, res) => {
        try {
            let name = '';
            const { warehouse_id, search } = req.body;

            if (search) {
                name = { [Op.substring]: [search] };
            }

            const productList = await db.product_stocks.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                where: {
                    warehouse_id: warehouse_id,
                },
                include: [
                    {
                        model: db.products,
                        attributes: [
                            'id',
                            'name',
                            'category_id',
                            'color_id',
                            'is_deleted',
                        ],
                        where: {
                            name,
                            is_deleted: false,
                        },
                        include: [
                            {
                                model: db.categories,
                                attributes: ['name'],
                            },
                        ],
                    },
                    {
                        model: db.warehouses,
                        attributes: ['user_id', 'city'],
                    },
                ],
            });

            if (productList.length > 0) {
                return res.status(200).send({
                    success: true,
                    message: 'Fetch Success!',
                    data: productList,
                });
            } else {
                return res.status(204).send({
                    success: false,
                    message: 'Not Found!',
                    data: null,
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    requestMutation: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const {
                product_id,
                warehouse_origin_id,
                warehouse_destination_id,
                stock,
                quantity,
            } = req.body;
            const { id } = req.User;

            const checkWh = await db.warehouses.findAll({
                where: {
                    [Op.or]: [
                        { id: warehouse_origin_id },
                        { id: warehouse_destination_id },
                    ],
                },
            });

            const checkAdminWh = await db.warehouses.findOne({
                where: {
                    user_id: id,
                },
            });

            if (checkAdminWh.id != warehouse_origin_id) {
                return res.status(401).send({
                    success: true,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            if (checkWh.length < 2) {
                return res.status(400).send({
                    success: true,
                    message: 'Warehouse Not Found!',
                    data: null,
                });
            }

            if (warehouse_origin_id === warehouse_destination_id) {
                return res.status(401).send({
                    success: true,
                    message: 'Unauthorized!',
                    data: null,
                });
            }

            const checkProduct = await db.products.findOne({
                where: {
                    id: product_id,
                },
            });

            if (!checkProduct) {
                return res.status(400).send({
                    success: true,
                    message: 'Product Not Found!',
                    data: null,
                });
            }

            if (quantity > stock) {
                return res.status(400).send({
                    success: false,
                    message: 'Not Enough Stock!',
                    data: null,
                });
            }

            const createMutation = await mutation.create(
                {
                    product_id,
                    warehouse_origin_id,
                    user_id: id,
                },
                { transaction: t },
            );

            const createMutationDetails = await db.mutation_details.create(
                {
                    warehouse_destination_id,
                    mutation_id: createMutation.id,
                    quantity,
                },
                { transaction: t },
            );

            await t.commit();

            return res.status(200).send({
                success: true,
                message: 'Request Mutation Sent!',
                data: {
                    mutations: createMutation,
                    mutation_details: createMutationDetails,
                },
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
    confirmMutation: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { mutation_id } = req.params;
            const { id } = req.User;

            const checkMutation = await mutation.findOne({
                where: {
                    id: mutation_id,
                },
            });

            const checkMutationDetail = await db.mutation_details.findOne({
                where: {
                    mutation_id,
                },
            });

            if (checkMutation && checkMutationDetail) {
                const checkWhAdmin = await db.warehouses.findOne({
                    where: {
                        user_id: id,
                    },
                });

                if (
                    checkWhAdmin.id !=
                        checkMutationDetail.warehouse_destination_id ||
                    id == checkMutation.user_id
                ) {
                    return res.status(404).send({
                        success: false,
                        message: 'Unauthorized!',
                        data: null,
                    });
                }

                // Update column is_approved di Mutations
                const confMutation = await mutation.update(
                    {
                        is_approved: true,
                    },
                    { where: { id: mutation_id } },
                    { transaction: t },
                );

                if (confMutation) {
                    // find Destination Stock
                    const checkDestinationStock =
                        await db.product_stocks.findOne({
                            where: {
                                product_id: checkMutation.product_id,
                                warehouse_id:
                                    checkMutationDetail.warehouse_destination_id,
                            },
                        });

                    // find Origin stock
                    const checkOriginStock = await db.product_stocks.findOne({
                        where: {
                            product_id: checkMutation.product_id,
                            warehouse_id: checkMutation.warehouse_origin_id,
                        },
                    });

                    // Kurangin Stock ke Warehouse Destination
                    const updateDestination = await db.product_stocks.update(
                        {
                            stock:
                                Number(checkDestinationStock.stock) -
                                Number(checkMutationDetail.quantity),
                        },
                        {
                            where: {
                                product_id: checkMutation.product_id,
                                warehouse_id:
                                    checkMutationDetail.warehouse_destination_id,
                            },
                        },
                        { transaction: t },
                    );

                    // Tambahin stock ke warehouse origin
                    const updateOrigin = await db.product_stocks.update(
                        {
                            stock:
                                Number(checkOriginStock.stock) +
                                Number(checkMutationDetail.quantity),
                        },
                        {
                            where: {
                                product_id: checkOriginStock.product_id,
                                warehouse_id: checkMutation.warehouse_origin_id,
                            },
                        },
                        { transaction: t },
                    );

                    // Update Stock Histories Wh Destination
                    const stockHistoriesDestination =
                        await db.stock_histories.create(
                            {
                                product_id: checkMutation.product_id,
                                quantity: checkMutationDetail.quantity,
                                mutation_id: Number(mutation_id),
                                user_id: id,
                                type_id: 2,
                                information_id: 3,
                                warehouse_id:
                                    checkMutationDetail.warehouse_destination_id,
                            },
                            { transaction: t },
                        );

                    // Update Stock Histories Wh Origin
                    const stockHistoriesOrigin =
                        await db.stock_histories.create(
                            {
                                product_id: checkMutation.product_id,
                                quantity: checkMutationDetail.quantity,
                                mutation_id: Number(mutation_id),
                                user_id: checkMutation.user_id,
                                type_id: 1,
                                information_id: 3,
                                warehouse_id: checkMutation.warehouse_origin_id,
                            },
                            { transaction: t },
                        );

                    await t.commit();

                    return res.status(200).send({
                        success: true,
                        message: 'Mutation Confirmed!',
                        data: {
                            destination: stockHistoriesDestination,
                            origin: stockHistoriesOrigin,
                        },
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: 'Confirm Mutation Failed!',
                        data: null,
                    });
                }
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Request Mutation Not Found!',
                    data: null,
                });
            }
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: error,
                data: null,
            });
        }
    },
    rejectMutation: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { mutation_id } = req.params;
            const { id } = req.User;

            const checkMutation = await mutation.findOne({
                where: {
                    id: mutation_id,
                },
            });

            const checkMutationDetail = await db.mutation_details.findOne({
                where: {
                    mutation_id,
                },
            });

            if (checkMutation && checkMutationDetail) {
                const checkWhAdmin = await db.warehouses.findOne({
                    where: {
                        user_id: id,
                    },
                });

                if (
                    checkWhAdmin.id !=
                        checkMutationDetail.warehouse_destination_id ||
                    id == checkMutation.user_id
                ) {
                    return res.status(404).send({
                        success: false,
                        message: 'Unauthorized!',
                        data: null,
                    });
                }
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Request Mutation Not Found!',
                    data: null,
                });
            }

            const rejectMutation = await mutation.update(
                {
                    is_rejected: true,
                },
                {
                    where: {
                        id: mutation_id,
                    },
                },
                { transaction: t },
            );

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: rejectMutation,
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
    getAllMutation: async (req, res) => {
        try {
            const {
                page,
                response,
                request,
                status,
                sort,
                startDate,
                endDate,
                warehouse,
            } = req.query;
            const { id, role_id } = req.User;
            let order = [['id', 'DESC']];
            let where = undefined;
            let wh = undefined;
            const paginationLimit = 5;
            let paginationOffset =
                ((page ? Number(page) : 1) - 1) * paginationLimit;

            const checkWhAdmin = await db.warehouses.findOne({
                where: {
                    user_id: id,
                },
            });

            if (role_id === 3 && warehouse) {
                const findWh = await db.warehouses.findOne({
                    where: {
                        city: warehouse.replace(/%/g, ' '),
                    },
                });

                if (findWh) {
                    wh = {
                        [Op.or]: [
                            {
                                '$mutations.warehouse_origin_id$': findWh.id,
                            },
                            {
                                warehouse_destination_id: findWh.id,
                            },
                        ],
                    };
                } else {
                    return res.status(404).send({
                        success: false,
                        message: 'Warehouse Not Found!',
                        data: null,
                    });
                }
            }

            if (role_id === 2) {
                wh = {
                    [Op.or]: [
                        {
                            '$mutations.warehouse_origin_id$': checkWhAdmin.id,
                        },
                        {
                            warehouse_destination_id: checkWhAdmin.id,
                        },
                    ],
                };
            }

            if (startDate && endDate) {
                var dateEnd = new Date(endDate).setDate(
                    new Date(endDate).getDate() + 1,
                );

                where = {
                    ...where,
                    createdAt: {
                        [Op.between]: [new Date(startDate), new Date(dateEnd)],
                    },
                };
            }

            if (response) {
                wh = {
                    warehouse_destination_id: checkWhAdmin.id,
                };
            }

            if (request) {
                wh = {
                    '$mutations.warehouse_origin_id$': checkWhAdmin.id,
                };
            }

            if (status) {
                if (status === 'waiting') {
                    where = {
                        ...where,
                        [Op.and]: [
                            { is_approved: false },
                            { is_rejected: false },
                        ],
                    };

                    if (role_id === 2) {
                        if (response) {
                            wh = {
                                warehouse_destination_id: checkWhAdmin.id,
                            };
                        } else if (request) {
                            wh = {
                                '$mutations.warehouse_origin_id$':
                                    checkWhAdmin.id,
                            };
                        }
                    }
                } else if (status === 'confirmed') {
                    where = {
                        ...where,
                        [Op.and]: [
                            { is_approved: true },
                            { is_rejected: false },
                        ],
                    };

                    if (role_id === 2) {
                        if (response) {
                            wh = {
                                warehouse_destination_id: checkWhAdmin.id,
                            };
                        } else if (request) {
                            wh = {
                                '$mutations.warehouse_origin_id$':
                                    checkWhAdmin.id,
                            };
                        }
                    }
                } else if (status === 'rejected') {
                    where = {
                        ...where,
                        [Op.and]: [
                            { is_approved: false },
                            { is_rejected: true },
                        ],
                    };

                    if (role_id === 2) {
                        if (response) {
                            wh = {
                                warehouse_destination_id: checkWhAdmin.id,
                            };
                        } else if (request) {
                            wh = {
                                '$mutations.warehouse_origin_id$':
                                    checkWhAdmin.id,
                            };
                        }
                    }
                }
            }

            if (sort) {
                if (sort === 'newest') {
                    order = [['id', 'DESC']];
                } else if (sort === 'oldest') {
                    order = [['id', 'ASC']];
                }
            }

            const dataMutation = await mutation.findAndCountAll({
                where,
                include: [
                    {
                        model: db.warehouses,
                        as: 'origin',
                        attributes: [
                            'id',
                            'user_id',
                            'city',
                            'city_id',
                            'is_deleted',
                        ],
                    },
                    {
                        model: db.mutation_details,
                        where: wh,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        include: [
                            {
                                model: db.warehouses,
                                as: 'destination',
                                attributes: [
                                    'id',
                                    'user_id',
                                    'city',
                                    'city_id',
                                    'is_deleted',
                                ],
                            },
                        ],
                    },
                    {
                        model: db.products,
                        attributes: ['id', 'name', 'category_id', 'is_deleted'],
                        include: [
                            {
                                model: db.product_images,
                                attributes: [
                                    'id',
                                    'product_id',
                                    'name',
                                    'is_thumbnail',
                                ],
                                where: { is_thumbnail: true },
                            },
                            {
                                model: db.categories,
                                attributes: ['name'],
                            },
                        ],
                    },
                ],
                offset: paginationOffset,
                limit: paginationLimit,
                order,
            });

            const totalPage = Math.ceil(dataMutation.count / paginationLimit);

            return res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: dataMutation,
                totalPage: totalPage,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
    getAllMutationDetails: async (req, res) => {
        try {
            const mutationDetails = await db.mutation_details.findAndCountAll({
                include: [
                    { model: db.warehouses, as: 'destination' },
                    {
                        model: db.mutations,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        include: [
                            {
                                model: db.warehouses,
                                as: 'origin',
                            },
                            {
                                model: db.products,
                                attributes: [
                                    'id',
                                    'name',
                                    'category_id',
                                    'is_deleted',
                                ],
                                include: [
                                    {
                                        model: db.product_images,
                                        attributes: [
                                            'id',
                                            'product_id',
                                            'name',
                                            'is_thumbnail',
                                        ],
                                        where: { is_thumbnail: true },
                                    },
                                    {
                                        model: db.categories,
                                        attributes: ['name'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            res.status(200).send({
                success: true,
                message: 'Fetch Success!',
                data: mutationDetails,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null,
            });
        }
    },
};
