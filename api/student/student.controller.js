import { createNewStaff } from "./staff.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { customStatusMessage } from "../../utils/sharedUtilities.js";
import { dashLogger } from "../../logs/logger.js";
import { Staff } from "./staff.model.js";
const { create, getStudents, getStaffByAdmissionNo, getStaffsByClass } = require("./staff.service");
export const RegisterStudent =(req, res, next)=>{
    const { admissionNumber } = req.body;
    try {
      const existingStaffMember = await Staff.findOne({ admission_no: admissionNumber });
      if (existingStaffMember) {
        customStatusMessage(res, 401, 0, "Staff Member already exist");
        return;
      }
      const newStaffMember = createNewStaff(req.body);
      if (!newStaffMember) {
        customStatusMessage(
          res,
          401,
          0,
          "Staff registration failed, please try again later"
        );
        return;
      }
      customStatusMessage(res, 200, 1, "Staff registered successfully");
      return;
    } catch (error) {
      customStatusMessage(
        res,
        500,
        0,
        "Database connection error || Data already exists"
      );
      next(error);
    }
}
export const getStudentInfos=()=>{
    try {
        const activeStaffMembers = await Staff.find(
          {}
        ).select("firstname lastName employeeId role");
        if (!activeStaffMembers) {
          customStatusMessage(res, 401, 0, "Records not found");
          return;
        }
        customStatusMessage(res, 200, 1, "Successful", activeStaffMembers);
        return;
      } catch (error) {
        customStatusMessage(
          res,
          500,
          0,
          "Database connection error || Data already exists"
        );
        next(error);
      }
}
export const getStudentByAdmissionNO=()=>{
    const { admissionNumber } = req.params;
    try {
      const staffWithReqId = await Staff.findOne({ admission_no: admissionNumber }).select(
        "firstname lastName email"
      );
      if (!staffWithReqId) {
        customStatusMessage(res, 401, 0, "Record not found");
        dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
        return;
      }
      customStatusMessage(res, 200, 1, "Successful", staffWithReqId);
      return;
    } catch (error) {
      dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
      customStatusMessage(
        res,
        500,
        0,
        "Database connection error || Data already exists"
      );
      next(error);
    }
}
export const getStudentByAdmissionClass=()=>{
    const { Class } = req.params;

    try {
      const staffWithReqId = await Staff.findOne({ class: Class }).select(
        "firstname lastName email"
      );
      if (!staffWithReqId) {
        customStatusMessage(res, 401, 0, "Record not found");
        dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
  
        return;
      }
      customStatusMessage(res, 200, 1, "Successful", staffWithReqId);
      return;
    } catch (error) {
      dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
      customStatusMessage(
        res,
        500,
        0,
        "Database connection error || Data already exists"
      );
      next(error);
    }
}
module.exports = {
    create: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getStudents: (req, res) => {
        getStudents((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getStaffByAdmissionNo: (req, res) => {
        const id = req.params.id;
        getStaffByAdmissionNo(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getStaffsByClass: (req, res) => {
        const id = req.params.id;
        getStaffsByClass(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
}