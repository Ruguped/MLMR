import {create} from 'zustand'


const useMyPackageStore = create((set) => ({
  myPackage: null,

  setMyPackage: (myPackage) => set({ myPackage }),

  refreshMyPackage: async () => {
    try {
      const res = await profile();
      set({ myPackage: res.data.user});
    } catch (error) {
      console.log(error);
    }
  },

  clearMyPackage: () => set({ myPackage: null}),
}));

export default useMyPackageStore;