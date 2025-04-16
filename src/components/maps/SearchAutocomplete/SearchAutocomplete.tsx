import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { Location } from '../types';

interface SearchAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onLocationSelect?: (location: Location) => void;
  locations?: Location[];
  placeholder?: string;
  apiKey?: string;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  onPlaceSelect,
  onLocationSelect,
  locations = [],
  placeholder = 'Search for a place in Houston...',
  // apiKey is not used directly but kept for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  apiKey,
}) => {
  const { isMobile } = useDeviceDetect();
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  const places = useMapsLibrary('places');
  const map = useMap();

  // Initialize the Places Autocomplete
  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options: google.maps.places.AutocompleteOptions = {
      fields: ['geometry', 'name', 'formatted_address', 'place_id', 'types'],
      bounds: map?.getBounds() || undefined,
      componentRestrictions: { country: 'us' },
      strictBounds: false,
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);

    return () => {
      // Clean up the autocomplete when component unmounts
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [places, map]);

  // Add listener for place_changed event
  useEffect(() => {
    if (!placeAutocomplete) return;

    const listener = placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();
      if (place && place.geometry) {
        onPlaceSelect(place);
        setInputValue(place.name || '');
        setShowSuggestions(false);
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [placeAutocomplete, onPlaceSelect]);

  // Filter locations based on input value
  useEffect(() => {
    if (!locations.length || !inputValue.trim()) {
      setFilteredLocations([]);
      return;
    }

    setIsLoading(true);

    // Simple filtering logic
    const filtered = locations
      .filter(
        location =>
          location.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          (location.address && location.address.toLowerCase().includes(inputValue.toLowerCase())) ||
          (location.description &&
            location.description.toLowerCase().includes(inputValue.toLowerCase()))
      )
      .slice(0, 5); // Limit to 5 results

    setFilteredLocations(filtered);
    setIsLoading(false);
  }, [inputValue, locations]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setShowSuggestions(!!value.trim());
  };

  // Handle location selection from our custom suggestions
  const handleLocationSelect = (location: Location) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    setInputValue(location.name);
    setShowSuggestions(false);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteContainerRef.current &&
        !autocompleteContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={autocompleteContainerRef}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '100%' : 400,
        zIndex: 10,
      }}
    >
      <TextField
        inputRef={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: isLoading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
          sx: {
            bgcolor: 'background.paper',
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
          },
        }}
        onFocus={() => setShowSuggestions(!!inputValue.trim())}
      />

      {showSuggestions && filteredLocations.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            maxHeight: 300,
            overflow: 'auto',
            zIndex: 20,
          }}
        >
          <List dense>
            <ListItem sx={{ bgcolor: 'action.hover' }}>
              <ListItemText
                primary={
                  <Typography variant="caption" color="text.secondary">
                    Houston Guide Locations
                  </Typography>
                }
              />
            </ListItem>
            {filteredLocations.map(location => (
              <ListItem
                key={location.id}
                button
                onClick={() => handleLocationSelect(location)}
                sx={{ py: 1 }}
              >
                <LocationIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                <ListItemText
                  primary={location.name}
                  secondary={location.address || location.category}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 500,
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    noWrap: true,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchAutocomplete;
