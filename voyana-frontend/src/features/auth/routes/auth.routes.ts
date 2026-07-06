import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { withRouteFallback } from "../../../app/router/withRouteFallback";
import { authPaths } from "./auth.paths";

const AuthLayout = lazy(() =>
  import("../../../app/layouts/AuthLayout").then((module) => ({
    default: module.AuthLayout,
  })),
);

const ForgotPasswordPage = lazy(() =>
  import("../pages/ForgotPasswordPage").then((module) => ({
    default: module.ForgotPasswordPage,
  })),
);

const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);

const OtpVerificationPage = lazy(() =>
  import("../pages/OtpVerificationPage").then((module) => ({
    default: module.OtpVerificationPage,
  })),
);

const PasswordUpdatedPage = lazy(() =>
  import("../pages/PasswordUpdatedPage").then((module) => ({
    default: module.PasswordUpdatedPage,
  })),
);

const RegisterPage = lazy(() =>
  import("../pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  })),
);

const ResetPasswordPage = lazy(() =>
  import("../pages/ResetPasswordPage").then((module) => ({
    default: module.ResetPasswordPage,
  })),
);

export const authRoutes: RouteObject[] = [
  {
    element: withRouteFallback(createElement(AuthLayout)),
    children: [
      {
        path: authPaths.login,
        element: withRouteFallback(createElement(LoginPage)),
      },
      {
        path: authPaths.register,
        element: withRouteFallback(createElement(RegisterPage)),
      },
      {
        path: authPaths.forgotPassword,
        element: withRouteFallback(createElement(ForgotPasswordPage)),
      },
      {
        path: authPaths.otpVerification,
        element: withRouteFallback(createElement(OtpVerificationPage)),
      },
      {
        path: authPaths.resetPassword,
        element: withRouteFallback(createElement(ResetPasswordPage)),
      },
      {
        path: authPaths.passwordUpdated,
        element: withRouteFallback(createElement(PasswordUpdatedPage)),
      },
    ],
  },
];
