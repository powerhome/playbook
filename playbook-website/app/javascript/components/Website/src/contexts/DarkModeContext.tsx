import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
  initialDarkMode?: boolean;
}

export const DarkModeProvider = ({ children, initialDarkMode = false }: DarkModeProviderProps) => {
  const [darkMode, setDarkModeState] = useState(initialDarkMode);

  const setDarkMode = useCallback((dark: boolean) => {
    setDarkModeState(dark);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkModeState((prev) => !prev);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
