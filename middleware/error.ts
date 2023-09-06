// import { NextFunction, Request, Response } from "express";

// export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
//   let error = { ...err };

//   error.message = err.message;

//   if (err.code === 11000) {
//     const message = `Duplicate Field value entered`;
//     error = res.status(400).json({ message });
//   }

//   if (err.name === "ValidationError") {
//     const message = Object.values(err.errors).map((val) => val.message);
//     error = res.status(400).json({ message });
//   }

//   console.log(error.message);

//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: error.message || "Server Error",
//   });
// };
