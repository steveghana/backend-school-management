import {
  RegisterStudent,
  getStudentByAdmissionNO,
  getStudentInfos,
} from "./student.controller.js";
import express from "express";
import { studentValidator } from "./student.validator.js";
import { validateMiddleware } from "../../middleware/validation.js";
import { checkToken } from "../../middleware/checkToken.js";
const StudentRouter = express.Router();
StudentRouter.post(
  "/",
  checkToken,
  studentValidator,
  validateMiddleware(studentValidator),
  RegisterStudent
);
StudentRouter.get("/", checkToken, getStudentInfos);
StudentRouter.get("/:id", checkToken, getStudentByAdmissionNO);
//   StudentRouter.post(
//     "/login",
//     staffLoginValidator,
//     validateMiddleware(staffLoginValidator),
//     StaffLogin
//   );

export default StudentRouter;
