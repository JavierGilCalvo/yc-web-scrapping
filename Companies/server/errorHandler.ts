import { NextFunction, Request, Response } from "express";
import { CustomError } from "./types";

const dotenv = require("dotenv").config();
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 501;
  const errorDetails =
    process.env.NODE_ENV === "development" ? error.stack : {};
  const errorMessage = error.message || "";

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    errorDetails,
    errorMessage,
  });
};
