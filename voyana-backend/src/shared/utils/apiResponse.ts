import type { Response } from "express";
import type {
  ApiErrorCode,
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../../types/api.types";

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string,
  count?: number,
) => {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
  };

  if (message) {
    response.message = message;
  }

  if (typeof count === "number") {
    response.count = count;
  }

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  code: ApiErrorCode,
  message: string,
  errors?: Record<string, string[]>,
) => {
  const response: ApiErrorResponse = {
    success: false,
    message,
    code,
    statusCode,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};
