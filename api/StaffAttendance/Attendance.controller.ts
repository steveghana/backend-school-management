import { Staff } from "../staff/staff.model.ts";
import { customStatusMessage } from "../../utils/sharedUtilities.ts";
import { dashLogger } from "../../logs/logger.ts";
import { NextFunction, Request, Response } from "express";

import { logStaffAttendance } from "./Attendance.service.ts";
import { StaffAttendance } from "./Attendance.model.ts";
export const LoggedStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, Class, lastName, role } = req.body;
  // Make sure all names are in lower case to avoid collision
  try {
    const existingStaff = await Staff.findOne({
      firstName,
      // ClassAssigned: Class,
      lastName,
      role,
    });
    if (!existingStaff) {
      customStatusMessage(
        res,
        401,
        0,
        " A Staff member with these credentials do not exist"
      );
      return;
    }
    let todaysDate = new Date().toDateString();
    let existingLogOfTheDay = await StaffAttendance.findOne({
      date: todaysDate,
    });
    let filterLoggedStaff =
      existingLogOfTheDay !== null &&
      existingLogOfTheDay.attendants.filter(
        (staff) =>
          staff.firstName === firstName &&
          staff.lastName === lastName &&
          staff.role === role
      );
    if (filterLoggedStaff.length) {
      customStatusMessage(
        res,
        401,
        0,
        "A Staff with the same credentials has already logged in."
      );
      return;
    }

    if (existingLogOfTheDay) {
      const existingLogs = await logStaffAttendance(req.body, todaysDate);
      if (!existingLogs) {
        customStatusMessage(
          res,
          401,
          0,
          "Staff log failed, please try again later"
        );
        return;
      }
    } else {
      //create a fresh log
      let inserted = await StaffAttendance.insertMany({
        date: todaysDate,
        attendants: [
          {
            ...req.body,
          },
        ],
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
    }
    customStatusMessage(res, 200, 1, "Staff Logged successfully", {
      firstName,
      lastName,
      Class,
    });
    return;
  } catch (error) {
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
    next(error);
  }
};
export const getStaffLoggs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStaffLoggs = await StaffAttendance.find({}); // Its better to filter on front end
    if (!allStaffLoggs.length) {
      customStatusMessage(res, 401, 0, "Records not found");
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", allStaffLoggs);
    return;
  } catch (error) {
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
    next(error);
  }
};
