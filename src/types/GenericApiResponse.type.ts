export interface GenericApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
