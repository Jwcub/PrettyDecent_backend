/**
 * Route for authorization
 */

const express = require("express");
const router = express.Router();

// Login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input 
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" })
        }

        // Check credentials
        

    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;