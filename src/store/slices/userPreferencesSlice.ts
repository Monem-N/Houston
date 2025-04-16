import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../../components/maps/types';

// Define the type for user preferences state
interface UserPreferencesState {
  theme: 'light' | 'dark';
  favoriteLocations: Location[];
  isLoaded: boolean;
}

// Storage keys
const THEME_STORAGE_KEY = 'houston_guide_theme';
const FAVORITES_STORAGE_KEY = 'houston_guide_favorites';

// Helper function to get theme from localStorage
const getInitialTheme = (): 'light' | 'dark' => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches || false;
    
    return (savedTheme === 'light' || savedTheme === 'dark') 
      ? savedTheme 
      : (prefersDarkMode ? 'dark' : 'light');
  } catch (error) {
    console.error('Error accessing localStorage for theme:', error);
    return 'light';
  }
};

// Helper function to get favorites from localStorage
const getInitialFavorites = (): Location[] => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Error accessing localStorage for favorites:', error);
    return [];
  }
};

// Initial state
const initialState: UserPreferencesState = {
  theme: 'light', // Default value, will be updated in initializePreferences
  favoriteLocations: [],
  isLoaded: false,
};

// Create the slice
const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    initializePreferences: (state) => {
      state.theme = getInitialTheme();
      state.favoriteLocations = getInitialFavorites();
      state.isLoaded = true;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.theme);
      } catch (error) {
        console.error('Error saving theme to localStorage:', error);
      }
    },
    addFavorite: (state, action: PayloadAction<Location>) => {
      const location = action.payload;
      // Check if already in favorites
      if (!state.favoriteLocations.some(fav => fav.id === location.id)) {
        state.favoriteLocations.push(location);
        try {
          localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favoriteLocations));
        } catch (error) {
          console.error('Error saving favorites to localStorage:', error);
        }
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const locationId = action.payload;
      state.favoriteLocations = state.favoriteLocations.filter(location => location.id !== locationId);
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favoriteLocations));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    },
  },
});

// Export actions and reducer
export const { initializePreferences, toggleTheme, addFavorite, removeFavorite } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;

// Selectors
export const selectTheme = (state: { userPreferences: UserPreferencesState }) => state.userPreferences.theme;
export const selectFavoriteLocations = (state: { userPreferences: UserPreferencesState }) => state.userPreferences.favoriteLocations;
export const selectIsLoaded = (state: { userPreferences: UserPreferencesState }) => state.userPreferences.isLoaded;
export const selectIsFavorite = (state: { userPreferences: UserPreferencesState }, locationId: string) => 
  state.userPreferences.favoriteLocations.some(location => location.id === locationId);
