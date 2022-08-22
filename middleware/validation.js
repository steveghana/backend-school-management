import { validationResult } from "express-validator";
import { customStatusMessage } from "../utils/sharedUtilities.js";
//This catches errors from the validator
export const validateMiddleware = (whatToValidate) => {
  try {
    return async (req, res, next) => {
      await Promise.all(whatToValidate.map((validate) => validate.run(req)));
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      customStatusMessage(res, 401, 0, { errors: errors.array() });
      return;
    };
  } catch (error) {
    console.log(error);
  }
};
