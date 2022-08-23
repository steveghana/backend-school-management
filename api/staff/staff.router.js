import {
  RegisterStaff,
  StaffLogin,
  getStaffByEmployeeId,
  getStaffInfos,
} from "./staff.controller.js";
import express from "express";
import { staffValidator, staffLoginValidator } from "./staff.validator.js";
import { validateMiddleware } from "../../middleware/validation.js";
import { checkToken } from "../../middleware/checkToken.js";
const staffRouter = express.Router();
staffRouter.post(
  "/",
  checkToken,
  staffValidator,
  validateMiddleware(staffValidator),
  RegisterStaff
);
staffRouter.get("/", checkToken, getStaffInfos);
staffRouter.get("/:id", checkToken, getStaffByEmployeeId);
staffRouter.post(
  "/login",
  staffLoginValidator,
  validateMiddleware(staffLoginValidator),
  StaffLogin
);

export default staffRouter;
