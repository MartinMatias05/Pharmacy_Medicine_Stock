const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const medicineRoutes = require("./routes/medicineRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/medicines", medicineRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Pharmacy Medicine Stock API is running."
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});