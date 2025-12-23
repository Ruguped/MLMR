// src/libs/api.js
import axios from "axios";
import { useToastStore } from "../store/toastStore";

// Helper to show toast from non-React context
const showToast = (type, message) => {
  useToastStore.getState()[type](message);
};

const config = {
  // Using empty baseURL so requests go through Vite proxy (see vite.config.js)
  // The proxy forwards /api/* requests to the ngrok backend
  baseURL: import.meta.env.VITE_API_URL || 'http://192.168.1.3:3750',
  timeout: 30000,
};

const api = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: { "Content-Type": "application/json" },
});

// ========== REQUEST INTERCEPTOR ==========
api.interceptors.request.use((reqConfig) => {
  const token = localStorage.getItem("token");
  if (token) reqConfig.headers.Authorization = `Bearer ${token}`;

  if (import.meta.env.DEV) {
    console.log(`🚀 [API] ${reqConfig.method?.toUpperCase()} ${reqConfig.url}`);
  }
  return reqConfig;
});

// ========== RESPONSE INTERCEPTOR ==========
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`✅ [API] ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // ===== 1. NETWORK ERROR (no response) =====
    if (!error.response) {
      const message = error.code === 'ECONNABORTED'
        ? "Request timed out. Please try again."
        : "Connection failed. Check your internet.";
      showToast("error", message);
      return Promise.reject(error);
    }

    // ===== 2. 401 UNAUTHORIZED =====
    if (status === 401) {
      // Check if request had a token (authenticated request)
      const hadToken = error.config?.headers?.Authorization;

      if (hadToken) {
        // Token was present but invalid/expired → session expired, logout
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        showToast("warning", "Session expired. Please login again.");
        window.location.href = "/";
        return Promise.reject(error);
      }

      // No token in request (e.g., login with wrong password) → let component handle
      // Don't show toast, don't redirect - component will show the error
      return Promise.reject(error);
    }

    // ===== 3. 429 RATE LIMIT =====
    if (status === 429) {
      showToast("warning", "Too many requests. Please slow down.");
      return Promise.reject(error);
    }

    // ===== 4. 500+ SERVER ERRORS =====
    if (status >= 500) {
      showToast("error", "Server error. Please try again later.");
      return Promise.reject(error);
    }

    // ===== 5. 400-LEVEL ERRORS (let component handle) =====
    // 400, 403, 404, 409, 422 etc. - pass through to component
    // The component can access error.response.data.error for the message
    if (import.meta.env.DEV) {
      console.error(`❌ [API] ${error.config?.url}`, error.response?.data);
    }

    return Promise.reject(error);
  }
);

export default api;
