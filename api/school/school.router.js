import {
  RegisterNewSchool,
  getSchoolDetails,
  createSection,
  updateSection,
  getSections,
  createClass,
  getClasses,
} from "./school.controller.js";
import { checkToken } from "../../middleware/checkToken.js";
import {
  schoolValidator,
  classValidator,
  sectionValidator,
} from "./school.validator.js";
import { validateMiddleware } from "../../middleware/validation.js";
import express from "express";
const schoolRouter = express.Router();
//
schoolRouter.post(
  "/",
  schoolValidator,
  validateMiddleware(schoolValidator),
  RegisterNewSchool
);
schoolRouter.get("/", checkToken, getSchoolDetails);
schoolRouter.post(
  "/class",
  checkToken,
  classValidator,
  validateMiddleware(classValidator),
  createClass
);
schoolRouter.get("/class", checkToken, getClasses);
schoolRouter.post(
  "/class/section",
  checkToken,
  sectionValidator,
  validateMiddleware(sectionValidator),
  createSection
);
schoolRouter.patch("/class/section", checkToken, updateSection);
schoolRouter.get("/class/section", checkToken, getSections);
//
export default schoolRouter;
