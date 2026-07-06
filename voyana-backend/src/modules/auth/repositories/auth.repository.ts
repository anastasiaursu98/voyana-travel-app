import bcrypt from "bcryptjs";
import {
  isNonEmptyString,
  isValidEmail,
  normalizeEmail,
} from "../../../shared/utils/validators";
import { AuthError } from "../auth.errors";
import { toPublicAuthUser } from "../auth.mappers";
import {
  createEmailVerificationCode,
  sendEmailVerificationCode,
} from "../auth.otp.service";
import { generateAccessToken } from "../auth.tokens";
import type {
  LoginInput,
  RegisterInput,
  ResendEmailOtpInput,
  VerifyEmailOtpInput,
} from "../auth.types";
import User from "../models/User.model";

export const authRepository = {
  async register({ firstName, lastName, email, password }: RegisterInput) {
    const existingUser = await User.findOne({ email }).select("email");

    if (existingUser) {
      throw new AuthError(409, "CONFLICT", "User already exists", {
        email: ["Email is already in use"],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { code, hashedVerificationCode, emailVerificationExpiresAt } =
      await createEmailVerificationCode();

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      emailVerificationTokenHash: hashedVerificationCode,
      emailVerificationExpiresAt,
    });

    await sendEmailVerificationCode({
      email: newUser.email,
      firstName: newUser.firstName,
      verificationCode: code,
    });

    return toPublicAuthUser(newUser);
  },

  async verifyOtp({ email, code }: VerifyEmailOtpInput) {
    if (
      !isNonEmptyString(email) ||
      !isValidEmail(normalizeEmail(email)) ||
      !isNonEmptyString(code)
    ) {
      throw new AuthError(
        400,
        "BAD_REQUEST",
        "Email and verification code are required",
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const verificationCode = code.trim();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+emailVerificationTokenHash +emailVerificationExpiresAt",
    );

    if (!user) {
      throw new AuthError(
        400,
        "BAD_REQUEST",
        "Invalid email or verification code",
      );
    }

    if (user.isEmailVerified) {
      return toPublicAuthUser(user);
    }

    if (!user.emailVerificationTokenHash || !user.emailVerificationExpiresAt) {
      throw new AuthError(
        400,
        "BAD_REQUEST",
        "Invalid email or verification code",
      );
    }

    if (user.emailVerificationExpiresAt < new Date()) {
      throw new AuthError(
        400,
        "BAD_REQUEST",
        "Invalid email or verification code",
      );
    }

    const isCodeValid = await bcrypt.compare(
      verificationCode,
      user.emailVerificationTokenHash,
    );

    if (!isCodeValid) {
      throw new AuthError(
        400,
        "BAD_REQUEST",
        "Invalid email or verification code",
      );
    }

    user.isEmailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpiresAt = undefined;
    await user.save();

    return toPublicAuthUser(user);
  },

  async resendOtp({ email }: ResendEmailOtpInput) {
    if (!isNonEmptyString(email) || !isValidEmail(normalizeEmail(email))) {
      throw new AuthError(400, "BAD_REQUEST", "Valid email is required");
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+emailVerificationTokenHash +emailVerificationExpiresAt",
    );

    if (!user) {
      throw new AuthError(404, "NOT_FOUND", "User not found");
    }

    if (user.isEmailVerified) {
      return toPublicAuthUser(user);
    }

    const { code, hashedVerificationCode, emailVerificationExpiresAt } =
      await createEmailVerificationCode();

    user.emailVerificationTokenHash = hashedVerificationCode;
    user.emailVerificationExpiresAt = emailVerificationExpiresAt;
    await user.save();

    await sendEmailVerificationCode({
      email: user.email,
      firstName: user.firstName,
      verificationCode: code,
    });

    return toPublicAuthUser(user);
  },

  async login({ email, password }: LoginInput) {
    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      throw new AuthError(
        400,
        "BAD_REQUEST",
        "Email and password are required",
      );
    }

    const user = await User.findOne({
      email: normalizeEmail(email),
    }).select("+password +isEmailVerified");

    if (!user) {
      throw new AuthError(401, "UNAUTHORIZED", "Invalid credentials");
    }

    if (!user.isEmailVerified) {
      throw new AuthError(401, "UNAUTHORIZED", "Email is not verified");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AuthError(401, "UNAUTHORIZED", "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);

    user.lastLoginAt = new Date();
    await user.save();

    return { accessToken, user: toPublicAuthUser(user) };
  },
};
