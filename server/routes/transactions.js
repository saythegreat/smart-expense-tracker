import express from "express";
import Transaction from "../models/Transaction.js";
import auth from "../middleware/auth.js";

const router = express.Router(); // ✅ MUST be before router usage

console.log("🔥 transactions route loaded");

/* ✅ GET all transactions (protected) */
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ✅ POST transaction (protected) */
router.post("/", auth, async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* 🗑 DELETE transaction (protected) */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ✏️ UPDATE transaction (protected) */
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
