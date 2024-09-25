import mongoose from "mongoose";
import { genSalt, hash } from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  total_expenses: { type: Number, required: false },
  total_income: { type: Number, required: false },
});

export const UserModel = mongoose.model("User", UserSchema);
