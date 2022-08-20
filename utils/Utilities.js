import { verify, decode } from "jsonwebtoken";
import { hashSync, genSaltSync } from "bcryptjs";
import { School, Staff } from "../api/school/school.model";

export const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: 0,
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: 0,
      message: "Access denied! unauthorized user",
    });
  }
};
export const getEmployeeId = (req) => {
  let token = req.slice(7);
  var decoded = decode(token);
  return decoded.result.employee_id;
};
export const salt = genSaltSync(10);
export const rawPassword = alphaNum();
export const alphaNum = () => Math.random().toString(36).replace("0.", "");
export const createNewStaff = async (body) => {
  let staff = await Staff.create({
    employee_id: "SU001",
    role: "1",
    email: body.super_admin_email,
    password: hashSync(rawPassword, salt),
    createdAt: Date.now(),
  });
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
