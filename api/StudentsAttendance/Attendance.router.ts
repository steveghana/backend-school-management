import { LoggedStudents, getStudentsLoggs } from "./Attendance.controller.ts";
import express from "express";
import { checkToken } from "../../middleware/checkToken.ts";
const StudentLoggRouter = express.Router();
StudentLoggRouter.post("/", checkToken, LoggedStudents);
StudentLoggRouter.get("/", checkToken, getStudentsLoggs);

export default StudentLoggRouter;
