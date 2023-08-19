import {
  RegisterNewSchool,
  getSchoolDetails,
  createSection,
  updateSection,
  getSections,
  createClass,
  getClasses,
} from "./school.controller.ts";
import { checkToken } from "../../middleware/checkToken.ts";
import {
  schoolValidator,
  classValidator,
  sectionValidator,
} from "./school.validator.ts";
import { validateMiddleware } from "../../middleware/validation.ts";
import express from "express";
const schoolRouter = express.Router();
//
schoolRouter.post(
  "/",
  schoolValidator,
  validateMiddleware(schoolValidator),
  RegisterNewSchool
);
schoolRouter.get("/", checkToken, getSchoolDetails); // I think this should be a reserved route for admin, what do you think

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
