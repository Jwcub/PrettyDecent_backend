const mongoose = require("mongoose");

// Reservation schema
const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String, 
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        validate: [
      {
        // DATE VALIDATION
        validator: function(date) {
          const bookingDate = new Date(date);
          const now = new Date();
          return bookingDate >= now;
        },
        message: "Din bokning måste avse ett datum frammåt i tiden"
      },
      {
        // TIME VALIDATION
        validator: function(date) {
          const timePart = v.split('T')[1]; 
          if (!timePart) return false;

          const hour = parseInt(timePart.split(':')[0], 10);
          return hour >= 15 && hour < 22;
        },
        message: 'Bokningstiden måste vara mellan 15:00 och 22:00.'
      }
    ]
    },
    guests: {
        type: Number,
        required: true,
        min: [1, 'Minst 1 gäst']
    },
    requests: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["newBooking", "confirmed", "cancelled"],
        default: "newBooking"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation; 