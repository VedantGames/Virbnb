const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  placeId: String,
  userId: String,
  checkIn: Date,
  checkOut: Date,
  nights: Number,
  guests: Number,
  title: String,
  photo: String,
  refundable: Boolean,
  total: Number,
})

const BookingModel = mongoose.model('Bookings', BookingSchema);

module.exports = BookingModel; 