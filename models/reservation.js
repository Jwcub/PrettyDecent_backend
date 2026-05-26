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
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: [1]
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