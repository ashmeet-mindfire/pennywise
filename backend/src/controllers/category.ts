import { Request, Response } from "express";
import { CategoryModel } from "../db/category";
import { StatusCodes } from "http-status-codes";

export const getCategories = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "user_id not found in body" });

  const categories = await CategoryModel.find({ $or: [{ user_id }, { user_id: { $eq: null } }] });
  return res.status(StatusCodes.OK).json({ categories, msg: "Categories fetched successfully" });
};

export const addCategory = async (req: Request, res: Response) => {
  const { name, user_id } = req.body;
  if (!name || !user_id) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "name or user_id not found in body" });

  const category = await CategoryModel.create({ name, user_id, is_created_by_user: true });
  return res.status(StatusCodes.OK).json({ msg: "Category created successfully" });
};
