import { useRef, useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

// Define the initMap function globally
declare global {
  interface Window {
    initGoogleMap?: (containerId: string) => void;
  }
}

// Define the props for the GoogleMap component
export interface GoogleMapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  mapId?: string;
  mapContainerStyle?: React.CSSProperties;
  options?: google.maps.MapOptions;
  onMapLoad?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

// Define the default center coordinates (Houston)
const defaultCenter = { lat: 29.7604, lng: -95.3698 };

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = defaultCenter,
  zoom = 12,
  mapId,
  mapContainerStyle = { width: '100%', height: '500px' },
  options,
  onMapLoad,
  children,
}) => {
  // Create a ref to store the map instance
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerId = `map-${Math.random().toString(36).substring(2, 9)}`;

  // Initialize the map when the component mounts
  useEffect(() => {
    console.log('GoogleMap component mounted');

    // Define the initMap function
    window.initGoogleMap = (id: string) => {
      if (id !== containerId) return;

      console.log(`initGoogleMap called for ${id}`);
      console.log('mapRef.current:', mapRef.current);
      console.log('document.getElementById:', document.getElementById(containerId));

      // Try to get the container element by ref or by ID
      const container = mapRef.current || document.getElementById(containerId);

      if (!container) {
        console.error('Map container not found');
        setError('Map container not found. Please try again later.');
        setLoading(false);
        return;
      }

      try {
        // Create the map instance
        const mapOptions: google.maps.MapOptions = {
          center,
          zoom,
          mapId,
          ...options,
        };

        const newMap = new google.maps.Map(container, mapOptions);
        console.log('Map created:', newMap);
        setMap(newMap);
        setLoading(false);

        // Call the onMapLoad callback if provided
        if (onMapLoad) {
          onMapLoad(newMap);
        }
      } catch (err) {
        console.error('Error initializing Google Map:', err);
        setError('Failed to initialize Google Map. Please try again later.');
        setLoading(false);
      }
    };

    // Check if Google Maps API script is already loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');

    if (existingScript) {
      console.log('Google Maps API script already exists, calling initGoogleMap directly');
      // If the script is already loaded, call the init function directly
      setTimeout(() => {
        if (window.google && window.google.maps) {
          window.initGoogleMap?.(containerId);
        } else {
          console.error('Google Maps API not loaded yet');
          setError('Google Maps API not loaded. Please refresh the page or check your internet connection.');
          setLoading(false);
        }
      }, 100);
    } else {
      // Load the Google Maps API script
      console.log('Loading Google Maps API script');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0&callback=initGoogleMap&v=weekly&map_ids=${mapId || 'af8bf941f1e27c9d'}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API script loaded');
        window.initGoogleMap?.(containerId);
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setError('Failed to load Google Maps API. Please check your internet connection and try again.');
        setLoading(false);
      };
      document.head.appendChild(script);
    }

    // Clean up
    return () => {
      // Only remove the script if we created it
      if (!existingScript) {
        const scriptToRemove = document.querySelector(`script[src*="callback=initGoogleMap"]`);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      }

      // Remove the global initMap function
      delete window.initGoogleMap;
    };
  }, [center, zoom, mapId, options, onMapLoad, containerId]);

  // Render loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: mapContainerStyle.height || '500px',
          width: mapContainerStyle.width || '100%',
          bgcolor: 'background.paper',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: mapContainerStyle.height || '500px',
          width: mapContainerStyle.width || '100%',
          bgcolor: 'background.paper',
          color: 'error.main',
          border: '1px solid',
          borderColor: 'error.main',
          borderRadius: 1,
          p: 2,
        }}
      >
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Render the map
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        ref={mapRef}
        id={containerId}
        sx={{
          width: mapContainerStyle.width || '100%',
          height: mapContainerStyle.height || '500px',
          borderRadius: 1,
          overflow: 'hidden',
        }}
        data-testid="google-map-container"
      />
      {/* Render children (markers, etc.) */}
      {map && children}
    </Box>
  );
};

export default GoogleMap;
