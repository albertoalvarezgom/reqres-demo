export function validateApiToken(): { isValid: boolean; error?: string } {
  const apiToken = import.meta.env.VITE_API_TOKEN;

  if (!apiToken || apiToken.trim() === '') {
    return {
      isValid: false,
      error: 'VITE_API_TOKEN is not configured',
    };
  }

  return { isValid: true };
}

export function getApiToken(): string {
  const apiToken = import.meta.env.VITE_API_TOKEN;
  return apiToken || '';
}
