import { create } from 'zustand';
import { profile } from '../libs/authApi';

const useUserStore = create((set) => ({
  user: null,
  isLoaded: false,
  isLoading: false,
  
  setUser: (user) => set({ user, isLoaded: true }),

  refreshUser: async () => {
    set({ isLoading: true });
    try {
      const res = await profile();
      set({ user: res.data.user, isLoaded: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  clearUser: () => set({ user: null, isLoaded: false }),
}));

export default useUserStore;