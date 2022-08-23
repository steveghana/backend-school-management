// const pool = require("../../config/database");
import { Staff } from "./staff.model.js";
import bcrypt from "bcryptjs";
import Shortid from "shortid";
import { salt } from "../../utils/sharedUtilities.js";
export const createNewStaff = async (body) => {
  let staff = await Staff.create({
    employeeId: Shortid(),
    role: body.role,
    firstname: body.firstname,
    contact_Number: body.contact_number,
    email: body.email,
    created_By: body.created_By,
    password: bcrypt.hashSync(body.password, salt),
    createdAt: Date.now(),
  });
  staff.save();
  return staff;
};
