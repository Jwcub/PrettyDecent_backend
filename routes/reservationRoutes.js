const express = require("express");
const router = express.Router();
const authRoutes = require("../middlewares/auth_token");

// Reservation model
const Reservation = require("../models/reservation");

// Add reservation
router.post("/", async(req, res) => {
    try {
        let result = await Reservation.create(req.body);
        return res.status(200).json(result);
    } catch(error) {

        if (error.name === 'ValidationError') {
            const firstKey = Object.keys(error.errors)[0];
            const errorMessage = error.errors[firstKey].message;
            return res.status(400).json({ message: errorMessage });
        }

        res.status(500).json({ error: 'Serverfel' });
    } 
});

// Show reservations
router.get("/", authRoutes, async(req, res) => {
    try {
        let result = await Reservation.find({});
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
});

// Change reservation
router.put("/:id", authRoutes, async(req, res) => {
    try {
        const reservationId = req.params.id;
        const newReservationData = req.body;

        // Uppdate menu item
        const updatedReservation = await Reservation.findOneAndUpdate(
            { _id: reservationId },
            newReservationData,
            {   
                new: true,
                runValidators: true
             }
        );

        // Does menu item exist?
        if(!updatedReservation) return res.status(404).json({ error: "Reservation hittades inte" });

        res.status(200).json(updatedReservation);

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;