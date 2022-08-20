"use strict";
const {
  register,
  getDetails,
  createSection,
  updateSection,
  getSections,
  createClass,
  getClasses,
} = require("./school.service");
import { genSaltSync, hashSync } from "bcrypt";
import { School, Staff } from "./school.model.js";
import {
  alphaNum,
  getEmployeeId,
  createNewStaff,
  creatNewSchool,
  mailData,
} from "../../utils/Utilities.js";
import sendEmail from "../../utils/sendEmail.js";
import { dashLogger } from "../../logs/logger.js";

// Register New School
export const RegisterNewSchool = (req, res, next) => {
  const { email } = req.body;
  try {
    if (body.access_code !== process.env.ACCESS_CODE) {
      return res.status(401).json({
        success: 0,
        message: "Unauthorized to register school",
      });
    }
    const schoolAlreadyExist = School.findOne({ email });
    if (schoolAlreadyExist) {
      return res.status(401).json({
        success: 0,
        message: "School Already Exist",
      });
    }
    const newSchool = creatNewSchool(req.body);
    if (!newSchool) {
      return res.status(401).json({
        success: 0,
        message: "School registration failed, please try again later",
      });
    }
    const newStaffMember = createNewStaff();
    if (!newStaffMember) {
      return res.status(401).json({
        success: 0,
        message: "Staff registration failed, please try again later",
      });
    }
    sendEmail(mailData(req?.body));// node mailer
     res.status(200).json({
      success: 1,
      message: "Successfully registered",
      data: { newSchool, newStaffMember }, // should token be added?
     
    });
  } catch (error) {
    dashLogger.error(`Error : ${error},Request : ${req.originalUrl}`);
     res.status(500).json({
      success: 0,
      message: "Database connection error || Data already exists",
    });
    next(error)
  }
};


export const getSchoolDetails=(req, res, next)=>{
    // Get School Details
const schoolData = await School.find()
.select('name, address, phone_number, email, logo_small, logo_long')
try {
    if(!schoolData){
        return res.status(401).json({
            success: 0,
            message: "Item not found",
          });
    }
    res.status(200).json({
        success: 1,
        data: schoolData,
      });
    
} catch (error) {
    dashLogger.error(`Error : ${error},Request : ${req.originalUrl}`);
    res.status(500).json({
     success: 0,
     message: "Database connection error || Data already exists",
   });
   next()
}
}

// Create Section
export const createSection= (req, res) => {
  let token = req.get("authorization");
  const body = req.body;
  body.created_by = getEmployeeId(token);
  createSection(body, (err, results) => {
    if (err) {
      console.log(err);
      dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
      return res.status(500).json({
        success: 0,
        message: "Database connection error || Duplication Error",
      });
    }
    return res.status(200).json({
      success: 1,
      message: "Successfully created section",
      data: results,
    });
  });
}
module.exports = {
  


  // Update Section
  updateSection: (req, res) => {
    let body = req.body;
    let token = req.get("authorization");
    body.updated_by = getEmployeeId(token);
    body.updated_at = new Date().toISOString();
    updateSection(body, (err, results) => {
      if (err) {
        console.log(err);
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(500).json({
          success: 0,
          message: "Database connection error || Duplication Error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Successfully updated section",
        data: results,
      });
    });
  },

  // Get Sections
  getSections: (req, res) => {
    getSections((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  // Create class
  createClass: (req, res) => {
    let token = req.get("authorization");
    const body = req.body;
    body.created_by = getEmployeeId(token);
    createClass(body, (err, results) => {
      if (err) {
        console.log(err);
        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
        return res.status(500).json({
          success: 0,
          message: "Database Error",
          data: err,
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Successfully created class",
        data: results,
      });
    });
  },

  // Get Classes
  getClasses: (req, res) => {
    getClasses((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
