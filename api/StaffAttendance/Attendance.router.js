import { LoggedStaff, getStaffLoggs } from "./Attendance.controller.js";
import express from "express";
import { StaffAttendanceValidator } from "./Attendance.validator.js";
import { validateMiddleware } from "../../middleware/validation.js";
import { checkToken } from "../../middleware/checkToken.js";
const StaffLoggRouter = express.Router();
StaffLoggRouter.post(
  "/",
  StaffAttendanceValidator,
  validateMiddleware(StaffAttendanceValidator),
  LoggedStaff
);
StaffLoggRouter.get("/", checkToken, getStaffLoggs);

export default StaffLoggRouter;
