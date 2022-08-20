const {
  register,
  getDetails,
  createSection,
  updateSection,
  getSections,
  createClass,
  getClasses,
} = require("./school.service");
const { genSaltSync, hashSync } = require("bcrypt");
import { School, Staff } from "./school.model";
const { alphaNum } = require("../../utils/generate");
import sendEmail from "../../utils/sendEmail";
const { dashLogger } = require("../../logs/logger");
const { getEmployeeId } = require("../../auth/token_validation");

export const RegisterNewSchool = (req, res, next) => {
  const {
    email,
    address,
    phone_number,
    logo_long,
    logo_small,
    created_by,
    name,
  } = req.body;
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
    if(newSchool){
        const data = {
            email: body.super_admin_email,
            subject: "Heritage Baptist Staff Account",
            text:
              "Hello " +
              body.super_admin_firstname +
              ", your staff account has been created successfully. Your password is " +
              rawPassword,
          };
          const salt = genSaltSync(10);
          const rawPassword = alphaNum();
          const newStaff = await Staff.create({
            employee_id: "SU001",
            role: "1",
            email: body.super_admin_email,
            password: hashSync(rawPassword, salt),
            createdAt: Date.now()
          })
          if(newStaff){

              sendEmail(data);
              return res.status(200).json({
                  success: 1,
                  message: "Successfully registered",
                  data: results,
                }); 
            }
            else{
                return res.status(401).json({
                    success: 0,
                    message: "Couldn't register a staff, please try again later",
                  }); 
            }
    }
  } catch (error) {
    dashLogger.error(`Error : ${error},Request : ${req.originalUrl}`);
    return res.status(500).json({
        success: 0,
        message: "Database connection error || Data already exists",
      });
  }
};

module.exports = {
  // Register New School
  register: (req, res) => {
    const body = req.body;
    if (body.access_code !== process.env.ACCESS_CODE) {
      return res.status(401).json({
        success: 0,
        message: "Unauthorized to register school",
      });
    } else {
      body.super_admin_employee_id = "SU001";
      body.super_admin_role = "1";
      const salt = genSaltSync(10);
      const rawPassword = alphaNum();
      body.super_admin_password = hashSync(rawPassword, salt);
      body.created_at = Date.now();
      register(body, (err, results) => {
        if (err) {
          console.log(err);
          dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
          return res.status(500).json({
            success: 0,
            message: "Database connection error || Data already exists",
          });
        }



        const data = {
          email: body.super_admin_email,
          subject: "Heritage Baptist Staff Account",
          text:
            "Hello " +
            body.super_admin_firstname +
            ", your staff account has been created successfully. Your password is " +
            rawPassword,
        };
        send(data);
        return res.status(200).json({
          success: 1,
          message: "Successfully registered",
          data: results,
        });
      });
    }
  },

  // Get School Details
  getDetails: (req, res) => {
    getDetails((err, results) => {
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

  // Create Section
  createSection: (req, res) => {
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
  },

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
