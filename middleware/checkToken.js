import jwt from "jsonwebtoken";
export const checkToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(6);
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        customStatusMessage(res, 401, 0, "Invalid token");
      } else {
        next();
      }
    });
  } else {
    customStatusMessage(res, 401, 0, "Access denied! unathorized user");
  }
};
