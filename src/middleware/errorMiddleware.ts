import { Error } from "mongoose";
import { environment } from "../confit";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json({
    message: err.message,
    stack: environment === "production" ? null : err.stack,
  });
};

export default errorHandler;
