import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      required: true,
    },

    // 🔐 User reference (for authentication later)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // keep false for now
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);
