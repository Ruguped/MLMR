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




//======================support ticket apis============================

//post request to create ticket
export const createTicket =  (payload) => api.post('/api/support/tickets', payload);
export const getTickets = (page = 1) => api.get(`/api/support/tickets?page=${page}`);

//tickets individual getting 
export const getIndividualTicket = (ticketId) => api.get(`/api/support/tickets/${ticketId}`);

//send message to ticket individual
export const sendTicketMessage = (ticketId, payload) => api.post(`/api/support/tickets/${ticketId}/messages`, payload);


//======================kyc APi bhai============================


//post submit kyc {panNumber,aadharNumber,panCardImage,aadharFrontImage,aadharBackImage}-5fileds 3 files 2 numbers 
export const submitKyc = (payload) => api.post('/api/user/kyc/submit', payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
{/*
    "success": true,
    "message": "KYC submitted successfully. Awaiting verification.",
    "data": {
        "kycStatus": "pending",
        "submittedAt": "2025-12-16T06:07:21.855Z",
        "panNumber": "DHRPG0712A"
    }
*/}


//deposit api

export const deposit = (payload) => api.post('/api/user/deposit', payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
});



//withdraw api
//otp
export const withdrawOtp = () => api.get('/api/user/withdraw-otp');
export const withdraw = (payload) => api.post('/api/user/withdraw', payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
