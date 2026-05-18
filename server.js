/**
 * Backend-server för Pretty Decent
 * Node.js + Express backend med MongoDB (Mongoose)
 */

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/menuRoutes");
const authenticateToken = require("./middlewares/auth_token")
const cors = require("cors");
require("dotenv").config();

// Init Express
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

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
app.use("/api", authRoutes);
app.use("/api", authenticateToken, foodRoutes);

// Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
