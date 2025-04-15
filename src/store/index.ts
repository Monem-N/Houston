import { configureStore } from '@reduxjs/toolkit';
import userPreferencesReducer from './slices/userPreferencesSlice';
import locationsReducer from './slices/locationsSlice';

export const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
    locations: locationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
