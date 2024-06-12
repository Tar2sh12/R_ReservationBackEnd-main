const Restaurant = require('../model/resturantModel');
const Reservation = require('../model/reservationModel');
const Vendor = require('../model/vendorModel');
const User = require('../model/usersModel')


const getALLRestaurantsByVendorId = async (req, res) => {
    const { vendorId } = req.body;
    // const vendor = await Vendor.findById(vendorId);
    // if (!vendor) {
    //   return res.status(404).json({ message: 'Vendor not found' });
    // }
    const restaurants = await Restaurant.find({ vendorId });
    if (!restaurants) {
      return res.status(404).json({ message: 'No restaurants found' });
    }    
    res.status(200).json({ restaurants });
};


const getRestaurantByVendorId = async (req, res) => {
    const { vendorId, restaurantId } = req.body;
    // const vendor = await Vendor.findById(vendorId);
    // if (!vendor) {
    //   return res.status(404).json({ message: 'Vendor not found' });
    // }
    const restaurant = await Restaurant.findOne({ _id: restaurantId, vendorId });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found for the specified vendor' });
    }

    res.status(200).json({ restaurant });
};



const createRestaurant = async (req, res) => {
  const { vendorId,name,description,image,foodCategory,
    numTables,numSeats,timeSlots,longitude,latitude } = req.body;  

  const checkResName = await Restaurant.findOne({ vendorId, name });
  if (checkResName) {
    return res.json({ message: 'Restaurant name is already taken by this vendor' });
  }  
  const restaurant = new Restaurant({ vendorId,name,description,image,foodCategory,
    numTables,numSeats,timeSlots,longitude,latitude  });
  const savedRestaurant = await restaurant.save();
  res.json({ savedRestaurant});
};




const updateRestaurant = async (req, res) => {
  const {  restaurantId } = req.body;
  const { name,description,image,foodCategory,
    numTables,numSeats,timeSlots,longitude,latitude} = req.body;

  const restaurant = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurant) {
    return res.json({  message: 'Restaurant not found' });
  }
  
  restaurant.name = name || restaurant.name;
  restaurant.description = description || restaurant.description;
  restaurant.image = image || restaurant.image;
  restaurant.foodCategory = foodCategory || restaurant.foodCategory;
  restaurant.numTables = numTables;
  restaurant.numSeats = numSeats || restaurant.numSeats;
  restaurant.timeSlots = timeSlots || restaurant.timeSlots;
  restaurant.longitude = longitude || restaurant.longitude;
  restaurant.latitude = latitude || restaurant.latitude;

  const updatedRestaurant = await restaurant.save();
  res.json({  updatedRestaurant });
};




const deleteRestaurant = async (req, res) => {
    const { restaurantId } = req.body;
    const deletedRestaurant = await Restaurant.findOneAndDelete({ _id: restaurantId });
    if (!deletedRestaurant) {
      return res.json({ message: 'Restaurant not found for the specified vendor' });
    }
    res.json({ deletedRestaurant});
};




const getAllReservationByRestaurant = async (req, res) => {
  const { vendorId } = req.body;
    const vendor = await User.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    const restaurants = await Restaurant.find({ vendorId });
    const reservationsPromises = restaurants.map(async (restaurant) => {
      return Reservation.find({ restaurantId: restaurant._id });
    });
    const reservationsByRestaurant = await Promise.all(reservationsPromises);
    const allReservations = reservationsByRestaurant.flat();
    res.status(200).json({  allReservations });
};


const cancelReservation = async (req, res) => {
  const { vendorId, restaurantId, reservationId } = req.body;
  // const vendor = await Vendor.findById(vendorId);
  // if (!vendor) {
  //   return res.json({ message: 'Vendor not found' });
  // }

  const restaurant = await Restaurant.findOne({ _id: restaurantId, vendorId });
  if (!restaurant) {
    return res.json({ message: 'Restaurant not found for the specified vendor' });
  }

  const deletedReservation = await Reservation.findOneAndDelete({ _id: reservationId, restaurantId });
  if (!deletedReservation) {
    return res.json({ message: 'Reservation not found for the specified restaurant' });
  }

  res.json({ deletedReservation });
};

module.exports={
  getALLRestaurantsByVendorId,
  getRestaurantByVendorId,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllReservationByRestaurant,
  cancelReservation,
    
}
