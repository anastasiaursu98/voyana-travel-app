import jwt from "jsonwebtoken";

export const generateAccessToken = (user: {
  _id: unknown;
  email: string;
  role: string;
}) => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is missing");
  }

  return jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      role: user.role,
    },
    secret as any,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    } as any,
  );
};
