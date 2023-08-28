import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import Staff  from "../db/model/staff.ts";
// import { salt } from "../../utils/sharedUtilities.ts";
// import { Request } from "express";
import { Dependencies, injectDependencies } from "../../utils/dependencyInjector.ts";
type IBody = Record<string, any>
export const getEmployeeId = async (req:string) => {
  let token = req.slice(6);
  var decoded: any = jwt.decode(token);
  return decoded?.employeeid;
};
export const alphaNum = () => Math.random().toString(36).replace("0.", "");
export const rawPassword = alphaNum();
export const createNewStaff = async (body:any, dependencies: Dependencies ) => {
  dependencies = injectDependencies(dependencies, ['db']);

  let staff = await  dependencies.db?.models.Staff?.create({

    // role: "Admin",
    // employeeId: "SU001",
    firstName: body.firstname,
    lastName:body.lastName,

    email: body.email,
    phone_number: body.contact_Number,
    // password: bcrypt.hashSync(rawPassword, salt),
    // created_By: "SU001",
    // createdAt: Date.now(),
  });
  staff!.save();
  return staff;
};

export const creatNewSchool = async (body:IBody, dependencies:Dependencies) => {
  dependencies = injectDependencies(dependencies, ['db']);

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
  const newSchool = await dependencies.db?.models.SchoolDetails?.create({
    name,
    address,
    phone_number,
    email,
    logo_small,
    logo_long,
    created_by: "SU001",
    access_code,
    created_at: new Date(),
  });
  newSchool!.save();
  return newSchool;
};
export const mailData = (body:IBody) => {
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
