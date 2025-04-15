import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../components/maps/types';

// Define the type for user preferences state
interface UserPreferencesState {
  theme: 'light' | 'dark';
  favoriteLocations: Location[];
}

// Initial state
const initialState: UserPreferencesState = {
  theme: 'light',
  favoriteLocations: [],
};

// Create the slice
const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addFavorite: (state, action: PayloadAction<Location>) => {
      const location = action.payload;
      if (!state.favoriteLocations.some(fav => fav.id === location.id)) {
        state.favoriteLocations.push(location);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const locationId = action.payload;
      state.favoriteLocations = state.favoriteLocations.filter(location => location.id !== locationId);
    },
  },
});

// Export actions
export const { toggleTheme, addFavorite, removeFavorite } = userPreferencesSlice.actions;

// Create the store
export const simpleStore = configureStore({
  reducer: {
    userPreferences: userPreferencesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof simpleStore.getState>;
export type AppDispatch = typeof simpleStore.dispatch;

// Selectors
export const selectTheme = (state: RootState) => state.userPreferences.theme;
export const selectFavoriteLocations = (state: RootState) => state.userPreferences.favoriteLocations;
export const selectIsFavorite = (state: RootState, locationId: string) => 
  state.userPreferences.favoriteLocations.some(location => location.id === locationId);
