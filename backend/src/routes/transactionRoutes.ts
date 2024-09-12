import express from "express";
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "../controllers/transaction";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", createTransaction);
router.put("/", updateTransaction);
router.delete("/", deleteTransaction);

export default router;
