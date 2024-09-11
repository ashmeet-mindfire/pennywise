import { TransactionModel } from "../db/transaction";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getTransactions = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide user_id" });

  const transactions = await TransactionModel.find({ user_id });
  return res.status(StatusCodes.OK).json({ msg: "Transactions fetched successfully", transactions });
};

export const createTransaction = async (req: Request, res: Response) => {
  const { title, desc, type, amount, category_id, user_id, date_time } = req.body;
  if (!title || !desc || !type || !amount || !category_id || !user_id || !date_time)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all fields" });

  const transaction = await TransactionModel.create({ title, desc, type, amount, category_id, user_id, date_time });
  return res.status(StatusCodes.CREATED).json({ msg: "Transaction created successfully", transactionId: transaction._id });
};
