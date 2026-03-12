import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { UserRole } from "@/db/models/User.model";

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Missing user data", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError("Unauthorized", 403);
    }

    next();
  };
};