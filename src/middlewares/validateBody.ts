import { Request, Response, NextFunction } from "express";
import * as z from "zod";

export const validateBody = (schema: z.ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
