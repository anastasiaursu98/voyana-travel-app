export type ValidationErrors = Record<string, string[]>;

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const addValidationError = (
  errors: ValidationErrors,
  field: string,
  message: string,
) => {
  if (!errors[field]) {
    errors[field] = [];
  }

  errors[field].push(message);
};

export const hasValidationErrors = (errors: ValidationErrors) => {
  return Object.keys(errors).length > 0;
};

export const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const normalizeEmail = (value: string) => {
  return value.trim().toLowerCase();
};
