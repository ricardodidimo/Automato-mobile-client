import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Vault } from '../api/api.types';

interface AuthState {
  token: string | null;
  user: { id: string; name: string } | null;
  accessCode: string | null;
  vault: Vault | null;

  login: (token: string, user: { id: string; name: string }) => void;
  logout: () => void;
  unlock: (accessCode: string, vault: Vault) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      accessCode: null,
      vault: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      unlock: (access: string, vault: Vault) => set({accessCode: access, vault: vault})
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
