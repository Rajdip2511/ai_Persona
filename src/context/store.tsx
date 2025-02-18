import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@firebase/auth';

export type Persona = 'girlfriend' | 'mentor' | 'friend';

export interface UserProfile {
  name: string;
  profession: string;
  hobbies: string[];
  background: string;
  selectedPersona: Persona;
}

interface StoreState {
  user: User | null;
  userProfile: UserProfile | null;
  isDarkMode: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setDarkMode: (isDark: boolean) => void;
}

const StoreContext = createContext<StoreState | null>(null);

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <StoreContext.Provider 
      value={{
        user,
        userProfile,
        isDarkMode,
        setUser,
        setUserProfile,
        setDarkMode: setIsDarkMode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreState {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
} 