export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type VerifyOtpPayload = {
  email: string;
  code: string;
};

export type ResendOtpPayload = {
  email: string;
};

export type AuthStatus = "idle" | "loading" | "succeeded" | "failed";
