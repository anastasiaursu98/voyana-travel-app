import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/apiResponse";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return sendError(res, 401, "UNAUTHORIZED", "Missing access token");
  }

  const token = authHeader.slice("Bearer ".length);
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    return sendError(res, 500, "INTERNAL_SERVER_ERROR", "JWT secret missing");
  }

  try {
    jwt.verify(token, secret);
    return next();
  } catch {
    return sendError(res, 401, "UNAUTHORIZED", "Invalid or expired token");
  }
};
