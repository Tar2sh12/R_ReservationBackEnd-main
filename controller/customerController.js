// src/controllers/CustomerController.js
const Restaurant = require('../model/resturantModel');
const Reservation = require('../model/reservationModel');
const Customer = require('../model/customerModel');
const axios = require('axios');
let browserToken;
const getALLRestaurants = async (req, res) => { 
    const restaurants = await Restaurant.find();
    res.status(200).json({ restaurants });

};



const getRestaurant = async (req, res) => { 
    const { restaurantId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ restaurant });
};


const createReservation = async (req, res) =>{
  const { customerId,reservationName,restaurantId,numberOfSeats,reservationTime,sepcialReq } = req.body;
  const reservation = new Reservation({ reservationName,customerId,restaurantId,numberOfSeats,reservationTime,sepcialReq });
  const savedReservation = await reservation.save();
  console.log(browserToken);
  const notificationData = {
    notification: {
      title: 'Reservation sent to restaurant successfully',
      body: 'Your reservation id: '+savedReservation._id
    },
    to: browserToken
  };
  
  axios.post('https://fcm.googleapis.com/fcm/send', notificationData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAEDIQM30:APA91bELVO347Ax5Q1B9V7nCIveQWsj1Vc0APb1zKJXl7y9MSunWZpBrDVegxPKjlrYdFQ_EQQWshsd4ee6P93nFt7dyjIbRkft838eHmC690AyvM7w0eGVjG5JwRMVpMT7nHVIAPQXG' // Replace with your Firebase Server Key
    }
  })
  .then((response) => {
    console.log('Notification sent successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error sending notification:', error);
  });

  res.json({savedReservation});
};



const updateReservation = async (req, res) => {
  const { reservationId,numberOfSeats, reservationTime,sepcialReq } = req.body;
  console.log(reservationId);
  const reservation = await Reservation.findById(reservationId);

  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }

  reservation.numberOfSeats = numberOfSeats || reservation.numberOfSeats;
  reservation.reservationTime = reservationTime || reservation.reservationTime;
  reservation.sepcialReq = sepcialReq || reservation.sepcialReq;

  const updatedReservation = await reservation.save();
  res.json({ updatedReservation });
};


const deleteReservation = async (req, res) => {
  const { reservationId } = req.body;
  const deletedReservation = await Reservation.findOneAndDelete({ _id: reservationId });
  if (!deletedReservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }

  res.json({deletedReservation});
 
};


const getAllReservation = async (req, res) => {
    const {customerId} = req.body;
    // const customer = await Customer.findById(customerId);
    // if (!customer) {
    //   return res.status(404).json({ message: 'Customer not found' });
    // }
    const reservations = await Reservation.find({ customerId });
    if (!reservations) {
         return res.status(404).json({ message: 'No Reservations found!' });
      }
    res.status(200).json({ reservations });
};
const getToken = async (req,res)=>{
  const {Token} = req.body;
  browserToken = Token;
  //console.log(browserToken);
}



module.exports={
    createReservation,
    getALLRestaurants,
    getRestaurant,
    updateReservation,
    deleteReservation,
    getAllReservation,
    getToken
}
