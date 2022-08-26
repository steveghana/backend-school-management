import { check } from "express-validator";
export const studentValidator = [
  check("firstName").isString().withMessage("Enter a first Name").trim(),
  check("localAddress").isString().withMessage("Enter an Address").trim(),
  check("lastName").isString().withMessage("Enter your last name").trim(),
  check("town").isString().withMessage("Enter a Town").trim(),
  check("city").isString().withMessage("Enter a city").trim(),
  check("guardian").isString().withMessage("Enter a guardian Name").trim(),
  check("gender").isString().withMessage("Enter a gender").trim(),
  check("Class").isString().withMessage("Enter the class of student").trim(),
];
