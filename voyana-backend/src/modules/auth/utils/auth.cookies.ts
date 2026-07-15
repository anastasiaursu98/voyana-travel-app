import type { Response } from "express";

const ACCESS_COOKIE_NAME = process.env.JWT_ACCESS_COOKIE_NAME ?? "accessToken";
const REFRESH_COOKIE_NAME =
  process.env.JWT_REFRESH_COOKIE_NAME ?? "refreshToken";

const ACCESS_COOKIE_MAX_AGE_MS = Number(
  process.env.JWT_ACCESS_COOKIE_MAX_AGE_MS ?? 15 * 60 * 1000,
);

const REFRESH_COOKIE_MAX_AGE_MS = Number(
  process.env.JWT_REFRESH_COOKIE_MAX_AGE_MS ?? 7 * 24 * 60 * 60 * 1000,
);

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
} as const;

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie(ACCESS_COOKIE_NAME, accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_COOKIE_MAX_AGE_MS,
  });

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_COOKIE_MAX_AGE_MS,
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(ACCESS_COOKIE_NAME, cookieOptions);
  res.clearCookie(REFRESH_COOKIE_NAME, cookieOptions);
};
