const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    numberOfSeats: { type: Number, required: true },
    sepcialReq: { type: String },
    reservationTime: { type: String, required: true },
    reservationName: { type: String, required: true },
},{
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
