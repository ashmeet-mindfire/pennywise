import { UserModel } from "../db/users";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password)
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: "Please provide email, name & password" });

  const user = await UserModel.findOne({ email });
  if (user) return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: "Email already in use" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await UserModel.create({ name, email, password: hashedPassword, total_expenses: 0, total_income: 0 });

  const token = sign({ userId: newUser._id, name: newUser.name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return res.status(StatusCodes.CREATED).json({ success: true, user: newUser, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, msg: "Please provide email & password" });

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: "Invalid Credentials" });

  console.log(password, user.password);
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: "Invalid Credentials" });

  const token = sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.status(StatusCodes.OK).json({ success: true, user, token });
};

export const getUserById = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide user_id" });

  const user = await UserModel.findById(user_id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });

  return res.status(StatusCodes.OK).json({ user });
};
