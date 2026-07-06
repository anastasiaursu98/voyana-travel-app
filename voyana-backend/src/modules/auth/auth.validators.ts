import {
  addValidationError,
  hasValidationErrors,
  isNonEmptyString,
  isRecord,
  isValidEmail,
  normalizeEmail,
  type ValidationErrors,
} from "../../shared/utils/validators";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;
const NAME_PATTERN = /^[\p{L}' -]+$/u;
const PASSWORD_UPPERCASE_PATTERN = /[A-Z]/;
const PASSWORD_NUMBER_PATTERN = /\d/;
const PASSWORD_SPECIAL_CHARACTER_PATTERN = /[^a-zA-Z0-9]/;

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type ResetPasswordInput = {
  token: string;
  password: string;
  confirmPassword: string;
};

type ValidationResult<T> =
  | {
      value: T;
      errors?: never;
    }
  | {
      value?: never;
      errors: ValidationErrors;
    };

const validateNameField = (
  errors: ValidationErrors,
  field: "firstName" | "lastName",
  label: string,
  value: unknown,
) => {
  if (!isNonEmptyString(value)) {
    addValidationError(errors, field, `${label} is required`);
    return "";
  }

  const normalizedValue = value.trim();

  if (
    normalizedValue.length < NAME_MIN_LENGTH ||
    normalizedValue.length > NAME_MAX_LENGTH
  ) {
    addValidationError(
      errors,
      field,
      `${label} must be between 2 and 50 characters`,
    );
  }

  if (!NAME_PATTERN.test(normalizedValue)) {
    addValidationError(
      errors,
      field,
      `${label} can contain only letters, spaces, apostrophes and hyphens`,
    );
  }

  return normalizedValue;
};

const validatePasswordField = (
  errors: ValidationErrors,
  field: "password" | "confirmPassword",
  label: string,
  value: unknown,
) => {
  if (!isNonEmptyString(value)) {
    addValidationError(errors, field, `${label} is required`);
    return "";
  }

  const normalizedValue = value;

  if (normalizedValue.length < PASSWORD_MIN_LENGTH) {
    addValidationError(
      errors,
      field,
      `${label} must be at least 8 characters`,
    );
  }

  if (!PASSWORD_UPPERCASE_PATTERN.test(normalizedValue)) {
    addValidationError(
      errors,
      field,
      `${label} must contain at least one uppercase letter`,
    );
  }

  if (!PASSWORD_NUMBER_PATTERN.test(normalizedValue)) {
    addValidationError(
      errors,
      field,
      `${label} must contain at least one number`,
    );
  }

  if (!PASSWORD_SPECIAL_CHARACTER_PATTERN.test(normalizedValue)) {
    addValidationError(
      errors,
      field,
      `${label} must contain at least one special character`,
    );
  }

  return normalizedValue;
};

export const validateRegisterInput = (
  body: unknown,
): ValidationResult<RegisterInput> => {
  const errors: ValidationErrors = {};
  let normalizedFirstName = "";
  let normalizedLastName = "";
  let normalizedEmail = "";
  let normalizedPassword = "";

  if (!isRecord(body)) {
    return {
      errors: {
        body: ["Request body must be an object"],
      },
    };
  }

  const { firstName, lastName, email, password } = body;

  normalizedFirstName = validateNameField(
    errors,
    "firstName",
    "First name",
    firstName,
  );
  normalizedLastName = validateNameField(
    errors,
    "lastName",
    "Last name",
    lastName,
  );

  if (!isNonEmptyString(email)) {
    addValidationError(errors, "email", "Email is required");
  } else {
    normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      addValidationError(errors, "email", "Email is invalid");
    }
  }

  normalizedPassword = validatePasswordField(
    errors,
    "password",
    "Password",
    password,
  );

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  return {
    value: {
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      email: normalizedEmail,
      password: normalizedPassword,
    },
  };
};

export const validateResetPasswordInput = (
  body: unknown,
): ValidationResult<ResetPasswordInput> => {
  const errors: ValidationErrors = {};
  let normalizedToken = "";
  let normalizedPassword = "";
  let normalizedConfirmPassword = "";

  if (!isRecord(body)) {
    return {
      errors: {
        body: ["Request body must be an object"],
      },
    };
  }

  const { token, password, confirmPassword } = body;

  if (!isNonEmptyString(token)) {
    addValidationError(errors, "token", "Reset token is required");
  } else {
    normalizedToken = token.trim();
  }

  normalizedPassword = validatePasswordField(
    errors,
    "password",
    "Password",
    password,
  );
  normalizedConfirmPassword = validatePasswordField(
    errors,
    "confirmPassword",
    "Confirm password",
    confirmPassword,
  );

  if (
    normalizedPassword &&
    normalizedConfirmPassword &&
    normalizedPassword !== normalizedConfirmPassword
  ) {
    addValidationError(errors, "confirmPassword", "Passwords do not match");
  }

  if (hasValidationErrors(errors)) {
    return { errors };
  }

  return {
    value: {
      token: normalizedToken,
      password: normalizedPassword,
      confirmPassword: normalizedConfirmPassword,
    },
  };
};
