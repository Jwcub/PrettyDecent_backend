/**
 * Backend-server för Pretty Decent
 * Node.js + Express backend med MongoDB (Mongoose)
 */

const express = require("express");
const authRoutes = require("./routes/authRoutes")
const cors = require("cors");
require("dotenv").config();

// Init Express
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Routes
app.use("/api", authRoutes);

// Start application
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
