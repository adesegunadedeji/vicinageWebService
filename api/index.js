'use strict';
const express = require('express');
const router = express.Router();
//import routes from 
const estateController = require('../controllers/estateController');
const userController = require('../controllers/userController');
const listingController = require('../controllers/listingsController');
const homeController = require('../controllers/homeController');


router.use("/estate", estateController);
router.use("/user", userController);
router.use("/listing", listingController);
router.use("/home", homeController);
module.exports = router;