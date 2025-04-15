import React, { createContext, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { getTheme } from '../theme';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectTheme, toggleTheme, selectIsLoaded, initializePreferences } from '../store/slices/userPreferencesSlice';

// Define the context type
interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

// Theme provider component
export const ReduxThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const isLoaded = useAppSelector(selectIsLoaded);
  
  // Initialize preferences if not already loaded
  useEffect(() => {
    if (!isLoaded) {
      dispatch(initializePreferences());
    }
  }, [dispatch, isLoaded]);

  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    dispatch(toggleTheme());
  };

  // Update document attribute for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Create the theme object
  const muiTheme = getTheme(theme as PaletteMode);

  // Context value
  const value = {
    mode: theme as PaletteMode,
    toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
