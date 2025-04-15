import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { PageHeader } from '../components/common';

const DirectMapPage: React.FC = () => {
  useEffect(() => {
    // Add the Google Maps API script to the document
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0&callback=initMap&v=weekly';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Define the initMap function
    window.initMap = () => {
      console.log('initMap called');

      // Get the map container
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      // The location of Houston
      const houston = { lat: 29.7604, lng: -95.3698 };

      // The map, centered at Houston
      const map = new google.maps.Map(mapContainer, {
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

      // Add more markers
      const locations = [
        { lat: 29.7521, lng: -95.3578, title: 'Downtown Houston' },
        { lat: 29.7211, lng: -95.3897, title: 'Museum District' },
        { lat: 29.7372, lng: -95.4148, title: 'Montrose' },
        { lat: 29.7340, lng: -95.4150, title: 'Rice Village' }
      ];

      locations.forEach(location => {
        new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.title
        });
      });
    };

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
        title="Direct Map"
        subtitle="A direct implementation of Google Maps"
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          This page demonstrates a direct implementation of Google Maps without any React components.
        </Typography>
      </Box>

      <Box
        id="map"
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

// Add the initMap function to the window object
declare global {
  interface Window {
    initMap?: () => void;
  }
}

export default DirectMapPage;
