import { createContext, useContext } from 'react';

interface PlatformContextType {
  platform: string;
  setPlatform: (platform: string) => void;
}

export const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
