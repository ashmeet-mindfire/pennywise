import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsByTimePeriod,
  updateTransaction,
} from "../controllers/transaction";

const router = express.Router();

/**
 * @openapi
 * /api/v1/transaction:
 *   get:
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User Id whose transactions need to be fetched
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: No of transactions
 *     description: Returns a list of transactions!
 *     responses:
 *       200:
 *         description: Returns a list of transactions.
 */
router.get("/", getTransactions);

/**
 * @openapi
 * /api/v1/transaction:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Create a transaction
 *     parameters:
 *       - in: body
 *         name: transaction
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - desc
 *             - amount
 *             - type
 *             - category
 *             - date
 *             - user_id
 *           properties:
 *             title:
 *               type: string
 *             desc:
 *               type: string
 *             amount:
 *               type: integer
 *             type:
 *               type: string
 *             category:
 *               type: string
 *             date_time:
 *               type: string
 *             user_id:
 *               type: string
 *         description: Transaction Details
 *     description: Create a new transaction
 *     responses:
 *       200:
 *         description: Transaction created successfully.
 */
router.post("/", createTransaction);

/**
 * @openapi
 * /api/v1/transaction:
 *   put:
 *     tags:
 *       - Transactions
 *     summary: Update a transaction
 *     parameters:
 *       - in: body
 *         name: transaction
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - user_id
 *             - transaction_id
 *           properties:
 *             title:
 *               type: string
 *             desc:
 *               type: string
 *             amount:
 *               type: integer
 *             type:
 *               type: string
 *             category:
 *               type: string
 *             date_time:
 *               type: string
 *             user_id:
 *               type: string
 *             transaction_id:
 *               type: string
 *         description: Transaction Details
 *     description: Create a new transaction
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 */
router.put("/", updateTransaction);

/**
 * @openapi
 * /api/v1/transaction:
 *   delete:
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: transaction_id
 *         required: true
 *         schema:
 *           type: string
 *     description: Returns a list of transactions!
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 */
router.delete("/", deleteTransaction);

router.get("/chart", getTransactionsByTimePeriod);

export default router;
