// src/api/authApi.js
import api from './api';

// login: expects { email/phone/username, password }
export const loginApi = (payload) => api.post('/api/user/login', payload);

// register: expects { email?, phone?, username, password, referralCode? }
export const registerApi = (payload) => api.post('/api/user/register', payload);

// verify OTP and resend OTP endpoints (optional later)
export const verifyOtpApi = (payload) => api.post('/api/user/verify-otp', payload);
export const resendOtpApi = (payload) => api.post('/api/user/resend-otp', payload);



export const profile = () => api.get('/api/user/profile');
