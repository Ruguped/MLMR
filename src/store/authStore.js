// src/store/useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),

  login: (token) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;
