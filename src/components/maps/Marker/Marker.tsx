import React, { useEffect, useState } from 'react';

export interface MarkerProps {
  position: google.maps.LatLngLiteral;
  map: google.maps.Map;
  title?: string;
  icon?: string;
  onClick?: (marker: google.maps.marker.AdvancedMarkerElement | google.maps.Marker) => void;
  children?: React.ReactNode;
}

const Marker: React.FC<MarkerProps> = ({ position, map, title, icon, onClick }) => {
  const [, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map || !window.google) return;

    // Check if the AdvancedMarkerElement class is available
    let newMarker;

    if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      console.log('Using AdvancedMarkerElement');
      // Create marker options for AdvancedMarkerElement
      const markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
        position,
        map,
        title,
        // icon is not supported by AdvancedMarkerElement, we'll handle it differently
      };

      // Create the marker
      newMarker = new google.maps.marker.AdvancedMarkerElement(markerOptions);
    } else {
      console.log('Falling back to standard Marker');
      // Fallback to standard Marker
      const markerOptions: google.maps.MarkerOptions = {
        position,
        map,
        title,
        icon,
      };

      // Create the marker
      newMarker = new google.maps.Marker(markerOptions);
    }
    setMarker(newMarker);

    // Add click event listener
    if (onClick) {
      newMarker.addListener('click', () => onClick(newMarker));
    }

    // Clean up the marker when the component unmounts
    return () => {
      if (newMarker) {
        // Remove the marker from the map
        if ('setMap' in newMarker) {
          (newMarker as google.maps.Marker).setMap(null);
        } else {
          // For AdvancedMarkerElement
          (newMarker as google.maps.marker.AdvancedMarkerElement).map = null;
        }
      }
    };
  }, [map, position, title, icon, onClick]);

  // The marker is rendered by the Google Maps API, so we don't need to return any JSX
  return null;
};

export default Marker;
