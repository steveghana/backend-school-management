import { createNewStaff, getEmployeeId } from "./staff.service.js";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/sendEmail.js";
import { salt } from "../../utils/sharedUtilities.js";
import jwt from "jsonwebtoken";
import { customStatusMessage } from "../../utils/sharedUtilities.js";
import { dashLogger } from "../../logs/logger.js";
import { Staff } from "./staff.model.js";
export const RegisterStaff = async (req, res, next) => {
  const { firstName, lastName, contact_Number, email, role, password } =
    req.body;
  let token = req.get("authorization");

  let employeeId = await getEmployeeId(token);
  try {
    const staff = await Staff.findOne({ employeeId }).select("role");
    if (staff.role !== "Admin") {
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
      firstName,
      lastName,
      contact_Number,
    });
    if (existingStaffMember || uniqueEmail) {
      customStatusMessage(res, 401, 0, "Staff Member already exist");
      return;
    }

    const newStaffMember = await createNewStaff(req.body, employeeId);
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
      firstName,
      lastName,
      employeeid: newStaffMember.employeeId,
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
export const deleteStaff = async (req, res, next) => {
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
//Authentication
export const StaffLogin = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let ExistinStaff = await Staff.findOne({ email });
    if (!ExistinStaff) {
      customStatusMessage(res, 401, "Invalid email or password");
      return;
    }
    const DoPasswordMatch = ExistinStaff.matchPassword(ExistinStaff.password);
    if (!DoPasswordMatch) {
      customStatusMessage(res, 401, 0, "Invalid password");
      return;
    }
    console.log(ExistinStaff.employeeId);
    const token = await jwt.sign(
      { id: ExistinStaff?.employeeId },
      process.env.SECRET
      // { expiresIn: "24hrs" }
    );
    customStatusMessage(res, 200, 1, "Login successful", {
      token,
      id: ExistinStaff.employeeId,
      name: ExistinStaff.firstName,
      lastName: ExistinStaff.lastName,
      Email: ExistinStaff.email,
    });
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

export const ForgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if Staff exists
  const { email } = req.body;
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) {
      customStatusMessage(
        res,
        401,
        0,
        "Invalid Email address, password reset failed"
      );
      return;
    }
    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = staff.getResetPasswordToken();
    await staff.save();
    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    // HTML Message
    const message = `
      <h1>${staff.firstName} have requested a password reset</h1>
      <p>Please click following link to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    const sent = sendEmail({
      email: staff.email,
      subject: "Password Reset Request",
      text: message,
    });
    if (!sent) {
      customStatusMessage(
        res,
        401,
        0,
        "Couldnt send email, please try again later"
      );
      staff.resetPasswordToken = undefined;
      staff.resetPasswordExpire = undefined;
      await staff.save();
      return;
    }
    customStatusMessage(res, 200, 1, "Email Sent");
    return;
  } catch (err) {
    dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
    next(err);
  }
};
//Forgot password controller
export const ResetPassword = async (req, res, next) => {
  // Check if the getResetPassword token generated and added to field exist and is inded the user
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const staff = await Staff.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!staff) {
      customStatusMessage(res, 401, 0, "Invalid token");
      return;
    }
    staff.password = bcrypt.hashSync(req.body.password, salt);
    staff.resetPasswordToken = undefined;
    staff.resetPasswordExpire = undefined;

    await staff.save();
    const token = await jwt.sign(
      { id: staff?.employeeId },
      process.env.SECRET,
      { expiresIn: "24hrs" }
    );
    customStatusMessage(res, 200, 1, "Password updated succesfully", token);
  } catch (error) {
    dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
    customStatusMessage(
      res,
      500,
      0,
      "Database connection error || Data already exists"
    );
    next(err);
  }
};
