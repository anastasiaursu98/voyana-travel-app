export type ApiSuccessResponse<T> = {
  success: true
  message?: string
  count?: number
  data: T
}
