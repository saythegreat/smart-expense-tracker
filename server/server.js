import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import transactionRoutes from "./routes/transactions.js";
import authRoutes from "./routes/auth.js"; // if you created auth routes

dotenv.config();

// ✅ 1. CREATE APP FIRST
const app = express();

// ✅ 2. MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ 3. ROUTES (AFTER app exists)
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes); // safe now

// ✅ 4. TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ 5. CONNECT DB & START SERVER
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
