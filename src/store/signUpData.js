import { create } from 'zustand';

export const useSignUpStore = create((set) => ({
  // initial state
  signUpData: null,

  // action: set data after signup API success
  setSignUpData: (data) =>
    set(() => ({
      signUpData: data,
    })),

  // optional helper: reset/clear
  clearSignUpData: () =>
    set(() => ({
      signUpData: null,
    })),
}));


