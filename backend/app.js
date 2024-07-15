const express = require("express");
const dotenv = require("dotenv");
const facebookRoutes = require("./routes/facebookRoutes");
const cors = require("cors");

dotenv.config();

const frontendURL = process.env.FRONTEND_URL || "https://localhost:3000";

const app = express();

app.use(express.json());

const corsOptions = {
    origin: frontendURL,
};

app.use(cors(corsOptions));

app.use("/api", facebookRoutes);

module.exports = app;
