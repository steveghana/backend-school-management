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
import express, {Request, Response, NextFunction} from "express";
const schoolRouter = express.Router();
//
schoolRouter.post(
  "/",
  schoolValidator,
  ()=>
    validateMiddleware(schoolValidator)
  ,
  (req:Request, res:Response, next:NextFunction ) => {

    RegisterNewSchool(req, res,)
  }
);
schoolRouter.get("/", checkToken,(req:Request, res:Response, next:NextFunction ) => getSchoolDetails(req, res, next)); // I think this should be a reserved route for admin, what do you think

schoolRouter.post(
  "/class",
  checkToken,
  classValidator,()=>
  validateMiddleware(classValidator),(req:Request, res:Response, next:NextFunction)=>
  createClass(req, res, next)
);
schoolRouter.get("/class", checkToken,(req:Request, res:Response)=> getClasses(req, res, ));
schoolRouter.post(
  "/class/section",
  checkToken,
  sectionValidator,
  validateMiddleware(sectionValidator),(req:Request, res:Response, next:NextFunction)=> 
  createSection(req, res, next)
);
schoolRouter.patch("/class/section", checkToken,(req:Request, res:Response, next:NextFunction)=>  updateSection(req, res, next));
schoolRouter.get("/class/section", checkToken,(req:Request, res:Response, next:NextFunction)=>  getSections(req, res, next));
//
export default schoolRouter;
