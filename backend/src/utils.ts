import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const documentNotFound = (docTitle: string, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: `${docTitle} not found` });
};

export const paramsNotFound = (params: string, res: Response) => {
  return res.status(StatusCodes.BAD_REQUEST).json({ msg: `${params} not found in body` });
};

export const invalidParams = (params: string, res: Response) => {
  return res.status(StatusCodes.BAD_REQUEST).json({ msg: `Invalid ${params} value` });
};
