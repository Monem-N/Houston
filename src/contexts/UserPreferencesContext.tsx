import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Location } from '../components/maps/types';

// Define the type for user preferences
interface UserPreferences {
  theme: 'light' | 'dark';
  favoriteLocations: Location[];
}

// Define the context type
interface UserPreferencesContextType {
  preferences: UserPreferences;
  toggleTheme: () => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (locationId: string) => void;
  isFavorite: (locationId: string) => boolean;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  theme: 'light',
  favoriteLocations: [],
};

// Create the context with default values
const UserPreferencesContext = createContext<UserPreferencesContextType>({
  preferences: defaultPreferences,
  toggleTheme: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

// Storage keys
const THEME_STORAGE_KEY = 'houston_guide_theme';
const FAVORITES_STORAGE_KEY = 'houston_guide_favorites';

// Provider component
export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with default values
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      const prefersDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches || false;
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

      setPreferences({
        theme: (savedTheme === 'light' || savedTheme === 'dark')
          ? savedTheme
          : (prefersDarkMode ? 'dark' : 'light'),
        favoriteLocations: savedFavorites ? JSON.parse(savedFavorites) : [],
      });
    } catch (error) {
      console.error('Error loading preferences from localStorage:', error);
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, preferences.theme);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(preferences.favoriteLocations));
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
    }
  }, [preferences]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  // Add a location to favorites
  const addFavorite = (location: Location) => {
    setPreferences(prev => {
      // Check if already in favorites
      if (prev.favoriteLocations.some(fav => fav.id === location.id)) {
        return prev;
      }

      return {
        ...prev,
        favoriteLocations: [...prev.favoriteLocations, location],
      };
    });
  };

  // Remove a location from favorites
  const removeFavorite = (locationId: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteLocations: prev.favoriteLocations.filter(location => location.id !== locationId),
    }));
  };

  // Check if a location is in favorites
  const isFavorite = (locationId: string) => {
    return preferences.favoriteLocations.some(location => location.id === locationId);
  };

  // Context value
  const value = {
    preferences,
    toggleTheme,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

// Custom hook to use the context
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  return context;
};
