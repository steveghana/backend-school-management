import { createNewStaff } from "./staff.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { customStatusMessage } from "../../utils/sharedUtilities.js";
import { dashLogger } from "../../logs/logger.js";
import { Staff } from "./staff.model.js";
export const RegisterStaff = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existingStaffMember = await Staff.findOne({ email });
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
};
export const getStaffInfos = async (req, res, next) => {
  try {
    const activeStaffMembers = await Staff.find(
      {}
      // { 'firstname, lastName, employeeId' }
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
};
export const getStaffByEmployeeId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const staffWithReqId = await Staff.findOne({ employeeId: id }).select(
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
};

export const StaffLogin = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let ExistinStaff = await Staff.find({ email });
    if (!ExistinStaff) {
      customStatusMessage(res, 401, "Invalid email or password");
      return;
    }
    const DoPasswordMatch = bcrypt.compareSync(
      password,
      ExistinStaff[0].password
    );
    if (!DoPasswordMatch) {
      customStatusMessage(res, 401, 0, "Invalid password");
      return;
    }
    const token = await jwt.sign(
      { result: ExistinStaff?.password },
      process.env.SECRET,
      { expiresIn: "1hr" }
    );
    customStatusMessage(res, 200, 1, "Login successful", {
      token,
      id: ExistinStaff[0].employeeId,
      name: ExistinStaff[0].firstname,
      lastName: ExistinStaff[0].lastName,
      Email: ExistinStaff[0].email,
    });
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
};
