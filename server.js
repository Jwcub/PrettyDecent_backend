/*
Webbtjänst med MongoDB och express
*/

const express = require("express");
const cors = require("cors");
require('dotenv').config();

// Init Express
const app = express();
const port = process.env.PORT || 3000;

// Routes
