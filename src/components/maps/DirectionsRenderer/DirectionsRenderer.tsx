import React, { useEffect, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { Location } from '../types';
import { fetchDirections } from '../../../utils/directionsUtils';

interface DirectionsRendererProps {
  locations: Location[];
  routeColor?: string;
  showMarkers?: boolean;
}

const DirectionsRenderer: React.FC<DirectionsRendererProps> = ({
  locations,
  routeColor = '#2196F3',
  showMarkers = false,
}) => {
  const map = useMap();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  // We'll store the directions result in state but don't need to access it directly
  const [, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);

  // Initialize the DirectionsRenderer
  useEffect(() => {
    if (!map) return;

    const renderer = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: !showMarkers,
      polylineOptions: {
        strokeColor: routeColor,
        strokeWeight: 5,
        strokeOpacity: 0.7,
      },
    });

    setDirectionsRenderer(renderer);

    return () => {
      if (renderer) {
        renderer.setMap(null);
      }
    };
  }, [map, routeColor, showMarkers]);

  // Fetch and display directions when locations change
  useEffect(() => {
    if (!map || !directionsRenderer || locations.length < 2) return;

    const getDirections = async () => {
      try {
        console.log('Fetching directions for locations:', locations);
        // Fetch directions using the utility function
        const result = await fetchDirections(locations, '');

        if (result) {
          console.log('Directions result received:', result);
          directionsRenderer.setDirections(result);
          setDirectionsResult(result);
        } else {
          console.warn('No directions result received');
        }
      } catch (error) {
        console.error('Error fetching directions in DirectionsRenderer:', error);
      }
    };

    getDirections();

    return () => {
      if (directionsRenderer) {
        directionsRenderer.setDirections(null);
      }
    };
  }, [map, directionsRenderer, locations]);

  return null; // This component doesn't render anything directly
};

export default DirectionsRenderer;
