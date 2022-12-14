import {
  RegisterStaff,
  StaffLogin,
  getStaffByEmployeeId,
  getStaffInfos,
  updateSection,
  getIndividualStaffInfo,
  deleteStaff,
  ForgotPassword,
  ResetPassword,
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
staffRouter.patch("/staffinfo/update", checkToken, updateSection);
staffRouter.post(
  "/staffinfo/delete",
  checkToken,
  staffValidator,
  validateMiddleware(staffValidator),
  deleteStaff
);
staffRouter.post("/staffinfo/info", checkToken, getIndividualStaffInfo);
staffRouter.post(
  "/login",
  staffLoginValidator,
  validateMiddleware(staffLoginValidator),
  StaffLogin
);
staffRouter.post("/forgotpassword", ForgotPassword);
// Remember to pass the url as params

staffRouter.patch("/passwordreset/:resetToken", ResetPassword);
export default staffRouter;
