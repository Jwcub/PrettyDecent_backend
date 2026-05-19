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
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: "Invalid input, send username, password and email" });
        }

        const user = new User({ username, password, email });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {
        // Mongoose duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({ error: "Username or Email already taken" });
        }
        res.status(500).json({ error: "Server error" });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input 
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" })
        }

        // Check credentials

        // Does user exist?
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Incorrect username or password!"})
        }
        
        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Incorrect username or password!"})
        } else {
            // Create JWT
            const payload = { username: username };
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