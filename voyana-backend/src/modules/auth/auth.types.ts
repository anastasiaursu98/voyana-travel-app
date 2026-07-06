export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type VerifyEmailOtpInput = {
  email: string;
  code: string;
};

export type ResendEmailOtpInput = {
  email: string;
};
