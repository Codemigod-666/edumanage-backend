import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

const roleHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;

  if (data.role === "admin" || data.role === "superadmin") {
    next();
  } else {
    res.sendStatus(401);
    throw new Error("Role Access not Provided" + err);
  }
};

export default roleHandler;
