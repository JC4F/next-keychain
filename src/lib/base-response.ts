export const handleResponse = <T = unknown>(
  isSuccess: boolean = false,
  message: string = "",
  data: T | null = null,
  total: number = 0
) => ({
  isSuccess,
  message,
  data,
  total,
});
