export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  count?: number;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  code: string;
  statusCode: number;
  errors?: Record<string, string[]>;
};

export type ApiErrorInfo = Pick<ApiErrorResponse, "code" | "message">;
