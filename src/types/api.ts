export type ApiSuccessResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  statusCode: number;
  name: string;
  message: string;
  error: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
