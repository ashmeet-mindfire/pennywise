import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const documentNotFound = (docTitle: string, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: `${docTitle} not found` });
};
