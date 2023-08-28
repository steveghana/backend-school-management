import express from "express";
import { init as initDb } from "./api/db/index.ts";
import log from "./utils/log.ts";
import { errorHandler } from "./middleware/error.ts";
import schoolRouter from "./api/school/school.router.ts";
import StudentLoggRouter from "./api/StudentsAttendance/Attendance.router.ts";
import staffRouter from "./api/staff/staff.router.ts";
import StaffLoggRouter from "./api/StaffAttendance/Attendance.router.ts";
import StudentRouter from "./api/student/student.router.ts";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
log.init();
dotenv.config();
void initDb();
const corsOption = {
  origin: process.env.FRONTEND_PORT,
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Api running"));
// app.use(logger("dev"));
// Connecting Routes
app.use("/api/school", schoolRouter);
app.use("/api/staff", staffRouter);
app.use("/api/student", StudentRouter);
app.use("/api/stafflogs", StaffLoggRouter);
app.use("/api/studentlogs", StudentLoggRouter);
// Error Handler Middleware
app.use(errorHandler);
const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process
  .on("unhandledRejection", (err: any, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
  })
  .on("uncaughtException", (exception: Error) => {
    console.log(`Logged Error: ${exception}`);
    server.close(() => process.exit(1));
  });
