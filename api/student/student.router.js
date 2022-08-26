import {
  RegisterStudent,
  deleteStudent,
  getStudentByUniqueCredentials,
  getStudentInfos,
  getStudentsByAdmissionClass,
  updateStudentInfo,
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
StudentRouter.get("/studentinfo", checkToken, getStudentByUniqueCredentials);
StudentRouter.patch("/studentinfo/update", checkToken, updateStudentInfo);
StudentRouter.post(
  "/studentinfo/delete",
  checkToken,
  studentValidator,
  validateMiddleware(studentValidator),
  deleteStudent
);
StudentRouter.get("/studentinfo/infos", checkToken, getStudentInfos);
StudentRouter.get(
  "/studentinfo/class",
  checkToken,
  getStudentsByAdmissionClass
);

export default StudentRouter;
