import * as React from 'react';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import {
  Paper,
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import {
  Attractions as AttractionsIcon,
  Restaurant as RestaurantIcon,
  ShoppingBag as ShoppingIcon,
  Hotel as HotelIcon,
  LocalAirport as AirportIcon,
  DirectionsBus as BusIcon,
  LocalHospital as MedicalIcon,
  Park as ParkIcon,
  EmojiEvents as EventsIcon,
  Place as PlaceIcon,
  Directions as DirectionsIcon,
  Close as CloseIcon,
  MyLocation as MyLocationIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { Location } from '../types';
import DirectionsRenderer from '../DirectionsRenderer/DirectionsRenderer';

export interface ReactGoogleMapProps {
  /** Google Maps API key */
  apiKey?: string;
  /** Google Maps Map ID for styling */
  mapId?: string;
  /** Center coordinates for the map */
  center?: google.maps.LatLngLiteral;
  /** Zoom level for the map */
  zoom?: number;
  /** Array of locations to display on the map */
  locations?: Location[];
  /** Height of the map container */
  height?: string | number;
  /** Width of the map container */
  width?: string | number;
  /** Whether to show info windows when markers are clicked */
  showInfoWindow?: boolean;
  /** Whether to enable marker clustering (not currently used) */
  enableClustering?: boolean;
  /** Whether to use custom icons for markers */
  useCustomIcons?: boolean;
  /** Whether to show routes between locations (for itineraries) */
  showRoutes?: boolean;
  /** Color for the route lines */
  routeColor?: string;
}

// Component to handle markers
const MapMarkers: React.FC<{
  locations: Location[];
  onMarkerClick: (location: Location) => void;
  useCustomIcons: boolean;
  getMarkerIcon: (category: string) => React.ReactNode;
}> = ({ locations, onMarkerClick, useCustomIcons, getMarkerIcon }) => {
  const [hoveredMarker, setHoveredMarker] = React.useState<string | null>(null);

  return (
    <>
      {locations.map(location => (
        <AdvancedMarker
          key={location.id}
          position={location.position}
          title={location.name}
          onClick={() => onMarkerClick(location)}
          ref={marker => {
            if (marker) {
              marker.addEventListener('mouseover', () => setHoveredMarker(location.id));
              marker.addEventListener('mouseout', () => setHoveredMarker(null));
            }
          }}
        >
          {hoveredMarker === location.id ? (
            <Box
              sx={{
                p: 1,
                bgcolor: 'white',
                borderRadius: 1,
                boxShadow: 3,
                maxWidth: 200,
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {location.name}
              </Typography>
              {location.description && (
                <Typography variant="body2" color="text.secondary">
                  {location.description}
                </Typography>
              )}
            </Box>
          ) : useCustomIcons ? (
            getMarkerIcon(location.category)
          ) : (
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: '#4285F4',
                border: '2px solid white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            />
          )}
        </AdvancedMarker>
      ))}
    </>
  );
};

const ReactGoogleMap: React.FC<ReactGoogleMapProps> = ({
  apiKey = 'AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0',
  mapId = 'af8bf941f1e27c9d',
  center = { lat: 29.7604, lng: -95.3698 }, // Default to Houston
  zoom = 12,
  locations = [],
  height = 500,
  width = '100%',
  showInfoWindow = true,
  useCustomIcons = true,
  showRoutes = false,
  routeColor = '#2196F3',
}) => {
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeCategories, setActiveCategories] = useState<{ [key: string]: boolean }>({});
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Detect device type
  const { isMobile } = useDeviceDetect();

  // Get unique categories from locations
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    locations.forEach(location => uniqueCategories.add(location.category));
    return Array.from(uniqueCategories);
  }, [locations]);

  // Initialize active categories
  useMemo(() => {
    const initialCategories: { [key: string]: boolean } = {};
    categories.forEach(category => {
      initialCategories[category] = true;
    });
    setActiveCategories(initialCategories);
  }, [categories]);

  // Filter locations based on active categories
  const filteredLocations = useMemo(() => {
    return locations.filter(location => activeCategories[location.category]);
  }, [locations, activeCategories]);

  // Handle marker click
  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedMarker(location);
  }, []);

  // Save map reference
  const handleMapLoad = useCallback((event: { map: google.maps.Map }) => {
    console.log('Map loaded successfully', event.map);
    mapRef.current = event.map;
    setIsLoading(false);
  }, []);

  // Add a useEffect to set isLoading to false after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log('Map load timeout - forcing loading to complete');
        setIsLoading(false);
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Handle map errors through the timeout
  useEffect(() => {
    const handleError = () => {
      if (isLoading && !mapRef.current) {
        console.error('Map failed to load');
        setError('Failed to load the map. Please try again later.');
        setIsLoading(false);
      }
    };

    // Set a timeout to check if the map has loaded
    const errorTimer = setTimeout(handleError, 10000); // 10 seconds timeout

    return () => clearTimeout(errorTimer);
  }, [isLoading]);

  // Get user's current location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          if (mapRef.current) {
            mapRef.current.panTo(userPos);
            mapRef.current.setZoom(14);
          }
        },
        error => {
          console.error('Error getting user location:', error);
          setError('Unable to get your location. Please check your browser permissions.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  // Toggle category filter
  const handleCategoryToggle = useCallback((category: string) => {
    setActiveCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  // Get directions to a location
  const getDirections = useCallback((location: Location) => {
    if (location.address) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          location.address
        )}`,
        '_blank'
      );
    } else if (location.position) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${location.position.lat},${location.position.lng}`,
        '_blank'
      );
    }
  }, []);

  // Get icon based on location category
  const getMarkerIcon = (category: string) => {
    const iconStyle = { fontSize: '24px' };

    switch (category) {
      case 'attraction':
        return <AttractionsIcon style={{ ...iconStyle, color: '#FF5722' }} />;
      case 'museum':
        return <AttractionsIcon style={{ ...iconStyle, color: '#9C27B0' }} />;
      case 'restaurant':
        return <RestaurantIcon style={{ ...iconStyle, color: '#F44336' }} />;
      case 'shopping':
        return <ShoppingIcon style={{ ...iconStyle, color: '#2196F3' }} />;
      case 'grocery':
        return <ShoppingIcon style={{ ...iconStyle, color: '#4CAF50' }} />;
      case 'hotel':
        return <HotelIcon style={{ ...iconStyle, color: '#3F51B5' }} />;
      case 'airport':
        return <AirportIcon style={{ ...iconStyle, color: '#607D8B' }} />;
      case 'transport':
        return <BusIcon style={{ ...iconStyle, color: '#009688' }} />;
      case 'medical':
        return <MedicalIcon style={{ ...iconStyle, color: '#E91E63' }} />;
      case 'park':
        return <ParkIcon style={{ ...iconStyle, color: '#8BC34A' }} />;
      case 'venue':
        return <EventsIcon style={{ ...iconStyle, color: '#FFC107' }} />;
      default:
        return <PlaceIcon style={{ ...iconStyle, color: '#757575' }} />;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height,
        width,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            zIndex: 10,
          }}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          top: isMobile ? 70 : 10,
          right: 10,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Tooltip title="Show my location">
          <IconButton
            onClick={getUserLocation}
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
              width: isMobile ? 40 : 36,
              height: isMobile ? 40 : 36,
            }}
          >
            <MyLocationIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Filter locations">
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
              width: isMobile ? 40 : 36,
              height: isMobile ? 40 : 36,
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {showFilters && (
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? 70 : 10,
            left: 10,
            zIndex: 5,
            bgcolor: 'white',
            p: isMobile ? 1.5 : 2,
            borderRadius: 1,
            boxShadow: 3,
            maxHeight: isMobile ? '60%' : '80%',
            overflowY: 'auto',
            maxWidth: isMobile ? '80%' : '300px',
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}
          >
            <Typography variant="subtitle1">Filter by Category</Typography>
            <IconButton size="small" onClick={() => setShowFilters(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <FormGroup>
            {categories.map(category => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={activeCategories[category] || false}
                    onChange={() => handleCategoryToggle(category)}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getMarkerIcon(category)}
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {category}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </FormGroup>
        </Box>
      )}

      <APIProvider apiKey={apiKey} libraries={['marker', 'routes', 'places']}>
        <Map
          mapId={mapId}
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling={isMobile ? 'greedy' : 'cooperative'}
          fullscreenControl={true}
          style={{ width: '100%', height: '100%' }}
          onIdle={handleMapLoad}
        >
          {userLocation && (
            <AdvancedMarker position={userLocation} title="Your Location">
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: '#4285F4',
                  border: '2px solid white',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              />
            </AdvancedMarker>
          )}

          {/* Show routes between locations if enabled */}
          {showRoutes && filteredLocations.length > 1 && (
            <DirectionsRenderer
              locations={filteredLocations}
              routeColor={routeColor}
              showMarkers={false}
            />
          )}

          <MapMarkers
            locations={filteredLocations}
            onMarkerClick={handleMarkerClick}
            useCustomIcons={useCustomIcons}
            getMarkerIcon={getMarkerIcon}
          />

          {selectedMarker && showInfoWindow && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <Box sx={{ p: isMobile ? 1.5 : 1, maxWidth: isMobile ? 250 : 300 }}>
                {selectedMarker.image && (
                  <Box
                    component="img"
                    src={selectedMarker.image}
                    alt={selectedMarker.name}
                    sx={{
                      width: '100%',
                      height: isMobile ? 120 : 150,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {selectedMarker.name}
                  </Typography>
                  <Chip
                    label={selectedMarker.category}
                    size="small"
                    color="primary"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                {selectedMarker.description && (
                  <Typography variant="body2" paragraph>
                    {selectedMarker.description}
                  </Typography>
                )}

                {selectedMarker.address && (
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Address:</strong> {selectedMarker.address}
                  </Typography>
                )}

                {selectedMarker.url && (
                  <Typography variant="body2" paragraph>
                    <Box
                      component="a"
                      href={selectedMarker.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: 'primary.main', textDecoration: 'none' }}
                    >
                      Visit Website
                    </Box>
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DirectionsIcon />}
                  fullWidth
                  onClick={() => getDirections(selectedMarker)}
                  size="small"
                >
                  Get Directions
                </Button>
              </Box>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </Paper>
  );
};

export default ReactGoogleMap;
