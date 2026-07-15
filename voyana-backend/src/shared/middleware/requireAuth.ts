import jwt from "jsonwebtoken";
import { sendError } from "../utils/apiResponse";

import type { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return sendError(res, 401, "UNAUTHORIZED", "Missing access token");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    res.locals.auth = payload;

    return next();
  } catch {
    return sendError(res, 401, "UNAUTHORIZED", "Invalid token");
  }
};
