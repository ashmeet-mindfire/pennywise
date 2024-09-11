import { UserModel } from "../db/users";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password)
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: "Please provide email, name & password" });

  const user = await UserModel.findOne({ email });
  if (user) return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: "Email already in use" });

  const newUser = await UserModel.create({ name, email, password, total_expenses: 0, total_income: 0 });
  return res.status(StatusCodes.CREATED).json({ success: true, user: newUser });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: "Please provide email & password" });

  const user = await UserModel.findOne({ email, password });
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: "Invalid Credentials" });

  return res.status(StatusCodes.OK).json({ success: true, user });
};

export const getUserById = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide user_id" });

  const user = await UserModel.findById(user_id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });

  return res.status(StatusCodes.OK).json({ user });
};
