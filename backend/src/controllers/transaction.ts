import { UserModel } from "../db/users";
import { TransactionModel } from "../db/transaction";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { documentNotFound } from "../utils";

export const getTransactions = async (req: Request, res: Response) => {
  const { user_id, limit } = req.query;
  if (!user_id) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide user_id" });

  const transactions = await TransactionModel.find({ user_id })
    .sort({ created_at: "desc" })
    .limit(parseInt(limit as string));
  if (!transactions) return documentNotFound("Transactions", res);
  return res.status(StatusCodes.OK).json({ msg: "Transactions fetched successfully", transactions });
};

export const createTransaction = async (req: Request, res: Response) => {
  const { title, desc, type, amount, category, user_id, date_time } = req.body;
  if (!title || !desc || !type || !amount || !category || !user_id || !date_time)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide all fields" });

  const transaction = await TransactionModel.create({ title, desc, type, amount, category, user_id, date_time });

  const user = await UserModel.findById(user_id);
  if (type === "expense") {
    user.set({ total_expenses: user.total_expenses + amount });
    await user.save();
  } else {
    user.set({ total_income: user.total_income + amount });
    await user.save();
  }

  return res.status(StatusCodes.CREATED).json({ msg: "Transaction created successfully", transactionId: transaction._id });
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { transaction_id, user_id } = req.body;

  if (!transaction_id || !user_id)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "transaction_id or user_id missing from body" });

  const transaction = await TransactionModel.findById(transaction_id);
  if (!transaction) return documentNotFound("Transaction", res);

  const user = await UserModel.findById(user_id);
  if (!user) return documentNotFound("User", res);

  const transactionObj = transaction.toObject();
  const userObj = user.toObject();

  if (req.body.amount) {
    if (transactionObj.type === "expense")
      user.set({ total_expenses: userObj.total_expenses - transactionObj.amount + req.body.amount });
    if (transactionObj.type === "income")
      user.set({ total_income: userObj.total_income - transactionObj.amount + req.body.amount });
  }

  const keys = Object.keys(transactionObj);
  for (let key of keys) {
    if (req.body[key]) transaction.set({ [key]: req.body[key] });
  }

  await transaction.save();
  await user.save();
  return res.status(StatusCodes.CREATED).json({ msg: "Transaction updated successfully" });
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { transaction_id, user_id } = req.query;

  if (!transaction_id || !user_id)
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "transaction_id or user_id missing from body" });

  const user = await UserModel.findById(user_id);
  if (!user) return documentNotFound("User", res);

  const transaction = await TransactionModel.findOneAndDelete({ _id: transaction_id });
  if (!transaction) return documentNotFound("Transaction", res);

  const transactionObj = transaction.toObject();
  const userObj = user.toObject();
  if (transaction.type === "expense") user.set({ total_expenses: userObj.total_expenses - transactionObj.amount });
  if (transactionObj.type === "income") user.set({ total_income: userObj.total_income - transactionObj.amount });

  await user.save();
  return res.status(StatusCodes.OK).json({ msg: "Transaction deleted successfully" });
};
