// src/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const CustomerController = require('../controller/customerController');




router.get('/restaurants', CustomerController.getALLRestaurants);
router.post('/getRestaurant', CustomerController.getRestaurant);
router.post('/createReservation', CustomerController.createReservation);
router.put('/updateReservation', CustomerController.updateReservation);
router.delete('/deleteReservation', CustomerController.deleteReservation);
router.post('/getallReservations', CustomerController.getAllReservation);
router.post('/getbrowserToken',CustomerController.getToken);
module.exports = router;
