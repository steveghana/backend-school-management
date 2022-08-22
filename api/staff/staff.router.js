import {
  createStaff,
  getStaffs,
  getStaffByEmployeeId,
  login,
} from "./staff.controller";
import express from "express";
import { checkToken } from "../../auth/token_validation";
const staffRouter = express.Router();
staffRouter.post("/", checkToken, createStaff);
staffRouter.get("/", checkToken, getStaffs);
staffRouter.get("/:id", checkToken, getStaffByEmployeeId);
staffRouter.post("/login", login);

export default staffRouter;
