import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Location } from '../../components/maps/types';
import { locations } from '../../data/locations';

// Define the type for locations state
interface LocationsState {
  allLocations: Location[];
  filteredLocations: Location[];
  selectedLocation: Location | null;
  searchResults: Location[];
  activeCategories: Record<string, boolean>;
  loading: boolean;
  error: string | null;
}

// Get unique categories from locations
const getUniqueCategories = (locations: Location[]): Record<string, boolean> => {
  const categories: Record<string, boolean> = {};
  locations.forEach(location => {
    if (location.category) {
      categories[location.category] = true;
    }
  });
  return categories;
};

// Initial state
const initialState: LocationsState = {
  allLocations: [],
  filteredLocations: [],
  selectedLocation: null,
  searchResults: [],
  activeCategories: {},
  loading: false,
  error: null,
};

// Async thunk for loading locations
export const loadLocations = createAsyncThunk(
  'locations/loadLocations',
  async () => {
    // In a real app, this would be an API call
    // For now, we'll just return the imported locations
    return locations;
  }
);

// Create the slice
const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setFilteredLocations: (state, action: PayloadAction<Location[]>) => {
      state.filteredLocations = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Location[]>) => {
      state.searchResults = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      state.activeCategories[category] = !state.activeCategories[category];

      // Update filtered locations based on active categories
      if (Object.values(state.activeCategories).every(value => !value)) {
        // If no categories are active, show all locations
        state.filteredLocations = state.allLocations;
      } else {
        // Filter locations by active categories
        state.filteredLocations = state.allLocations.filter(
          location => location.category && state.activeCategories[location.category]
        );
      }
    },
    setAllCategories: (state, action: PayloadAction<boolean>) => {
      const value = action.payload;
      Object.keys(state.activeCategories).forEach(category => {
        state.activeCategories[category] = value;
      });

      // Update filtered locations
      if (value) {
        state.filteredLocations = state.allLocations;
      } else {
        state.filteredLocations = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.allLocations = action.payload;
        state.filteredLocations = action.payload;
        state.activeCategories = getUniqueCategories(action.payload);
      })
      .addCase(loadLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load locations';
      });
  },
});

// Export actions and reducer
export const {
  setFilteredLocations,
  setSelectedLocation,
  setSearchResults,
  toggleCategory,
  setAllCategories
} = locationsSlice.actions;
export default locationsSlice.reducer;

// Selectors
export const selectAllLocations = (state: { locations: LocationsState }) => state.locations.allLocations;
export const selectFilteredLocations = (state: { locations: LocationsState }) => state.locations.filteredLocations;
export const selectSelectedLocation = (state: { locations: LocationsState }) => state.locations.selectedLocation;
export const selectSearchResults = (state: { locations: LocationsState }) => state.locations.searchResults;
export const selectActiveCategories = (state: { locations: LocationsState }) => state.locations.activeCategories;
export const selectLoading = (state: { locations: LocationsState }) => state.locations.loading;
export const selectError = (state: { locations: LocationsState }) => state.locations.error;
