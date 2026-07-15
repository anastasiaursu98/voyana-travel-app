import jwt from "jsonwebtoken";
import type { AuthTokenUser } from "../../../types/api.types";

export const generateAccessToken = (user: AuthTokenUser) => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  return jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      role: user.role,
      tokenType: "access",
    },
    secret as string,
    {
      expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ??
        "15m") as jwt.SignOptions["expiresIn"],
    },
  );
};

export const generateRefreshToken = (user: AuthTokenUser) => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  return jwt.sign(
    {
      sub: String(user._id),
      tokenType: "refresh",
    },
    secret as string,
    {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ??
        "7d") as jwt.SignOptions["expiresIn"],
    },
  );
};
