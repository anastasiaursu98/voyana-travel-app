import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { AuthError } from "./auth.errors";
import { validateRegisterInput } from "./auth.validators";
import { authRepository } from "./repositories/auth.repository";

const isDuplicateKeyError = (error: unknown) => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validation = validateRegisterInput(req.body);

    if (validation.errors) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        "Invalid register input",
        validation.errors,
      );
    }

    const user = await authRepository.register(validation.value);

    return sendSuccess(res, 201, user, "User registered successfully");
  } catch (error) {
    if (error instanceof AuthError) {
      return sendError(
        res,
        error.statusCode,
        error.code,
        error.message,
        error.errors,
      );
    }

    if (isDuplicateKeyError(error)) {
      return sendError(res, 409, "CONFLICT", "User already exists");
    }

    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to register user",
    );
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const session = await authRepository.login({ email, password });

    return sendSuccess(res, 200, session, "User logged in successfully");
  } catch (error) {
    if (error instanceof AuthError) {
      return sendError(
        res,
        error.statusCode,
        error.code,
        error.message,
        error.errors,
      );
    }

    return sendError(res, 500, "INTERNAL_SERVER_ERROR", "Failed to login user");
  }
};

export const resendEmailOTp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await authRepository.resendOtp({ email });

    return sendSuccess(res, 200, null, "Verification code sent successfully");
  } catch (error) {
    if (error instanceof AuthError) {
      return sendError(
        res,
        error.statusCode,
        error.code,
        error.message,
        error.errors,
      );
    }

    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to resend verification code",
    );
  }
};

export const verifyEmailOTp = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const user = await authRepository.verifyOtp({ email, code });

    return sendSuccess(res, 200, user, "Email verified successfully");
  } catch (error) {
    if (error instanceof AuthError) {
      return sendError(
        res,
        error.statusCode,
        error.code,
        error.message,
        error.errors,
      );
    }

    return sendError(
      res,
      500,
      "INTERNAL_SERVER_ERROR",
      "Failed to verify email OTP",
    );
  }
};
