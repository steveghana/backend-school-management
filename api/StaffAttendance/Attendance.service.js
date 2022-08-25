import { StaffAttendance } from "./Attendance.model.js";
export const logStaffAttendance = async (body, theDate) => {
  let loggedStaff = await StaffAttendance.updateOne(
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
