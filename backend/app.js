const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for frontend running on localhost:5500
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);

// Session (optional, JWT handles auth)
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
