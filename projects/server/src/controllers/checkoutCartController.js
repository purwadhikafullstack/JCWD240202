const db = require('../models');
const users = db.users;
const warehouses = db.warehouses;
const user_addresses = db.user_addresses;
const cart_products = db.cart_products;
const products = db.products;
const carts = db.carts;
const sequelize = require('sequelize');

const getClosestWarehouse = async (req, res) => {
    try {
        const { address_id } = req.query;

        const findAddress = await user_addresses.findOne({
            where: { id: address_id },
        });

        if (findAddress) {
            const warehouseData = await warehouses.findOne({
                attributes: [
                    'id',
                    'province',
                    'province_id',
                    'city',
                    'city_id',
                    'subdistrict',
                    'street',
                    'postcode',
                    [
                        sequelize.fn(
                            'ST_Distance_Sphere',
                            sequelize.fn(
                                'POINT',
                                findAddress.longitude,
                                findAddress.latitude,
                            ),
                            sequelize.fn(
                                'POINT',
                                sequelize.col('longitude'),
                                sequelize.col('latitude'),
                            ),
                        ),
                        'distance',
                    ],
                ],
                order: sequelize.fn(
                    'ST_Distance_Sphere',
                    sequelize.fn(
                        'POINT',
                        findAddress.longitude,
                        findAddress.latitude,
                    ),
                    sequelize.fn(
                        'POINT',
                        sequelize.col('longitude'),
                        sequelize.col('latitude'),
                    ),
                ),
            });

            let distanceInKm = (
                warehouseData.dataValues.distance / 1000
            ).toFixed(2);

            res.status(200).send({
                success: true,
                message: 'get closest warehouse success',
                data: { warehouseData, distanceInKm },
            });
        } else {
            res.status(400).send({
                success: false,
                message: 'address id not found',
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
};

module.exports = { getClosestWarehouse };
