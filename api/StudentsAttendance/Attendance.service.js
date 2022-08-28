import jwt from "jsonwebtoken";
import { StudentAttendance } from "./Attendance.model.js";
export const getEmployeeId = async (req) => {
  let token = req.slice(6);
  var decoded = jwt.decode(token);
  return decoded?.id;
};
export const logStudentAttendance = async (body, theDate) => {
  let loggedStaff = await StudentAttendance.updateOne(
    { date: theDate },
    {
      $addToSet: {
        attendants: {
          ...body,
        },
      },
    }
  );
  return loggedStaff;
};
