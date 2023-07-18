const express = require('express');
const homepageController = require('../controllers/homepageController');

const router = express.Router();

router.get('/categories', homepageController.getAllCategories);
router.get('/newArrivals', homepageController.getNewArrivals);
router.get('/bestSeller', homepageController.getBestSeller);

module.exports = router;
