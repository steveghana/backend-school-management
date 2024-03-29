import { createNewStaff, getEmployeeId } from "./staff.service.ts";
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import sendEmail from "../../utils/sendEmail.ts";
import { salt } from "../../utils/sharedUtilities.ts";
import jwt from "jsonwebtoken";
import { customStatusMessage } from "../../utils/sharedUtilities.ts";
import { dashLogger } from "../../logs/logger.ts";
// import { Staff } from "./staff.model.ts";
import { NextFunction, Request, Response } from "express";
import { Dependencies, injectDependencies } from "../../utils/dependencyInjector.ts";
export const RegisterStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies:Dependencies = null
) => {
  dependencies = injectDependencies(dependencies, ['db'])
  const { firstName, lastName, contact_Number, email, role, password } =
    req.body;
  let token = req.get("authorization");

  let employeeId = await getEmployeeId(token) as string;
  try {
    const staff  = await dependencies.db?.models.Staff?.findOne({where:{ employeeId} }) as unknown as Record<string, string>;
    if ( staff.role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to register staff, Admin credentials needed"
      );
      return;
    }
    const uniqueEmail = await dependencies.db?.models.Staff?.findOne({
      where:
    {
      email,

    }
    });
    const existingStaffMember = await dependencies.db?.models.Staff?.findOne({ where:{

      firstName,
      lastName,
      phone_number:contact_Number
    }
    });
    if (existingStaffMember || uniqueEmail) {
      customStatusMessage(res, 401, 0, "Staff Member already exist");
      return;
    }

    const newStaffMember = await createNewStaff(req.body, employeeId, dependencies);
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
export const getStaffInfos = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies:Dependencies = null 
  
  ) => {
  dependencies = injectDependencies(dependencies, ['db'])
  let token = req.get("authorization");

  let employeeId = await getEmployeeId(token);
  try {
    const staff = await dependencies.db?.models.Staff?.findOne({ where: {employeeId }})
    if (staff?.role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to get staff info, Admin credentials needed"
      );
      return;
    }
    const activeStaffMembers = await dependencies.db?.models.Staff?.findAll({}); //Filter what you need on frontEnd
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
export const getStaffByEmployeeId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies:Dependencies = null
) => {
  dependencies = injectDependencies(dependencies, ['db'])
  const { id } = req.params;
  try {
    const staffWithReqId = await dependencies.db?.models.Staff?.findOne({where:{ employeeId: id} }); //Filter on frontend
    if (!staffWithReqId) {
      customStatusMessage(res, 401, 0, "Record not found");
      dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", staffWithReqId);
    return;
  } catch (error:any) {
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
export const getIndividualStaffInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies :Dependencies = null
) => {
dependencies = injectDependencies(dependencies, ['db'])
  let { firstname, lastName, role } = req.body;
  let token = req.get("authorization");
  let adminId = await getEmployeeId(token);
  try {
    const isAdmin = await dependencies.db?.models.Staff?.findOne({ where: {employeeId: adminId} })
    if (isAdmin!.role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to get staff info, Admin credentials needed"
      );
      return;
    }
    const staffWithReqInfo = await dependencies.db?.models.Staff?.findOne({where:{  lastName, role, firstName: firstname} }); //Filter on frontend
    if (!staffWithReqInfo) {
      customStatusMessage(res, 401, 0, "Staff record not found");
      dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", staffWithReqInfo);
    return;
  } catch (error:any) {
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
export const updateSection = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies :Dependencies = null
) => {
dependencies = injectDependencies(dependencies, ['db'])
  let { employeeId } = req.body;
  let token = req.get("authorization");
  try {
    /* !important: Remember to always
    add the employee id from the front end as a way to query
     and find that specific employee for update
     */
    let employeeid = await getEmployeeId(token);
    let whoIsUpdating = await dependencies.db.models.Staff.findOne({where: { employeeId} });
    let updated = await dependencies.db.models.Staff.update(
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
    const getUpdatedVersion = await dependencies.db.models.Staff.findOne({ where: {employeeId} })
    // .select(
    //   "firstName lastName role employeeId"
    // );
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
export const deleteStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies :Dependencies = null
) => {
dependencies = injectDependencies(dependencies, ['db'])
  let { body } = req;
  let token = req.get("authorization");

  let employeeId = await getEmployeeId(token);
  try {
    const isAdmin = await dependencies.db.models.Staff.findOne({where: {employeeId},  });
    if (isAdmin.role !== "Admin") {
      customStatusMessage(
        res,
        401,
        0,
        "Unauthorised to delete staff, Admin credentials needed"
      );
      return;
    }
    const staffWithReqInfo = await dependencies.db.models.Staff.destroy({
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
export const StaffLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies :Dependencies = null
) => {
dependencies = injectDependencies(dependencies, ['db'])
  let { email } = req.body;
  try {
    let ExistinStaff = await dependencies.db.models.Staff.findOne({where: {email} });
    if (!ExistinStaff) {
      customStatusMessage(res, 401, 0, "Invalid email or password");
      return;
    }
    // const DoPasswordMatch = ExistinStaff.matchPassword(ExistinStaff.password);
    //To do; change password
    // if (!DoPasswordMatch) {
    //   customStatusMessage(res, 401, 0, "Invalid password");
    //   return;
    // }
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

export const ForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies :Dependencies = null
) => {
dependencies = injectDependencies(dependencies, ['db'])
  // Send Email to email provided but first check if Staff exists
  const { email } = req.body;
  try {
    const staff = await dependencies.db.models.Staff.findOne({where: {email} });
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
    // const resetToken = staff.getResetPasswordToken();
    await staff.save();
    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${'resetToken'}`;
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
      // staff.resetPasswordToken = undefined;
      // staff.resetPasswordExpire = undefined;
      await staff.save();
      return;
    }
    customStatusMessage(res, 200, 1, "Email Sent");
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
//Forgot password controller
export const ResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
  dependencies :Dependencies = null
) => {
dependencies = injectDependencies(dependencies, ['db'])
dependencies.db?.models
  // Check if the getResetPassword token generated and added to field exist and is inded the user
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
    
  try {
    const staff = await dependencies.db.models.Staff.findOne({ where : {

      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    }
    });
    if (!staff) {
      customStatusMessage(res, 401, 0, "Invalid token");
      return;
    }
    staff.password = bcrypt.hashSync(req.body.password, salt);
    // staff.resetPasswordToken = undefined;
    // staff.resetPasswordExpire = undefined;

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
    next(error);
  }
};
