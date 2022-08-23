import { createNewStaff, getEmployeeId } from "./staff.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { customStatusMessage } from "../../utils/sharedUtilities.js";
import { dashLogger } from "../../logs/logger.js";
import { Staff } from "./staff.model.js";
export const RegisterStaff = async (req, res, next) => {
  const { firstname, lastName, contact_Number, email } = req.body;
  let token = req.get("authorization");

  let employeeId = await getEmployeeId(token);
  try {
    const { role } = await Staff.findOne({ employeeId }).select("role");
    if (role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to register staff, Admin credentials needed"
      );
      return;
    }
    const uniqueEmail = await Staff.findOne({
      email,
    });
    const existingStaffMember = await Staff.findOne({
      firstname,
      lastName,
      contact_Number,
    });
    if (existingStaffMember || uniqueEmail) {
      customStatusMessage(res, 401, 0, "Staff Member already exist");
      return;
    }

    const newStaffMember = createNewStaff(req.body, employeeId);
    if (!newStaffMember) {
      customStatusMessage(
        res,
        401,
        0,
        "Staff registration failed, please try again later"
      );
      return;
    }
    customStatusMessage(res, 200, 1, "Staff registered successfully", {
      firstname,
      lastName,
      employeeId,
      role,
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
export const getStaffInfos = async (req, res, next) => {
  let token = req.get("authorization");

  let employeeId = await getEmployeeId(token);
  try {
    const { role } = await Staff.findOne({ employeeId }).select("role");
    if (role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to get staff info, Admin credentials needed"
      );
      return;
    }
    const activeStaffMembers = await Staff.find({}); //Filter what you need on frontEnd
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
    const staffWithReqId = await Staff.findOne({ employeeId: id }); //Filter on frontend
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
      { expiresIn: "24hr" }
    );
    customStatusMessage(res, 200, 1, "Login successful", {
      token,
      id: ExistinStaff[0].employeeId,
      name: ExistinStaff[0].firstName,
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
//Get individual StaffInfo only admin credentials needed
export const getIndividualStaffInfo = async (req, res, next) => {
  let { firstname, lastName, role } = req.body;
  let token = req.get("authorization");
  let adminId = await getEmployeeId(token);
  try {
    const isAdmin = await Staff.findOne({ employeeId: adminId }).select("role");
    if (isAdmin.role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to get staff info, Admin credentials needed"
      );
      return;
    }
    const staffWithReqInfo = await Staff.findOne({ firstname, lastName, role }); //Filter on frontend
    if (!staffWithReqInfo) {
      customStatusMessage(res, 401, 0, "Staff record not found");
      dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", staffWithReqInfo);
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
// Update Staff
export const updateSection = async (req, res, next) => {
  let { employeeId } = req.body;
  let token = req.get("authorization");
  try {
    /* !important: Remember to always
    add the employee id from the front end as a way to query
     and find that specific employee for update
     */
    let employeeid = await getEmployeeId(token);
    let whoIsUpdating = await Staff.findOne({ employeeid });
    let updated = await Staff.findOneAndUpdate(
      //query
      { employeeId },
      {
        //update
        updated_By: `${employeeid}-${whoIsUpdating?.role}`,
        ...req.body,
        updated_At: Date.now(),
      }
    );
    // console.log(updated);
    if (!updated) {
      dashLogger.error(
        `Error : Staff couldnt update ,Request : ${req.originalUrl}`
      );
      customStatusMessage(res, 402, 0, "Couldn't updated section");
      return;
    }
    const getUpdatedVersion = await Staff.findOne({ employeeId }).select(
      "firstName lastName role employeeId"
    );
    customStatusMessage(
      res,
      200,
      1,
      "Succesfully updated section",
      getUpdatedVersion
    );
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
export const deletStaff = async (req, res, next) => {
  let { body } = req;
  let token = req.get("authorization");

  let employeeId = await getEmployeeId(token);
  try {
    const isAdmin = await Staff.findOne({ employeeId }).select("role");
    if (isAdmin.role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to delete staff, Admin credentials needed"
      );
      return;
    }
    const staffWithReqInfo = await Staff.findOneAndDelete({
      ...body,
    });
    if (!staffWithReqInfo) {
      customStatusMessage(res, 401, 0, "Staff record not found");
      dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
      return;
    }
    customStatusMessage(res, 200, 1, "Staff Deletion Successful");
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
