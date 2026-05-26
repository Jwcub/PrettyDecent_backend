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
        type: Date,
        required: true,
        validate: [
      {
        // DATE VALIDATION (Today or in the future)
        validator: function(value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          return value >= today;
        },
        message: "You can't make reservations for dates that have past."
      },
      {
        // TIME VALIDATION
        validator: function(value) {
          const hour = value.getHours();
          
          return hour >= 15 && hour <= 22;
        },
        message: "Bookings can only be made for times between 15:00 and 22:00."
      }
    ]
    },
    guests: {
        type: Number,
        required: true,
        min: [1, 'Minimum 1 guest required.']
    },
    requests: {
        type: String
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