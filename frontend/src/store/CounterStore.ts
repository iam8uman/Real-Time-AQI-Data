import { User } from "@/types";
import { create } from "zustand";

interface UserState {
    user: User[] | null;
    setUser: (user: User[]) => void; // Update the type of the 'user' parameter to be an array of 'User' objects
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));