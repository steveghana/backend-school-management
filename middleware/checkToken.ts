import jwt from "jsonwebtoken";
import { customStatusMessage } from "../utils/sharedUtilities";
import { NextFunction, Request, Response } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(6);
    jwt.verify(token, process.env.SECRET || "", (err: any, decoded: any) => {
      if (err) {
        customStatusMessage(res, 401, 0, "Invalid token");
      } else {
        next();
      }
    });
  } else {
    customStatusMessage(res, 401, 0, "Access denied! unathorized user");
  }
};
