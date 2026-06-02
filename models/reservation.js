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
        // DATE VALIDATION
        validator: function(value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          return value >= today;
        },
        message: "Din bokning måste avse ett datum frammåt i tiden"
      },
      {
        // TIME VALIDATION
        validator: function(value) {
          const hour = value.getHours();
          
          return hour >= 15 && hour <= 22;
        },
        message: "Det går endast att boka bord för tider mellan 15:00 och 22:00."
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