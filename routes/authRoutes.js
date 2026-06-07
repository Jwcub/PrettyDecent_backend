/**
 * Route for authorization
 */

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRoutes = require("../middlewares/auth_token");

// User model
const User = require("../models/user");

// Add a new user
router.post("/register", authRoutes, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Ogiltigt värden, ange både användarnamn och lösenord." });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: "Användare skapad!" });

    } catch (error) {
        // Mongoose duplicate key error
        if (error.code === 11000) {
            console.log("MongoDB Duplicate Error:", error.keyValue); 
            return res.status(409).json({ 
                error: "E-postadressen är redan registrerad", 
                details: error.keyValue 
            });
        }
        console.error("Error:", error);
        res.status(500).json({ error: "Server fel", message: error.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input 
        if(!email || !password) {
            return res.status(400).json({ error: "Ogiltigt värden, ange både användarnamn och lösenord." })
        }

    // Check credentials
        // Does user exist?
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ error: "Ogilitgt användarnamn eller lösenord!"})
        }
        
        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Ogilitgt användarnamn eller lösenord!"})
        } else {
            // Create JWT
            const payload = { email: email };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "3h"});
            const response = {
                message: "Användare inloggad",
                token: token
            }
            res.status(200).json(response)
        }

    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;