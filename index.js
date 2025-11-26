import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import http from "http";

import { connect } from "./config/database.js";
import { passportAuth } from "./config/jwt-middleware.js";
import apiRoutes from "./routes/index.js";
import passport from "passport";

const app = express();

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());
passportAuth(passport);

// Health check route
app.get("/api/health-check", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    message: "Server is healthy",
    timestamp: new Date(),
  });
});

// Routes
app.use("/api", apiRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});

// Create server
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // Required for EC2 public IP access

const server = http.createServer(app);

// Start server
server.listen(PORT, HOST, async () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  try {
    await connect();
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("🛑 Server shutting down...");
  process.exit(0);
});
