const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./configs/database");

require("dotenv").config();

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
const routes = require("./src/routes");
app.use("/api", routes);

module.exports = app;
