import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Theme slice
const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light' as 'light' | 'dark',
  reducers: {
    toggleTheme: state => {
      return state === 'light' ? 'dark' : 'light';
    },
    setTheme: (_, action: PayloadAction<'light' | 'dark'>) => {
      return action.payload;
    },
  },
});

// Favorites slice
interface FavoriteItem {
  id: string;
  name: string;
  position?: { lat: number; lng: number }; // Optional position property
  category?: string; // Optional category property
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as FavoriteItem[],
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

// Create the store
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

// Export actions
export const { toggleTheme, setTheme } = themeSlice.actions;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Selectors
export const selectTheme = (state: RootState) => state.theme;
export const selectFavorites = (state: RootState) => state.favorites;
