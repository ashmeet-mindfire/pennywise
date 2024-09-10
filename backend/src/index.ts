import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import connectDB from "./db/connect";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log("Server started on port", port);
    });
    await connectDB();
  } catch (e) {
    console.log(e);
  }
};

start();
