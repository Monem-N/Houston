import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { getTheme } from '../theme';
import { useUserPreferences } from './UserPreferencesContext';

// Define the context type
interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get theme from user preferences, but have a fallback
  const userPrefs = useUserPreferences();

  // Fallback state in case UserPreferencesProvider is not available
  const [localMode, setLocalMode] = useState<PaletteMode>(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches || false;
      return (savedTheme === 'light' || savedTheme === 'dark')
        ? savedTheme as PaletteMode
        : (prefersDarkMode ? 'dark' : 'light');
    } catch (error) {
      return 'light';
    }
  });

  // Use user preferences if available, otherwise use local state
  const mode = userPrefs ? userPrefs.preferences.theme as PaletteMode : localMode;

  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    if (userPrefs) {
      userPrefs.toggleTheme();
    } else {
      setLocalMode(prevMode => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        try {
          localStorage.setItem('theme', newMode);
        } catch (error) {
          console.error('Error saving theme to localStorage:', error);
        }
        return newMode;
      });
    }
  };

  // Update document attribute for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // Create the theme based on the current mode
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Provide the theme context and theme provider
  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
