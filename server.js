import express from "express";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/error.js";
import schoolRouter from "./api/school/school.router.js";
import staffRouter from "./api/staff/staff.router.js";
import StaffLoggRouter from "./api/StaffAttendance/Attendance.router.js";
import StudentRouter from "./api/student/student.router.js";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();
const corsOption = {
  origin: process.env.FRONTEND_PORT,
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Api running"));
app.use(logger("dev"));
// Connecting Routes
app.use("/api/school", schoolRouter);
app.use("/api/staff", staffRouter);
app.use("/api/student", StudentRouter);
app.use("/api/stafflogs", StaffLoggRouter);
// Error Handler Middleware
app.use(errorHandler);
const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
