import { type Request, type Response } from "express";
import { sendError, sendSuccess } from "../../shared/utils/apiResponse";
import { AuthError } from "./auth.errors";
import { validateRegisterInput } from "./auth.validators";
import User from "./models/User.model";
import { authRepository } from "./repositories/auth.repository";
import { setAuthCookies } from "./utils/auth.cookies";

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
    setAuthCookies(res, session.accessToken, session.refreshToken);
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

export const getCurrentUser = async (_req: Request, res: Response) => {
  try {
    const auth = res.locals.auth as { sub: string };
    const user = await User.findById(auth.sub);

    if (!user) {
      return sendError(res, 401, "UNAUTHORIZED", "User not found");
    }
    return sendSuccess(res, 200, user, "Current user fetched successfully");
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
      "Failed to check authenticated user",
    );
  }
};
