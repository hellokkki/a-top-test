import { create } from "zustand";
import { IUserStore } from "../../model/user/user";

export const useAuthStore = create<IUserStore>((set) => ({
  user: null,
  setUserInfo: (newUser) => set({ user: {
    token: newUser.token,
    name: newUser.name,
    surname: newUser.surname
  },  }),
  clearUserInfo: () => {
    set({ user: null })
  } 
}));

export const userState = useAuthStore.getState().user;
