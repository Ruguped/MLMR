// src/utils/errorUtils.js

/**
 * Safely extracts error message from various error formats
 */
export function getErrorMessage(error, defaultMessage = "Something went wrong.") {
  // Network/Timeout errors (no response)
  if (!error.response) {
    if (error.code === 'ECONNABORTED') return "Request timed out.";
    if (error.message === 'Network Error') return "No internet connection.";
    return error.message || defaultMessage;
  }

  const { data, status } = error.response;

  // Extract server message
  const serverMessage = 
    data?.error ||
    data?.message ||
    data?.errors?.[0]?.msg ||
    data?.errors?.[0] ||
    null;

  if (serverMessage) return serverMessage;

  // HTTP status fallbacks
  const statusMessages = {
    400: "Invalid request.",
    401: "Session expired. Please login.",
    403: "Permission denied.",
    404: "Not found.",
    409: "Already exists.",
    422: "Validation failed.",
    429: "Too many requests. Slow down.",
    500: "Server error.",
    502: "Server unavailable.",
    503: "Service under maintenance.",
  };

  return statusMessages[status] || defaultMessage;
}

export function getStatusCode(error) {
  return error?.response?.status || null;
}

export function isErrorType(error, keywords) {
  if (!Array.isArray(keywords)) keywords = [keywords];
  const msg = error?.response?.data?.error || error?.response?.data?.message || '';
  return keywords.some(k => msg.toLowerCase().includes(k.toLowerCase()));
}