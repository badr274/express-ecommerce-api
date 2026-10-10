import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 5);

  if (!Number.isInteger(page) || page < 1) {
    throw new AppError("Invalid page", 400);
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new AppError("Invalid limit", 400);
  }

  res.locals.pagination = { page, limit };

  next();
};
