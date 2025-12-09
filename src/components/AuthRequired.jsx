import React from "react";
import { Navigate, Outlet,useLocation } from "react-router-dom";
import useAuthStore from '../store/authStore.js';

export default function AuthRequired() {
  const {isLoggedIn} = useAuthStore();
    

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ 
          message: "You must login first",
          from: useLocation()
        }} replace />;
    }
    return <Outlet />;
    
}