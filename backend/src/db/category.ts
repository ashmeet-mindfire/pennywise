import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  is_created_by_user: { type: Boolean, required: false, default: false },
  user_id: { type: String, required: false },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
