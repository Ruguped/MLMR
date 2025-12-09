// src/store/toastStore.js
import { create } from 'zustand';

export const useToastStore = create((set, get) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = Date.now();
    const newToast = { id, type: 'info', duration: 5000, ...toast };
    set(state => ({ toasts: [...state.toasts, newToast] }));
    
    if (newToast.duration > 0) {
      setTimeout(() => get().removeToast(id), newToast.duration);
    }
  },
  
  removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
  
  success: (message, opts) => get().addToast({ type: 'success', message, ...opts }),
  error: (message, opts) => get().addToast({ type: 'error', message, duration: 7000, ...opts }),
  warning: (message, opts) => get().addToast({ type: 'warning', message, ...opts }),
  info: (message, opts) => get().addToast({ type: 'info', message, ...opts }),
}));

export const useToast = () => {
  const { success, error, warning, info } = useToastStore();
  return { success, error, warning, info };
};