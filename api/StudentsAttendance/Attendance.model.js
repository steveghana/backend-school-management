import mongoose from "mongoose";
const dateobject = new Date();
const StudentAttendantsSchema = new mongoose.Schema({
  date: { type: String, required: true, default: dateobject.toDateString() },
  attendants: [
    {
      firstName: String,
      Class: String,
      middleName: String,
      lastName: String,
      date: { type: String, default: dateobject.toDateString() },
      section: String,
      school_club: String,
      guardian: String,
      father_name: String,
      mothers_name: String,
      town: String,
      created_By: String,
      updated_By: String,
    },
  ],
});
export const StudentAttendance = mongoose.model(
  "StudentsAttendants",
  StudentAttendantsSchema
);
