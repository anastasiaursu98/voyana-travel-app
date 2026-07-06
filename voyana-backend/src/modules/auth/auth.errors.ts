import type { ApiErrorCode } from "../../types/api.types";

export class AuthError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: ApiErrorCode,
    message: string,
    public readonly errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "AuthError";
  }
}
