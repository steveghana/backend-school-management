import { LoggedStudents, getStudentsLoggs } from "./Attendance.controller.js";
import express from "express";
import { checkToken } from "../../middleware/checkToken.js";
const StudentLoggRouter = express.Router();
StudentLoggRouter.post("/", checkToken, LoggedStudents);
StudentLoggRouter.get("/", checkToken, getStudentsLoggs);

export default StudentLoggRouter;
