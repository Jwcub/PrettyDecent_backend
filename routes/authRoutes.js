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
            return res.status(400).json({ error: "Invalid input, send email & password" });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {
        // Mongoose duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({ error: "Email already registered" });
        }
        res.status(500).json({ error: "Server error" });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input 
        if(!email || !password) {
            return res.status(400).json({ error: "Invalid input, send email and password" })
        }

        // Check credentials

        // Does user exist?
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ error: "Incorrect email or password!"})
        }
        
        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Incorrect email or password!"})
        } else {
            // Create JWT
            const payload = { email: email };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "3h"});
            const response = {
                message: "User logged in",
                token: token
            }
            res.status(200).json({ response })
        }

    } catch(error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;