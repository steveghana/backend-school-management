import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { School } from "./school.model.js";
import { Staff } from "../staff/staff.model.js";
import { salt } from "../../utils/sharedUtilities.js";
export const getEmployeeId = async (req) => {
  let token = req.slice(6);
  var decoded = jwt.decode(token);
  return decoded?.employeeid;
};
export const alphaNum = () => Math.random().toString(36).replace("0.", "");
export const rawPassword = alphaNum();
export const createNewStaff = async (body) => {
  let staff = await Staff.create({
    employeeId: "SU001",
    role: "Admin",
    firstname: body.firstname,
    email: body.email,
    contact_Number: body.contact_Number,
    password: bcrypt.hashSync(rawPassword, salt),
    created_By: "SU001",
    createdAt: Date.now(),
  });
  staff.save();
  return staff;
};

export const creatNewSchool = async (body) => {
  const {
    email,
    address,
    phone_number,
    logo_long,
    logo_small,
    created_by,
    access_code,
    name,
  } = body;
  const newSchool = await School.create({
    name,
    address,
    phone_number,
    email,
    logo_small,
    logo_long,
    created_by: "SU001",
    access_code,
    created_at: Date.now(),
  });
  newSchool.save();
  return newSchool;
};
export const mailData = (body) => {
  return {
    email: body.super_admin_email,
    subject: "Heritage Baptist Staff Account",
    text:
      "Hello " +
      body.super_admin_firstname +
      ", your staff account has been created successfully. Your password is " +
      rawPassword,
  };
};
