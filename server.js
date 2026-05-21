/**
 * Backend-server för Pretty Decent
 * Node.js + Express backend med MongoDB (Mongoose)
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/menuRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Init Express
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5500;

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, {
    dbName: "PrettyDecent_DB"
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database", error);
});

// Routes
app.use("/api/", authRoutes);
app.use("/api/menu", foodRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/message", messageRoutes);

// Information for base URL
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to the PrettyDecent API!",
        version: "1.0.0"
    });
});

// Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
