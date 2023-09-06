// const pool = require("../../config/database");
// import { Staff } from "./staff.model.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Shortid from "shortid";
import { salt } from "../../utils/sharedUtilities.ts";
import { Dependencies } from "../../utils/dependencyInjector.ts";
import { Request } from "express";
export const createNewStaff = async (body: any, employeeId:string, dependencies:Dependencies = null ) => {
  let staff = await dependencies.db.models.Staff.create({
    employeeId: Shortid(),
    created_By: employeeId,
    ...body,
    password: bcrypt.hashSync(body.password, salt),
    createdAt: Date.now(),
  });
  staff.save();
  return staff;
};
export const getEmployeeId = async (authToken:string) => {
  let token = authToken.slice(6);
  var decoded = jwt.decode(token);
  return decoded;
};
