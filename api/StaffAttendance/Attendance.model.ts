import mongoose from "mongoose";
const dateobject = new Date();
const StaffAttendantsSchema = new mongoose.Schema({
  date: { type: String, required: true, default: dateobject.toDateString() },
  attendants: [
    {
      firstName: String,
      Class: String,
      middleName: String,
      loggedTime: String,
      lastName: String,
      date: { type: String, default: dateobject.toDateString() },
      actualLoggedtime: {
        type: String,
        default: dateobject.toLocaleTimeString(),
      },
      role: String,
    },
  ],
});
export const StaffAttendance = mongoose.model(
  "StaffAttendants",
  StaffAttendantsSchema
);
