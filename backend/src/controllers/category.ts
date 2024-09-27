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
  const { name } = req.body;
  const { user_id } = req.query;
  if (!name || !user_id) return paramsNotFound("name/user_id", res);

  const category = await CategoryModel.create({ name, user_id, is_created_by_user: true });
  return res.status(StatusCodes.OK).json({ msg: "Category created successfully" });
};

export const getExpensesByCategory = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) return paramsNotFound("user_id", res);

  const transactions = await TransactionModel.find({ user_id });
  const categoryWithExpenses: { name: string; expense_amount: number; income_amount: number }[] = [];

  transactions.map((transaction) => {
    let isPresent = true;
    const transactionObj = transaction.toObject();
    let categoryObj = categoryWithExpenses.find((cat) => cat.name === transactionObj.category);

    if (!categoryObj) {
      isPresent = false;
      categoryObj = { name: transactionObj.category, expense_amount: 0, income_amount: 0 };
    }

    if (transactionObj.type === "expense") categoryObj.expense_amount += transactionObj.amount;
    else categoryObj.income_amount += transactionObj.amount;

    if (!isPresent) categoryWithExpenses.push(categoryObj);
  });

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Category with expenses fetched successfully", category_with_expenses: categoryWithExpenses });
};
