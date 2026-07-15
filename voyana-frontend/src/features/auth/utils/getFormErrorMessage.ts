import { isApiErrorInfo } from "../../../shared/utils/apiError";

export function getFormErrorMessage(
  error: unknown,
  fallbackMessage: string,
) {
  if (isApiErrorInfo(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string" && error.length > 0) {
    return error;
  }

  return fallbackMessage;
}
