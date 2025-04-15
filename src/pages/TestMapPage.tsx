import React, { useEffect, useRef } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { PageHeader } from '../components/common';

// Define the initMap function globally
declare global {
  interface Window {
    initMap?: () => void;
  }
}

const TestMapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the initMap function
    window.initMap = () => {
      if (!mapRef.current) {
        console.error('Map container not found');
        return;
      }

      console.log('initMap called');

      // The location of Houston
      const houston = { lat: 29.7604, lng: -95.3698 };

      // The map, centered at Houston
      const map = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: houston,
        mapId: 'af8bf941f1e27c9d'
      });

      console.log('Map created:', map);

      // The marker, positioned at Houston
      const marker = new google.maps.Marker({
        position: houston,
        map: map,
        title: "Houston"
      });

      console.log('Marker created:', marker);
    };

    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0&callback=initMap&v=weekly';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Clean up
    return () => {
      // Remove the script when component unmounts
      const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      scripts.forEach(s => s.remove());

      // Remove the global initMap function
      window.initMap = null as unknown as (() => void);
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Test Map"
        subtitle="A simple test map to verify Google Maps API integration"
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          This is a simple test page to verify that the Google Maps API is working correctly.
        </Typography>
      </Box>

      <Box
        ref={mapRef}
        sx={{
          width: '100%',
          height: '500px',
          border: '1px solid #ccc',
          borderRadius: 1,
          mb: 4
        }}
      />
    </Container>
  );
};

export default TestMapPage;
