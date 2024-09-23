import { UserModel } from "../db/users";
import { TransactionModel } from "../db/transaction";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { documentNotFound, invalidParams, paramsNotFound } from "../utils";
import { MONTH } from "../constants";

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

  const transaction = await TransactionModel.create({
    title,
    desc,
    type,
    amount,
    category,
    user_id,
    date_time: new Date(date_time),
  });

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

export const getTransactionsByTimePeriod = async (req: Request, res: Response) => {
  const { time_period, value, user_id } = req.query;
  if (!time_period || !value) return paramsNotFound("time_period/value", res);
  if (time_period !== "year" && time_period !== "month") return invalidParams("time_period", res);
  if (time_period === "year") {
    const startDate = new Date(parseInt(value as string), 1, 1);
    const endDate = new Date(parseInt(value as string), 12, 31);
    const result = await TransactionModel.aggregate([
      {
        $match: {
          $and: [
            {
              user_id: user_id,
            },
            {
              date_time: {
                $gte: startDate,
              },
            },
            {
              date_time: {
                $lte: endDate,
              },
            },
          ],
        },
      },
      {
        $project: {
          year: { $year: "$date_time" },
          month: { $month: "$date_time" },
          type: 1,
          amount: 1,
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month", type: "$type" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: { year: "$_id.year", month: "$_id.month" },
          income: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "income"] }, "$totalAmount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "expense"] }, "$totalAmount", 0],
            },
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          income: 1,
          expense: 1,
          _id: 0,
        },
      },
    ]);
    const data: any[] = [];
    let resultIdx = 0;
    for (let i = 1; i <= 12; i++) {
      const resultObj = result[resultIdx];
      if (resultIdx !== result.length && resultObj.month === i) {
        data.push(resultObj);
        resultIdx += 1;
      } else {
        data.push({ income: 0, expense: 0, month: i });
      }
    }
    return res.status(StatusCodes.OK).json({ result: data });
  } else if (time_period === "month" && MONTH[value as keyof typeof MONTH]) {
    const startDate = new Date(2024, MONTH[value as keyof typeof MONTH] - 1, 1);
    const endDate = new Date(2024, MONTH[value as keyof typeof MONTH], 1);

    const result = await TransactionModel.aggregate([
      {
        $match: {
          $and: [
            {
              user_id: user_id,
            },
            {
              date_time: {
                $gte: startDate,
              },
            },
            {
              date_time: {
                $lte: endDate,
              },
            },
          ],
        },
      },
      {
        $project: {
          date: "$date_time",
          type: 1,
          amount: 1,
        },
      },
      {
        $group: {
          _id: { date: "$date", type: "$type" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: { date: "$_id.date" },
          income: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "income"] }, "$totalAmount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "expense"] }, "$totalAmount", 0],
            },
          },
        },
      },
      {
        $sort: {
          "_id.date": 1,
        },
      },
      {
        $project: {
          date: "$_id.date",
          income: 1,
          expense: 1,
          _id: 0,
        },
      },
    ]);
    const data = [];
    const dateFilled: boolean[] = new Array(31).fill(false);
    for (let transaction of result) {
      const date = transaction.date.getDate();
      dateFilled[date - 1] = true;
      data.push({ date: date, income: transaction.income, expense: transaction.expense });
    }
    for (let i = 0; i < dateFilled.length; i++) {
      if (!dateFilled[i]) data.push({ date: i + 1, income: 0, expense: 0 });
    }
    data.sort((a, b) => a.date - b.date);
    return res.status(StatusCodes.OK).json({ result: data });
  } else return res.status(StatusCodes.OK).json({ result: [] });
};
