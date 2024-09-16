import { Request, Response } from "express";
import { CategoryModel } from "../db/category";
import { StatusCodes } from "http-status-codes";
import { paramsNotFound } from "../utils";
import { TransactionModel } from "../db/transaction";

export const getCategories = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) return paramsNotFound("user_id", res);

  const categories = await CategoryModel.find({ $or: [{ user_id }, { user_id: { $eq: null } }] });
  return res.status(StatusCodes.OK).json({ categories, msg: "Categories fetched successfully" });
};

export const addCategory = async (req: Request, res: Response) => {
  const { name, user_id } = req.body;
  if (!name || !user_id) return paramsNotFound("name/user_id", res);

  const category = await CategoryModel.create({ name, user_id, is_created_by_user: true });
  return res.status(StatusCodes.OK).json({ msg: "Category created successfully" });
};

export const getExpensesByCategory = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) return paramsNotFound("user_id", res);

  const transactions = await TransactionModel.find({ user_id });
  const categoryWithExpenses: { name: string; amount: number; type: string }[] = [];

  transactions.map((transaction) => {
    const transactionObj = transaction.toObject();
    const categoryObj = categoryWithExpenses.find((cat) => cat.name === transactionObj.category);

    if (categoryObj) categoryObj.amount += transactionObj.amount;
    else categoryWithExpenses.push({ name: transactionObj.category, amount: transactionObj.amount, type: transactionObj.type });
  });

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Category with expenses fetched successfully", category_with_expenses: categoryWithExpenses });
};
