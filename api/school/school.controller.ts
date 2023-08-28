"use strict";
// import { School, Section, Class } from "./school.model.ts";
// import { Staff } from "../staff/staff.model.ts";
import {
  getEmployeeId,
  createNewStaff,
  creatNewSchool,
  mailData,
} from "./school.service.ts";
import { customStatusMessage } from "../../utils/sharedUtilities.ts";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.ts";
import { dashLogger } from "../../logs/logger.ts";
import { NextFunction, Request, Response } from "express";
import { Dependencies, injectDependencies } from "../../utils/dependencyInjector.ts";

// Register New School
export const RegisterNewSchool = async (req: Request, res: Response, dependencies:Dependencies) => {
  dependencies = injectDependencies(dependencies, ['db'])

  const { email, access_code } = req.body;
  try {
    if (access_code !== process.env.ACCESS_CODE) {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorized to register school, access code needed"
      );
      return;
    }
    const doesSchoolExist = await dependencies.db?.models.SchoolDetails?.findAll({});
    if ( doesSchoolExist!.length) {
      customStatusMessage(
        res,
        401,
        0,
        "Only a single school can be registered"
      );
      return;
    }
    const schoolAlreadyExist = await dependencies.db?.models.SchoolDetails?.findOne({ where:{email} });
    if (schoolAlreadyExist) {
      customStatusMessage(res, 401, 0, "School Already Exist");
      return;
    }
    const newSchool = await creatNewSchool(req.body, dependencies);
    if (!newSchool) {
      customStatusMessage(
        res,
        401,
        0,
        "School registration failed, please try again later"
      );
      return;
    }
    const existingStaffMember = await dependencies.db?.models.Staff?.findOne({ where:{email} });
    if (existingStaffMember) {
      customStatusMessage(res, 401, 0, "Staff Member already exist");
      return;
    }
    const newStaffMember = await createNewStaff(req.body, dependencies);

    if (!newStaffMember) {
      customStatusMessage(
        res,
        401,
        0,
        "Staff registration failed, please try again later"
      );
      return;
    }
    sendEmail(mailData(req?.body)); // node mailer TO DO
    const token = await jwt.sign(
      { employeeid: newStaffMember. },
      process.env.SECRETb|| ''
      // { expiresIn: "24hrs" }
    );
    customStatusMessage(res, 200, 1, "Successfully registered", {
      newSchool,
      newStaffMember,
      token,
    });
  } catch (error) {
    dashLogger.error(`Error : ${error},Request : ${req.originalUrl}`);
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
  }
};

export const getSchoolDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get School Details
  try {
    const schoolData = await School.find();
    if (!schoolData.length) {
      customStatusMessage(res, 401, 0, "Item not found");
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", schoolData);
    return;
  } catch (error:any) {
    dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
    next();
  }
};

// Create Section
export const createSection = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies: Dependencies 

) => {
  dependencies = injectDependencies(dependencies, ['db'])
  let token = req.get("authorization") as string;
  const { section } = req.body;
  try {
    const employeeid = await getEmployeeId(token);
    if (!employeeid) {
      customStatusMessage(res, 401, 0, "Invalid employee id");
      return;
    }
    const newSectionAdded = await dependencies.db?.models.Section?.create({
      section,
      created_by: employeeid,
    });
    newSectionAdded.save();
    if (!newSectionAdded) {
      dashLogger.error(
        `Error : section wasn't created,Request : ${req.originalUrl}`
      );
      customStatusMessage(res, 402, 0, "Section wasn't added");
    }
    customStatusMessage(
      res,
      200,
      1,
      "Section succesfully created",
      newSectionAdded
    );
  } catch (error:any) {
    console.log(error?.message);
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Duplication Error"
    );
    next(error);
  }
};
// Update Section
export const updateSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { section } = req.body;
  let token = req.get("authorization") as string;
  try {
    let employeeId = await getEmployeeId(token);
    let updated = await Section.findOneAndUpdate(
      //query
      { created_by: employeeId },
      {
        //update
        section,
        updated_by: employeeId,
        updated_at: new Date().toISOString(),
      }
    );
    if (!updated) {
      dashLogger.error(
        `Error : Section couldnt update ,Request : ${req.originalUrl}`
      );
      customStatusMessage(res, 402, 0, "Couldn't updated section");
      return;
    }
    customStatusMessage(res, 200, 1, "Succesfully updated section", updated);
    return;
  } catch (error) {
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Duplication Error"
    );
    next(error);
  }
};

// Get Sections
export const getSections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sections = await Section.find({});
  try {
    if (!sections.length) {
      customStatusMessage(res, 401, 0, "Section not found");
      return;
    }
    customStatusMessage(res, 200, 1, "Operation successful", sections);
  } catch (error) {
    customStatusMessage(
      res,
      500,
      0,
      "Database Error || Couldn't connect to database, please try again later"
    );
    next(error);
  }
};

// Create class
export const createClass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.get("authorization") as string;
  try {
    const employeeid = await getEmployeeId(token);
    if (!employeeid) {
      customStatusMessage(res, 401, 0, "Invalid employee id");
      return;
    }
    const existingClass = await Class.findOne({ class: req.body?.class });
    if (existingClass) {
      customStatusMessage(res, 401, 0, "Class Already exist");
      return;
    }
    const classCreated = await Class.create({
      class: req.body?.class,
      created_by: "dfd",
    });
    classCreated.save();
    if (!classCreated) {
      dashLogger.error(
        `Error : class couldnt be created,Request : ${req.originalUrl}`
      );
      customStatusMessage(res, 402, 0, "Class wasn't created");
      return;
    }
    customStatusMessage(
      res,
      200,
      1,
      "Class successfully created",
      classCreated
    );
    return;
  } catch (error) {
    customStatusMessage(res, 500, 1, "Couldn't connect to database");
    next(error);
    return;
  }
};
// Get Classes
export const getClasses = async (req:Request, res:Response) => {
  const allClasses = await Class.find({});
  if (!allClasses.length) {
    dashLogger.error(`Error : class not found,Request : ${req.originalUrl}`);
    customStatusMessage(res, 402, 1, "Class not found ");
  }
  customStatusMessage(res, 200, 1, "Operation successful", allClasses);
};
