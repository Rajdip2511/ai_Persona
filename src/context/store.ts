import { create } from 'zustand';
import { User } from '@firebase/auth';

export type Persona = 'girlfriend' | 'mentor' | 'friend';

export interface UserProfile {
  name: string;
  profession: string;
  hobbies: string[];
  background: string;
  selectedPersona: Persona;
}

interface AppState {
  user: User | null;
  userProfile: UserProfile | null;
  isDarkMode: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  userProfile: null,
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  setUser: (user) => set({ user }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
})); 