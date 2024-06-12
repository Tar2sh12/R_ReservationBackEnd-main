const express = require('express');
const router = express.Router();
const VendorController = require('../controller/vendorController');

 
router.post('/vendors/getMyRestaurants', VendorController.getALLRestaurantsByVendorId);
router.post('/vendors/getRestaurant', VendorController.getRestaurantByVendorId);
router.post('/createRestaurant',VendorController.createRestaurant);
router.put('/updateRestaurant',VendorController.updateRestaurant);
router.delete('/deleteRestaurant', VendorController.deleteRestaurant);
router.post('/vendors/getRestReservations', VendorController.getAllReservationByRestaurant);
router.delete('/vendors/cancelReservation',VendorController.cancelReservation);

module.exports = router;