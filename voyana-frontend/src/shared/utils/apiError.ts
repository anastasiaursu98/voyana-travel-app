import axios from "axios";
import type { ApiErrorInfo, ApiErrorResponse } from "../types/api.types";

const fallbackMessage = "Something went wrong. Please try again.";

export function getApiErrorMessage(error: unknown): ApiErrorInfo {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      code: "UNKNOWN_ERROR",
      message: fallbackMessage,
    };
  }

  return {
    code: error.response?.data?.code ?? "UNKNOWN_ERROR",
    message: error.response?.data?.message ?? fallbackMessage,
  };
}

export function isApiErrorInfo(error: unknown): error is ApiErrorInfo {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    typeof error.code === "string" &&
    typeof error.message === "string"
  );
}
