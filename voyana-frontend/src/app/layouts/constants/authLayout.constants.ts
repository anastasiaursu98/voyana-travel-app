import { routes } from "../../router/routes";

export const AUTH_TRUST_STATS = [
  { value: "1M+", label: "Travelers" },
  { value: "500+", label: "Destinations" },
  { value: "4.9★", label: "120k reviews" },
] as const;

export const AUTH_BACK_TARGETS: Partial<Record<string, string>> = {
  [routes.register]: routes.login,
  [routes.forgotPassword]: routes.login,
  [routes.otpVerification]: routes.forgotPassword,
  [routes.resetPassword]: routes.otpVerification,
  [routes.passwordUpdated]: routes.resetPassword,
};

export const AUTH_ROUTE_VALUES = new Set<string>([
  routes.login,
  routes.register,
  routes.forgotPassword,
  routes.otpVerification,
  routes.resetPassword,
  routes.passwordUpdated,
]);
