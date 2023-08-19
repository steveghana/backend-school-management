import { Student } from "./student.model.ts";
import shortid from "shortid";
import jwt from "jsonwebtoken";
export const createNewStudent = async (body, id) => {
  // console.log(body, id);
  let newStudent = await Student.create({
    parent_id: shortid(),
    admission_id: shortid(),
    ...body,
    created_by: id,
    admission_date: Date.now(),
  });
  newStudent.save();
  return newStudent;
};

export const getEmployeeId = async (req) => {
  let token = req.slice(6);
  var decoded = jwt.decode(token);
  return decoded?.id;
};
