import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import GoogleMap from '../GoogleMap';
import { getGoogleMapsMapId } from '../../../utils/loadGoogleMapsApi';
import Marker from '../Marker';
import InfoWindow from '../InfoWindow';

// Define the location interface
export interface Location {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
  category: string;
  description?: string;
  address?: string;
  image?: string;
}

// Define the props for the MapContainer component
export interface MapContainerProps {
  locations: Location[];
  categories?: string[];
  mapId?: string;
  height?: string | number;
  width?: string | number;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  showRoute?: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({
  locations,
  categories = [],
  mapId,
  height = 600,
  width ='100%',
  initialCenter,
  initialZoom = 12,
  showRoute = false,
}) => {
  // State for the map instance
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // State for the selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // State for the selected marker and info window
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Filter locations based on the selected category
  const filteredLocations =
    selectedCategory === 'all'
      ? locations
      : locations.filter(location => location.category === selectedCategory);

  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
    setSelectedMarker(null); // Close any open info window
  };

  // Handle marker click
  const handleMarkerClick = useCallback((locationId: string) => {
    setSelectedMarker(locationId);
  }, []);

  // Handle info window close
  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Get the selected location (commented out as it's not currently used)
  // const selectedLocation = selectedMarker
  //   ? locations.find(location => location.id === selectedMarker)
  //   : null;

  // State for the polyline (route)
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  // Update map bounds to fit all visible markers when filtered locations change
  useEffect(() => {
    if (map && filteredLocations.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      filteredLocations.forEach(location => {
        bounds.extend(location.position);
      });

      map.fitBounds(bounds);

      // If there's only one location, zoom out a bit
      if (filteredLocations.length === 1) {
        const listener = google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          map.setZoom(Math.min(15, map.getZoom() || 15));
        });

        return () => {
          google.maps.event.removeListener(listener);
        };
      }
    }
  }, [map, filteredLocations]);

  // Draw route between locations when showRoute is true
  useEffect(() => {
    // Clean up previous polyline
    if (polyline) {
      polyline.setMap(null);
      setPolyline(null);
    }

    // Draw new polyline if showRoute is true and we have locations
    if (map && showRoute && filteredLocations.length > 1) {
      // Create path from locations (ordered by their position in the array)
      const path = filteredLocations.map(location => location.position);

      // Create and set the polyline
      const newPolyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map,
      });

      setPolyline(newPolyline);
    }

    // Clean up on unmount
    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [map, showRoute, filteredLocations, polyline]);

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      {/* Category filter */}
      {categories.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel id="category-filter-label">Filter by Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={selectedCategory}
              label="Filter by Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" color="text.secondary">
            Showing {filteredLocations.length} of {locations.length} locations
          </Typography>
        </Box>
      )}

      {/* Map container */}
      <Box
        sx={{
          height,
          width,
          borderRadius: 1,
          overflow: 'hidden',
        }}
        data-testid="map-container"
      >
        <GoogleMap
          center={initialCenter}
          zoom={initialZoom}
          mapId={mapId || getGoogleMapsMapId()}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          onMapLoad={setMap}
        >
          {map &&
            filteredLocations.map(location => (
              <React.Fragment key={location.id}>
                <Marker
                  position={location.position}
                  map={map}
                  title={location.name}
                  onClick={() => handleMarkerClick(location.id)}
                />

                {selectedMarker === location.id && (
                  <InfoWindow
                    position={location.position}
                    map={map}
                    open={true}
                    onClose={handleInfoWindowClose}
                  >
                    <Box sx={{ p: 1, maxWidth: 300 }}>
                      {location.image && (
                        <Box
                          component="img"
                          src={location.image}
                          alt={location.name}
                          sx={{
                            width: '100%',
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 1,
                            mb: 1,
                          }}
                        />
                      )}

                      <Typography variant="h6" gutterBottom>
                        {location.name}
                      </Typography>

                      <Chip label={location.category} size="small" color="primary" sx={{ mb: 1 }} />

                      {location.description && (
                        <Typography variant="body2" paragraph>
                          {location.description}
                        </Typography>
                      )}

                      {location.address && (
                        <Typography variant="body2" color="text.secondary">
                          {location.address}
                        </Typography>
                      )}
                    </Box>
                  </InfoWindow>
                )}
              </React.Fragment>
            ))}
        </GoogleMap>
      </Box>
    </Paper>
  );
};

export default MapContainer;
