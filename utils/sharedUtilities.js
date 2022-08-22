//For all status code and custom messages
import bcrypt from "bcryptjs";
export const customStatusMessage = (
  res,
  statusCode,
  success,
  message,
  data = null
) => {
  return res.status(statusCode).send({
    success,
    message,
    data,
  });
};

export const salt = bcrypt.genSaltSync(10);
