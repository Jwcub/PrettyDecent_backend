const express = require("express");
const router = express.Router();
const authRoutes = require("../middlewares/auth_token");

// Reservation model
const Message = require("../models/message");

// Add new message
router.post("/", async(req, res) => {
    try {
        let result = await Message.create(req.body);
        return res.status(200).json({ message: "Meddelande skickat" });
    } catch(error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
});

// Show messages
router.get("/", authRoutes, async(req, res) => {
    try {
        let result = await Message.find({});
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
});

// Change message
router.put("/:id", authRoutes, async(req, res) => {
    try {
        const messageId = req.params.id;
        const newMessageData = req.body;

        // Uppdate message
        const updatedMessage = await Message.findOneAndUpdate(
            { _id: messageId },
            newMessageData,
            {   
                new: true,
                runValidators: true
             }
        );

        // Does message exist?
        if(!updatedMessage) return res.status(404).json({ error: "Meddelandet hittades inte" });

        res.status(200).json(updatedMessage);

    } catch(error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;

