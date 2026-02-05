// no se usa
interface ApiResponse<T, M = null> {
  success: boolean;
  message: string;
  data: T;
  meta: M;
}
