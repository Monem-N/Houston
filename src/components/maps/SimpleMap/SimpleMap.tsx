import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Paper } from '@mui/material';

interface SimpleMapProps {
  apiKey?: string;
  mapId?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string | number;
  width?: string | number;
}

const SimpleMap: React.FC<SimpleMapProps> = ({
  apiKey = 'AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0',
  mapId = 'af8bf941f1e27c9d',
  center = { lat: 29.7604, lng: -95.3698 }, // Default to Houston
  zoom = 12,
  height = 500,
  width = '100%',
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        height,
        width,
        overflow: 'hidden',
      }}
    >
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={mapId}
          defaultCenter={center}
          defaultZoom={zoom}
          style={{ width: '100%', height: '100%' }}
        />
      </APIProvider>
    </Paper>
  );
};

export default SimpleMap;
