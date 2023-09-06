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
} from "./staff.controller.ts";
import express, { NextFunction, Response, Request } from "express";
import { staffValidator, staffLoginValidator } from "./staff.validator.ts";
import { validateMiddleware } from "../../middleware/validation.ts";
import { checkToken } from "../../middleware/checkToken.ts";
const staffRouter = express.Router();
staffRouter.post(
  "/",
  checkToken,
  staffValidator,
  validateMiddleware(staffValidator),(req:Request, res:Response, next:NextFunction) => RegisterStaff(req, res, next)
);
staffRouter.get("/", checkToken,(req:Request, res:Response, next:NextFunction) => getStaffInfos(req, res, next));
staffRouter.get("/:id", checkToken,(req:Request, res:Response, next:NextFunction) => getStaffByEmployeeId(req, res, next));
staffRouter.patch("/staffinfo/update", checkToken,(req:Request, res:Response, next:NextFunction) => updateSection(req, res, next));
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
