import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  total_expenses: { type: Number, required: false },
  total_income: { type: Number, required: false },
});

export const UserModel = mongoose.model("User", UserSchema);
