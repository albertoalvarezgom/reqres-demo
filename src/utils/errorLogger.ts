interface ErrorLogData {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

export function logError(error: Error, errorInfo?: { componentStack?: string }): void {
  const errorData: ErrorLogData = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  console.group('🔴 Error Boundary Caught Error');
  console.error('Error:', error);
  console.error('Error Info:', errorInfo);
  console.table({
    Message: errorData.message,
    Timestamp: errorData.timestamp,
    URL: errorData.url,
  });
  console.groupEnd();

  if (import.meta.env.PROD) {
    sendErrorToService(errorData);
  }
}

function sendErrorToService(errorData: ErrorLogData): void {
  console.log('📤 Would send error to monitoring service:', errorData);
}
