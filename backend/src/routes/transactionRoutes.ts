import express from "express";
import { createTransaction, getTransactions } from "../controllers/transaction";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", createTransaction);

export default router;
