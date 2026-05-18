const express = require("express");
const router = express.Router();
require("dotenv").config();

// Add menu item
router.post("/menu", (req, res) => {
    res.json({ message: "Du är här: Skyddad route" })
});

// Display menu item
router.get("/menu", (req, res) => {
    res.json({ message: "Du är här: Skyddad route" })
});

// Edit menu item
router.put("/menu", (req, res) => {
    res.json({ message: "Du är här: Skyddad route" })
});

// Delete menu item
router.delete("/menu", (req, res) => {
    res.json({ message: "Du är här: Skyddad route" })
});


module.exports = router;
