import { check } from "express-validator";
export const StaffAttendanceValidator = [
  check("firstName").isString().withMessage("Enter a first Name").trim(),
  check("lastName").isString().withMessage("Enter your last name").trim(),
  check("role").isString().withMessage("Enter your role").trim(),
  check("loggedTime").isString().withMessage("Enter your logged time").trim(),
];
