const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const orders = db.orders;
const order_statuses = db.order_statuses;
const users = db.users;
const products = db.products;
const cart_products = db.cart_products;
const carts = db.carts;

const getAllSales = async (req, res) => {
    try {
        const user = req.User;
        const { month, year, warehouse_id } = req.query;

        if (user.role_id === 3) {
            if (!warehouse_id) {
                const sumSales = await sequelize.query(
                    `SELECT SUM(orders.total) AS total_sales FROM orders
                        JOIN order_statuses ON orders.id = order_statuses.order_id
                        WHERE MONTH(orders.createdAt) = ${month} AND YEAR(orders.createdAt) = ${year}
                        AND order_statuses.status_id = 5`,
                );
                const salesPrevMonth = await sequelize.query(
                    `SELECT SUM(orders.total) AS total_sales FROM orders
                        JOIN order_statuses ON orders.id = order_statuses.order_id
                        WHERE MONTH(orders.createdAt) = ${
                            month === 1 ? (month = 12) : month - 1
                        } AND YEAR(orders.createdAt) = ${
                            month === 1 ? year - 1 : year
                        }
                        AND order_statuses.status_id = 5`,
                );
                res.status(200).send({
                    success: false,
                    message: 'success',
                    data: {
                        salesCurrentMonth: sumSales[0],
                        salesPreviousMonth: salesPrevMonth[0],
                    },
                });
            } else if (warehouse_id) {
                const sumSales = await sequelize.query(
                    `SELECT SUM(orders.total) AS total_sales FROM orders
                        JOIN order_statuses ON orders.id = order_statuses.order_id
                        WHERE MONTH(orders.createdAt) = ${month} AND YEAR(orders.createdAt) = ${year} AND orders.warehouse_id = ${warehouse_id}
                        AND order_statuses.status_id = 5`,
                );
                const salesPrevMonth = await sequelize.query(
                    `SELECT SUM(orders.total) AS total_sales FROM orders
                        JOIN order_statuses ON orders.id = order_statuses.order_id
                        WHERE MONTH(orders.createdAt) = ${
                            month === 1 ? (month = 12) : month - 1
                        } AND YEAR(orders.createdAt) = ${
                            month === 1 ? year - 1 : year
                        } AND orders.warehouse_id = ${warehouse_id}
                        AND order_statuses.status_id = 5`,
                );
                res.status(200).send({
                    success: false,
                    message: 'success',
                    data: {
                        salesCurrentMonth: sumSales[0],
                        salesPreviousMonth: salesPrevMonth[0],
                    },
                });
            }
        } else if (user.role_id === 2) {
            const findUserWarehouse = await db.warehouses.findOne({
                where: { user_id: user.id },
            });

            const sumSales = await sequelize.query(
                `SELECT SUM(orders.total) AS total_sales FROM orders
                        JOIN order_statuses ON orders.id = order_statuses.order_id
                        WHERE MONTH(orders.createdAt) = ${month} AND YEAR(orders.createdAt) = ${year} AND orders.warehouse_id = ${findUserWarehouse.id}
                        AND order_statuses.status_id = 5`,
            );
            const salesPrevMonth = await sequelize.query(
                `SELECT SUM(orders.total) AS total_sales FROM orders
                        JOIN order_statuses ON orders.id = order_statuses.order_id
                        WHERE MONTH(orders.createdAt) = ${
                            month === 1 ? (month = 12) : month - 1
                        } AND YEAR(orders.createdAt) = ${
                            month === 1 ? year - 1 : year
                        } AND orders.warehouse_id = ${findUserWarehouse.id}
                        AND order_statuses.status_id = 5`,
            );
            res.status(200).send({
                success: false,
                message: 'success',
                data: {
                    salesCurrentMonth: sumSales[0],
                    salesPreviousMonth: salesPrevMonth[0],
                },
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getSalesByCategory = async (req, res) => {
    try {
        const user = req.User;
        const { month, year, warehouse_id } = req.query;

        if (user.role_id === 3) {
            const salesPerCategory = await sequelize.query(
                `SELECT c.name AS category, IFNULL(SUM(IF(os.status_id = 5, cp.price * cp.quantity, 0)), 0) AS totalSales
                    FROM categories c
                    LEFT JOIN products p ON c.id = p.category_id
                    LEFT JOIN cart_products cp ON p.id = cp.product_id
                    LEFT JOIN carts ca ON cp.cart_id = ca.id
                    LEFT JOIN orders o ON ca.id = o.cart_id AND MONTH(o.createdAt) = ${month} AND YEAR(o.createdAt) = ${year} ${
                        warehouse_id ? `AND warehouse_id =${warehouse_id}` : ''
                    }
                    LEFT JOIN order_statuses os ON o.id = os.order_id
                    GROUP BY c.id;`,
            );

            res.status(200).send({
                success: true,
                message: 'get sales per category success',
                data: salesPerCategory[0],
            });
        } else if (user.role_id === 2) {
            const findUserWarehouse = await db.warehouses.findOne({
                where: { user_id: user.id },
            });

            const salesPerCategory = await sequelize.query(
                `SELECT c.name AS category, IFNULL(SUM(IF(os.status_id = 5, cp.price * cp.quantity, 0)), 0) AS totalSales
                    FROM categories c
                    LEFT JOIN products p ON c.id = p.category_id
                    LEFT JOIN cart_products cp ON p.id = cp.product_id
                    LEFT JOIN carts ca ON cp.cart_id = ca.id
                    LEFT JOIN orders o ON ca.id = o.cart_id AND MONTH(o.createdAt) = ${month} AND YEAR(o.createdAt) = ${year} AND warehouse_id = ${findUserWarehouse.id}
                    LEFT JOIN order_statuses os ON o.id = os.order_id
                    GROUP BY c.id;`,
            );

            res.status(200).send({
                success: true,
                message: 'get sales per category success',
                data: salesPerCategory[0],
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const getSalesPerProduct = async (req, res) => {
    try {
        const user = req.User;
        const { month, year, warehouse_id, category_id, page, search } =
            req.query;

        if (user.role_id === 3) {
            const paginationLimit = 5;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;

            const salesPerProduct = await sequelize.query(
                `SELECT c.id, c.name AS category, p.name AS productName, 
                    IFNULL(SUM(IF(os.status_id = 5, p.price * cp.quantity, 0)), 0) AS totalSales,
                    IFNULL(SUM(IF(os.status_id = 5, cp.quantity, 0)), 0) AS totalQuantity
                    FROM categories c
                    LEFT JOIN products p ON c.id = p.category_id
                    LEFT JOIN cart_products cp ON p.id = cp.product_id
                    LEFT JOIN carts ca ON cp.cart_id = ca.id
                    LEFT JOIN orders o ON ca.id = o.cart_id AND MONTH(o.createdAt) = ${month} AND YEAR(o.createdAt) = ${year} ${
                        warehouse_id ? `AND warehouse_id =${warehouse_id}` : ''
                    }
                    LEFT JOIN order_statuses os ON o.id = os.order_id
                    ${
                        category_id && search
                            ? `WHERE c.id = ${category_id} AND p.name LIKE '${
                                  '%' + search + '%'
                              }'`
                            : category_id && !search
                            ? `WHERE c.id = ${category_id}`
                            : search && !category_id
                            ? `WHERE p.name LIKE '${'%' + search + '%'}'`
                            : ''
                    }
                    GROUP BY c.id, p.id
                    ORDER BY totalSales DESC, p.name ASC
                    LIMIT ${paginationLimit} OFFSET ${paginationOffset} ;`,
            );

            const totalData = await sequelize.query(
                `SELECT COUNT(DISTINCT p.id) AS totalProductsCount
                    FROM products p
                    LEFT JOIN cart_products cp ON p.id = cp.product_id
                    LEFT JOIN carts ca ON cp.cart_id = ca.id
                    LEFT JOIN orders o ON ca.id = o.cart_id AND MONTH(o.createdAt) = ${month} AND YEAR(o.createdAt) = ${year}
                    LEFT JOIN order_statuses os ON o.id = os.order_id;`,
            );

            const totalPage = Math.ceil(
                Number(totalData[0][0].totalProductsCount) / paginationLimit,
            );

            res.status(200).send({
                success: true,
                message: 'get sales per product success',
                data: {
                    sales: salesPerProduct[0],
                    totalData: totalData[0],
                    totalPage,
                },
            });
        } else if (user.role_id === 2) {
            const findUserWarehouse = await db.warehouses.findOne({
                where: { user_id: user.id },
            });

            const paginationLimit = 5;
            const paginationOffset =
                (Number(page ? page : 1) - 1) * paginationLimit;

            const salesPerProduct = await sequelize.query(
                `SELECT c.id, c.name AS category, p.name AS productName, 
                    IFNULL(SUM(IF(os.status_id = 5, p.price * cp.quantity, 0)), 0) AS totalSales,
                    IFNULL(SUM(IF(os.status_id = 5, cp.quantity, 0)), 0) AS totalQuantity
                    FROM categories c
                    LEFT JOIN products p ON c.id = p.category_id
                    LEFT JOIN cart_products cp ON p.id = cp.product_id
                    LEFT JOIN carts ca ON cp.cart_id = ca.id
                    LEFT JOIN orders o ON ca.id = o.cart_id AND MONTH(o.createdAt) = ${month} AND YEAR(o.createdAt) = ${year} AND warehouse_id = ${
                        findUserWarehouse.id
                    }
                    LEFT JOIN order_statuses os ON o.id = os.order_id
                    ${
                        category_id && search
                            ? `WHERE c.id = ${category_id} AND p.name LIKE '${
                                  '%' + search + '%'
                              }'`
                            : category_id && !search
                            ? `WHERE c.id = ${category_id}`
                            : search && !category_id
                            ? `WHERE p.name LIKE '${'%' + search + '%'}'`
                            : ''
                    }
                    GROUP BY c.id, p.id
                    ORDER BY totalSales DESC, p.name ASC
                    LIMIT ${paginationLimit} OFFSET ${paginationOffset} ;`,
            );

            const totalData = await sequelize.query(
                `SELECT COUNT(DISTINCT p.id) AS totalProductsCount
                    FROM products p
                    LEFT JOIN cart_products cp ON p.id = cp.product_id
                    LEFT JOIN carts ca ON cp.cart_id = ca.id
                    LEFT JOIN orders o ON ca.id = o.cart_id AND MONTH(o.createdAt) = ${month} AND YEAR(o.createdAt) = ${year}
                    LEFT JOIN order_statuses os ON o.id = os.order_id;`,
            );

            const totalPage = Math.ceil(
                Number(totalData[0][0].totalProductsCount) / paginationLimit,
            );

            res.status(200).send({
                success: true,
                message: 'get sales per product success',
                data: {
                    sales: salesPerProduct[0],
                    totalData: totalData[0],
                    totalPage,
                },
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const chartSales = async (req, res) => {
    try {
        const user = req.User;
        const { warehouse_id, month, year } = req.query;

        if (user.role_id === 3) {
            let where = {};
            if (warehouse_id) {
                where = { warehouse_id };
            }

            if (year && !month) {
                const startDate = new Date(`${year}-01-01`);
                const endDate = new Date(`${year}-12-31`);

                const months = [];
                let currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                    months.push(new Date(currentDate));
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }

                const monthYearStrings = months.map((date) =>
                    date.toISOString().substr(0, 7),
                );

                const getData = await orders.findAll({
                    attributes: [
                        [
                            sequelize.fn(
                                'DATE_FORMAT',
                                sequelize.col('orders.createdAt'),
                                '%Y-%m',
                            ),
                            'monthYear',
                        ],
                        [sequelize.fn('SUM', sequelize.col('total')), 'total'],
                    ],
                    where,
                    include: [
                        {
                            model: order_statuses,
                            attributes: [],
                            where: { status_id: 5 },
                        },
                    ],
                    group: [
                        sequelize.fn(
                            'DATE_FORMAT',
                            sequelize.col('orders.createdAt'),
                            '%Y-%m',
                        ),
                    ],
                    raw: true,
                });

                const salesMap = new Map();

                getData.forEach((item) => {
                    salesMap.set(item.monthYear, item.total);
                });

                const result = monthYearStrings.map((monthYear) => ({
                    monthYear,
                    total: salesMap.get(monthYear) || 0,
                }));

                res.status(200).send({
                    success: true,
                    message: 'get data success',
                    data: result,
                });
            } else if (year && month) {
                const startDate = new Date(year, month - 1, 1);
                const endDate = new Date(year, month, 0);

                const dates = [];
                let currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                const dateStrings = dates.map((date) =>
                    date.toISOString().substr(0, 10),
                );

                const getData = await orders.findAll({
                    attributes: [
                        [
                            sequelize.fn(
                                'DATE',
                                sequelize.col('orders.createdAt'),
                            ),
                            'date',
                        ],
                        [sequelize.fn('SUM', sequelize.col('total')), 'total'],
                    ],
                    include: [
                        {
                            model: order_statuses,
                            attributes: [],
                            where: { status_id: 5 },
                        },
                    ],
                    where: {
                        createdAt: {
                            [Op.gte]: startDate,
                            [Op.lt]: endDate,
                        },
                    },
                    where,
                    group: [
                        sequelize.fn('DATE', sequelize.col('orders.createdAt')),
                    ],
                    raw: true,
                });

                const salesMap = new Map();

                getData.forEach((item) => {
                    const formattedDate = item.date.substr(0, 10);
                    salesMap.set(formattedDate, item.total);
                });

                const result = dates.map((date) => {
                    const formattedDate = date.toISOString().substr(0, 10);
                    return {
                        date: formattedDate,
                        total: salesMap.get(formattedDate) || 0,
                    };
                });

                res.status(200).send({
                    success: true,
                    message: 'get data success',
                    data: result,
                });
            }
        } else if (user.role_id === 2) {
            const findUserWarehouse = await db.warehouses.findOne({
                where: { user_id: user.id },
            });

            if (year && !month) {
                const startDate = new Date(`${year}-01-01`);
                const endDate = new Date(`${year}-12-31`);

                const months = [];
                let currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                    months.push(new Date(currentDate));
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }

                const monthYearStrings = months.map((date) =>
                    date.toISOString().substr(0, 7),
                );

                const getData = await orders.findAll({
                    attributes: [
                        [
                            sequelize.fn(
                                'DATE_FORMAT',
                                sequelize.col('orders.createdAt'),
                                '%Y-%m',
                            ),
                            'monthYear',
                        ],
                        [sequelize.fn('SUM', sequelize.col('total')), 'total'],
                    ],
                    where: { warehouse_id: findUserWarehouse.id },
                    include: [
                        {
                            model: order_statuses,
                            attributes: [],
                            where: { status_id: 5 },
                        },
                    ],
                    group: [
                        sequelize.fn(
                            'DATE_FORMAT',
                            sequelize.col('orders.createdAt'),
                            '%Y-%m',
                        ),
                    ],
                    raw: true,
                });

                const salesMap = new Map();

                getData.forEach((item) => {
                    salesMap.set(item.monthYear, item.total);
                });

                const result = monthYearStrings.map((monthYear) => ({
                    monthYear,
                    total: salesMap.get(monthYear) || 0,
                }));

                res.status(200).send({
                    success: true,
                    message: 'get data success',
                    data: result,
                });
            } else if (year && month) {
                const startDate = new Date(year, month - 1, 1);
                const endDate = new Date(year, month, 0);

                const dates = [];
                let currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                    dates.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                const dateStrings = dates.map((date) =>
                    date.toISOString().substr(0, 10),
                );

                const getData = await orders.findAll({
                    attributes: [
                        [
                            sequelize.fn(
                                'DATE',
                                sequelize.col('orders.createdAt'),
                            ),
                            'date',
                        ],
                        [sequelize.fn('SUM', sequelize.col('total')), 'total'],
                    ],
                    include: [
                        {
                            model: order_statuses,
                            attributes: [],
                            where: { status_id: 5 },
                        },
                    ],
                    where: {
                        createdAt: {
                            [Op.gte]: startDate,
                            [Op.lt]: endDate,
                        },
                        warehouse_id: findUserWarehouse.id,
                    },
                    group: [
                        sequelize.fn('DATE', sequelize.col('orders.createdAt')),
                    ],
                    raw: true,
                });

                const salesMap = new Map();

                getData.forEach((item) => {
                    const formattedDate = item.date.substr(0, 10);
                    salesMap.set(formattedDate, item.total);
                });

                const result = dates.map((date) => {
                    const formattedDate = date.toISOString().substr(0, 10);
                    return {
                        date: formattedDate,
                        total: salesMap.get(formattedDate) || 0,
                    };
                });

                res.status(200).send({
                    success: true,
                    message: 'get data success',
                    data: result,
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

const totalOrder = async (req, res) => {
    try {
        const user = req.User;
        const { warehouse_id, month, year } = req.query;
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);

        if (user.role_id === 3) {
            let where = {};
            if (warehouse_id) {
                where = { warehouse_id };
            }

            const countOrder = await orders.count({
                where: {
                    createdAt: {
                        [Sequelize.Op.gte]: firstDay,
                        [Sequelize.Op.lt]: lastDay,
                    },
                },
                where,
            });

            const completeOrder = await order_statuses.count({
                where: {
                    status_id: 5,
                    createdAt: {
                        [Sequelize.Op.gte]: firstDay,
                        [Sequelize.Op.lt]: lastDay,
                    },
                },
                include: [{ model: orders, where }],
            });

            const cancelledOrder = await order_statuses.count({
                where: {
                    status_id: 6,
                    createdAt: {
                        [Sequelize.Op.gte]: firstDay,
                        [Sequelize.Op.lt]: lastDay,
                    },
                },
                include: [{ model: orders, where }],
            });

            res.status(200).send({
                success: true,
                message: 'order count success',
                data: {
                    countOrder,
                    completeOrder,
                    cancelledOrder,
                },
            });
        } else if (user.role_id === 2) {
            const findUserWarehouse = await db.warehouses.findOne({
                where: { user_id: user.id },
            });

            const countOrder = await orders.count({
                where: {
                    createdAt: {
                        [Sequelize.Op.gte]: firstDay,
                        [Sequelize.Op.lt]: lastDay,
                    },
                },
                where: { warehouse_id: findUserWarehouse.id },
            });

            const completeOrder = await order_statuses.count({
                where: {
                    status_id: 5,
                    createdAt: {
                        [Sequelize.Op.gte]: firstDay,
                        [Sequelize.Op.lt]: lastDay,
                    },
                },
                include: [
                    {
                        model: orders,
                        where: { warehouse_id: findUserWarehouse.id },
                    },
                ],
            });

            const cancelledOrder = await order_statuses.count({
                where: {
                    status_id: 6,
                    createdAt: {
                        [Sequelize.Op.gte]: firstDay,
                        [Sequelize.Op.lt]: lastDay,
                    },
                },
                include: [
                    {
                        model: orders,
                        where: { warehouse_id: findUserWarehouse.id },
                    },
                ],
            });

            res.status(200).send({
                success: true,
                message: 'order count success',
                data: {
                    countOrder,
                    completeOrder,
                    cancelledOrder,
                },
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
};

module.exports = {
    getAllSales,
    getSalesByCategory,
    getSalesPerProduct,
    chartSales,
    totalOrder,
};
