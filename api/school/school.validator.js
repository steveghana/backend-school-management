import { check } from "express-validator";
export const schoolValidator = [
  check("name").isString().withMessage("Enter a name").trim(),
  check("address").isString().withMessage("Enter an Address").trim(),
  check("phone_number")
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
  check("access_code").isString().withMessage("Enter an access code").trim(),
];
export const classValidator = [
  check("class").isString().withMessage("Enter a class").trim(),
];
export const sectionValidator = [
  check("section").isString().withMessage("Enter a section").trim(),
];
