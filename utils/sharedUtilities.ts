//For all status code and custom messages
import bcrypt from "bcryptjs";
import { Response } from "express";
export const customStatusMessage = (
  res: Response,
  statusCode: number,
  success?: number,
  message?: string,
  data: any = null
) => {
  return res.status(statusCode).send({
    success,
    message,
    data,
  });
};

export const salt = bcrypt.genSaltSync(10);
