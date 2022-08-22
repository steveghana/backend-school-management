import { check } from "express-validator";
export const staffValidator = [
  check("firstname").isString().withMessage("Enter a first Name").trim(),
  check("localAddress").isString().withMessage("Enter an Address").trim(),
  check("contact_number")
    .isString()
    .withMessage("Enter a phone number")
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone number must be at least 10 characters long")
    .trim(),
  check("email")
    .isEmail()
    .isString()
    .withMessage("Enter a valid email address")
    .trim(),
  check("password")
    .isString()
    .withMessage("Enter a password")
    .isLength({ min: 5, max: 20 })
    .withMessage("Password number must be at least 5 characters long")
    .trim(),
  check("role").isString().withMessage("Enter a role").trim(),
  check("created_By").isString().withMessage("Enter a name").trim(),
];

export const staffLoginValidator = [
  check("email")
    .isEmail()
    .isString()
    .withMessage("Enter a valid email address")
    .trim(),
  check("password").isString().withMessage("Enter a password").trim(),
];
