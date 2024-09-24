import create from 'zustand';

interface RegisterState {
    isRegistered: boolean;
    setIsRegistered: (isRegistered: boolean) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
    isRegistered: false,
    setIsRegistered: (isRegistered) => set({ isRegistered }),
}));