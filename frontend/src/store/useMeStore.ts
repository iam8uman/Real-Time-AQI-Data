import { create } from "zustand";
import { User } from "@/types";

interface  useMeStore {
  meData: User | null;
  setMeData: (user: User | null) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useMeStore = create<useMeStore>((set) => ({
  meData: null,
  setMeData: (meData) => set({ meData }),

  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useMeStore;