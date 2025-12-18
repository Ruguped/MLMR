import { create } from 'zustand';
import { profile } from '../libs/authApi';

const useUserStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  refreshUser: async () => {
    try {
      const res = await profile();
      set({ user: res.data.user});
    } catch (error) {
      console.log(error);
    }
  },

  clearUser: () => set({ user: null}),
}));

export default useUserStore;