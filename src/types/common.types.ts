export interface IError extends Error {
  status: number;
}

export interface ICommonResponse<T> {
  message: string;
  data: T;
}
