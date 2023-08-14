import { StaffAttendance } from "./Attendance.model.ts";
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
