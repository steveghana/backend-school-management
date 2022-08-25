import { Student } from "./student.model.js";
import { Staff } from "../staff/staff.model.js";
import { customStatusMessage } from "../../utils/sharedUtilities.js";
import { dashLogger } from "../../logs/logger.js";
import { createNewStudent, getEmployeeId } from "./student.service.js";
export const RegisterStudent = async (req, res, next) => {
  const { firstName, Class, lastName, town, guardian, gender } = req.body;
  /* Problem!
  How do you we generated a new Admission number from the potential pretora of numbers to avoid duplicate collision
  Just a simple Math.random() with range wont even work here.
  */
  let token = req.get("authorization");
  let employeeId = await getEmployeeId(token);
  try {
    const { role } = await Staff.findOne({ employeeId }).select("role");
    if (role === "Admin" || role === "Receptionist") {
      const existingStudent = await Student.findOne({
        firstName,
        lastName,
        Class,
        town,
        gender,
      });
      if (existingStudent) {
        customStatusMessage(
          res,
          401,
          0,
          "A student with the same credentials already exist"
        );
        return;
      }
      const newStudent = await createNewStudent(req.body, employeeId);
      if (!newStudent) {
        customStatusMessage(
          res,
          401,
          0,
          "Student registration failed, please try again later"
        );
        return;
      }
      customStatusMessage(res, 200, 1, "Student registered successfully", {
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        Class: newStudent.Class,
      });
      return;
    }
    customStatusMessage(
      res,
      401,
      0,
      "Only a receptionist or Admin is allowed to register a student"
    );
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
export const getStudentInfos = async (req, res, next) => {
  try {
    const allStudents = await Student.find({}); // Its better to filter on front end
    if (!allStudents.length) {
      customStatusMessage(res, 401, 0, "Records not found");
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", allStudents);
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
export const getStudentByUniqueCredentials = async (req, res, next) => {
  // const { firstName, lastName, Class } = req.body;
  try {
    const studentWithAdmissionNo = await Student.find({
      ...req.body,
    }); //Filter on frontend
    if (!studentWithAdmissionNo.length) {
      customStatusMessage(res, 401, 0, "Record not found");
      dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", studentWithAdmissionNo);
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

export const updateStudentInfo = async (req, res, next) => {
  const { id } = req.body;
  let token = req.get("authorization");
  let employeeId = await getEmployeeId(token);
  //Remeber to pass the student id to query the student first
  try {
    //Get who is currently updating
    let { role } = await Staff.findOne({ employeeId }).select("role");
    //Get who recently updated
    const whoRecentlyUpdated = await Student.findOne({
      admission_id: id,
    });
    //if currently updating staff === accountant, the request must contain only monitory fields
    if (role === "Accountant" && (!req.body.BusFee || !req.body.Fee)) {
      customStatusMessage(
        res,
        401,
        0,
        "An accountant can only update money related transactions"
      );
      return;
    }

    let { updated_By } = whoRecentlyUpdated;
    let roleOfUpdator = null; //role of that person
    //If somebody has already updated
    if (updated_By !== "Not Provided") {
      //Get the role of that person
      let { role } = await Staff.findOne({ employeeId: updated_By }).select(
        "role"
      );
      //Assign to updator
      roleOfUpdator = role;
    }
    /* 
    If the role of the person who recently updated is the acc, the req body contains
    monitory fields and the person currently updating is not an accountant, 
    throw a warning
     */
    if (
      roleOfUpdator === "Accountant" ||
      (roleOfUpdator === "Admin" &&
        (req.body.BusFee || req.body.schoolFees) &&
        role !== "Accountant")
    ) {
      customStatusMessage(
        res,
        401,
        0,
        "Only an accountant or Admin is allowed to updated money related records"
      );
      return;
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { admission_id: id },
      {
        $set: {
          ...req.body,
          updated_By: employeeId,
          Fee_updated_by:
            role === "Accountant" || role === "Admin"
              ? employeeId
              : "Not Provided",
        },
      }
    );
    customStatusMessage(res, 200, 1, "Student update successful", {
      firstName: updatedStudent.firstName,
      lastName: updatedStudent.lastName,
    });
    return;
  } catch (error) {
    dashLogger.error(`Error : ${error.message},Request : ${req.originalUrl}`);
    customStatusMessage(
      res,
      500,
      0,
      "Cant connect to database, try again later"
    );
    next(error);
  }
};

export const getStudentsByAdmissionClass = async (req, res, next) => {
  const { classOfStudents } = req.body;
  console.log(classOfStudents);
  try {
    const allStudentsInClass = await Student.find({ Class: classOfStudents }); //Filter on frontend
    if (!allStudentsInClass) {
      dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
      customStatusMessage(res, 401, 0, "Record not found");
      return;
    }
    customStatusMessage(res, 200, 1, "Successful", allStudentsInClass);
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

export const deleteStudent = async (req, res, next) => {
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
    const studentWithThatInfo = await Student.findOneAndDelete({
      ...body,
    });
    if (!studentWithThatInfo) {
      customStatusMessage(res, 401, 0, "Student record not found");
      dashLogger.error(`Error : Record not found,Request : ${req.originalUrl}`);
      return;
    }
    customStatusMessage(res, 200, 1, "Student was Successfully deleted");
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
