import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://ashmeet-mindfire:ashmeetsingh@cluster0.wvl49.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("DB Connected");
};

export default connectDB;
