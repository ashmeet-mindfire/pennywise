import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: false },
  category_id: { type: String, required: true },
  user_id: { type: String, required: true },
  date_time: { type: String, required: true },
});

export const TransactionModel = mongoose.model("Transaction", TransactionSchema);
