import React, { createContext, useContext } from 'react';
import { useThemeManager } from '../hooks/useThemeManager';
import { darkColors, lightColors, type ThemeColors } from './colors';

interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, setTheme } = useThemeManager();
  
  const currentTheme = theme === 'dark' ? 'dark' : 'light';
  const colors = currentTheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      colors, 
      toggleTheme, 
      setTheme: (newTheme) => setTheme(newTheme)
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeColor(colorName: keyof ThemeColors) {
  const { colors } = useTheme();
  return colors[colorName];
}
