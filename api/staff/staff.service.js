// const pool = require("../../config/database");
import { Staff } from "./staff.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Shortid from "shortid";
import { salt } from "../../utils/sharedUtilities.js";
export const createNewStaff = async (body, employeeId) => {
  let staff = await Staff.create({
    employeeId: Shortid(),
    created_By: employeeId,
    ...body,
    password: bcrypt.hashSync(body.password, salt),
    createdAt: Date.now(),
  });
  staff.save();
  return staff;
};
export const getEmployeeId = async (req) => {
  let token = req.slice(6);
  var decoded = jwt.decode(token);
  return decoded?.employeeid;
};
