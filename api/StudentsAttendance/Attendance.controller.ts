import { Staff } from "../staff/staff.model.ts";
import { customStatusMessage } from "../../utils/sharedUtilities.ts";
import { dashLogger } from "../../logs/logger.ts";
import { NextFunction, Request, Response } from "express";

import { getEmployeeId } from "./Attendance.service.ts";
import { StudentAttendance } from "./Attendance.model.ts";
export const LoggedStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, Class, lastName } = req.body;
  // Make sure all names are in lower case to avoid collision
  //Send all students list in the form of an array at once
  // Send a few fields based on the model except Date

  let token = req.get("authorization");
  let employeeId = await getEmployeeId(token);
  let todaysDate = `${new Date().toDateString()}`;
  try {
    const { role, ClassAssigned } = await Staff.findOne({ employeeId }).select(
      "role ClassAssigned"
    );
    if ((role === "Teacher" && ClassAssigned === Class) || role === "Admin") {
      /* A teacher can make a mistake when loggin students, so we can check
      whether there is a log on the same day, and if there is, we delete that table and 
      create a new one */
      let existingLogOfTheDay = await StudentAttendance.findOne({
        date: todaysDate,
      });
      if (existingLogOfTheDay) await existingLogOfTheDay.delete();
      const inserted = await StudentAttendance.insertMany({
        attendants: req.body,
      });
      if (!inserted) {
        customStatusMessage(
          res,
          401,
          0,
          "Staff log failed, please try again later"
        );
        return;
      }
      customStatusMessage(res, 200, 1, "Students Logged successfully", {
        firstName,
        lastName,
        Class,
      });
      return;
    }
    customStatusMessage(
      res,
      401,
      0,
      "Only a teacher with the designated class or Admin is allowed to log in students"
    );
    return;
  } catch (error) {
    dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
    next(error);
  }
};
export const getStudentsLoggs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStudentsLogs = await StudentAttendance.find({}); // Its better to filter on front end
    if (!allStudentsLogs.length) {
      customStatusMessage(res, 401, 0, "Records not found");
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", allStudentsLogs);
    return;
  } catch (error) {
    dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
    next(error);
  }
};
