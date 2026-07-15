export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "BAD_REQUEST"
  | "EMAIL_NOT_VERIFIED"
  | "INTERNAL_SERVER_ERROR";

export type ApiErrorResponse = {
  success: false;
  message: string;
  code: ApiErrorCode;
  statusCode: number;
  errors?: Record<string, string[]>;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  count?: number;
  data: T;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type AuthTokenUser = {
  _id: unknown;
  email: string;
  role: string;
};
