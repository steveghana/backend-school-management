import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { School, Staff } from "./school.model.js";

export const getEmployeeId = async (req) => {
  let token = req.slice(6);
  var decoded = jwt.decode(token);
  return decoded?.employeeid;
};
export const alphaNum = () => Math.random().toString(36).replace("0.", "");
export const salt = bcrypt.genSaltSync(10);
export const rawPassword = alphaNum();
export const createNewStaff = async (body) => {
  let staff = await Staff.create({
    employeeId: "SU001",
    role: "Admin",
    firstname: body.firstname,
    email: body.email,
    password: bcrypt.hashSync(rawPassword, salt),
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
    created_by,
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
