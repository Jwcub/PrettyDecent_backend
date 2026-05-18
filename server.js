/**
 * Backend-server för Pretty Decent
 * Node.js + Express backend med MongoDB (Mongoose)
 */

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

// Init Express
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({ message: "Not authorized for this route - token missing!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Unvalid JWT" });
        req.username = username;
        next();
    });
}

// Routes
app.use("/api", authRoutes);

// Protected route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Du är här: Skyddad route" })
})

// Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
