export class ApiError extends Error {
  statusCode: number;
  isRateLimited: boolean;

  constructor(message: string, statusCode: number, isRateLimited: boolean = false) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.isRateLimited = isRateLimited;
  }
}

export const handleApiResponse = async (response: Response) => {
  if (response.status === 429) {
    throw new ApiError('Rate limit exceeded', 429, true);
  }

  if (!response.ok) {
    throw new ApiError(`API request failed with status ${response.status}`, response.status, false);
  }

  return response;
};
