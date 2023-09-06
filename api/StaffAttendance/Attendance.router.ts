import { LoggedStaff, getStaffLoggs } from "./Attendance.controller.ts";
import express, { NextFunction, Request,Response } from "express";
import { StaffAttendanceValidator } from "./Attendance.validator.ts";
import { validateMiddleware } from "../../middleware/validation.ts";
import { checkToken } from "../../middleware/checkToken.ts";
const StaffLoggRouter = express.Router();
StaffLoggRouter.post(
  "/",
  StaffAttendanceValidator,
  ()=>
  validateMiddleware(StaffAttendanceValidator)
,(req:Request, res:Response, next:NextFunction)=>
  LoggedStaff(req,res, next )
);
StaffLoggRouter.get("/", checkToken, getStaffLoggs);

export default StaffLoggRouter;
