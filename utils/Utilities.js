import { verify, decode } from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: 0,
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: 0,
      message: "Access denied! unauthorized user",
    });
  }
};
export const getEmployeeId = (req) => {
  let token = req.slice(7);
  var decoded = decode(token);
  return decoded.result.employee_id;
};
export const alphaNum = () => Math.random().toString(36).replace("0.", "");
