import { LoggedStaff, getStaffLoggs } from "./Attendance.controller.ts";
import express from "express";
import { StaffAttendanceValidator } from "./Attendance.validator.ts";
import { validateMiddleware } from "../../middleware/validation.ts";
import { checkToken } from "../../middleware/checkToken.ts";
const StaffLoggRouter = express.Router();
StaffLoggRouter.post(
  "/",
  StaffAttendanceValidator,
  validateMiddleware(StaffAttendanceValidator),
  LoggedStaff
);
StaffLoggRouter.get("/", checkToken, getStaffLoggs);

export default StaffLoggRouter;
