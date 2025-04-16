import React, { useEffect, useState } from 'react';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { Box, Typography, Paper, Divider, Chip, CircularProgress } from '@mui/material';
import { Directions as DirectionsIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { Location } from '../types';
import { fetchDirections, calculateRouteInfo } from '../../../utils/directionsUtils';

interface RouteInfoProps {
  locations: Location[];
}

const RouteInfo: React.FC<RouteInfoProps> = ({ locations }) => {
  const { isMobile } = useDeviceDetect();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    totalDistance: string;
    totalDuration: string;
  } | null>(null);

  useEffect(() => {
    const getRouteInfo = async () => {
      if (locations.length < 2) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const directionsResult = await fetchDirections(locations);

        if (directionsResult) {
          const info = calculateRouteInfo(directionsResult);
          setRouteInfo(info);
        }
      } catch (error) {
        console.error('Error fetching route info:', error);
        setError('Unable to calculate route information.');
      } finally {
        setIsLoading(false);
      }
    };

    getRouteInfo();
  }, [locations]);

  if (locations.length < 2) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          At least two locations are needed to calculate route information.
        </Typography>
      </Paper>
    );
  }

  if (isLoading) {
    return (
      <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress size={24} />
        <Typography>Calculating route information...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: isMobile ? 1.5 : 2, mb: 2 }}>
      <Typography variant={isMobile ? 'subtitle1' : 'h6'} gutterBottom>
        Route Information
      </Typography>
      <Divider sx={{ mb: isMobile ? 1.5 : 2 }} />

      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: isMobile ? 1 : 2
      }}>
        <Chip
          icon={<DirectionsIcon />}
          label={`Total Distance: ${routeInfo?.totalDistance || 'N/A'}`}
          color="primary"
          variant="outlined"
          sx={{ height: isMobile ? 32 : 'auto' }}
        />

        <Chip
          icon={<AccessTimeIcon />}
          label={`Estimated Time: ${routeInfo?.totalDuration || 'N/A'}`}
          color="secondary"
          variant="outlined"
          sx={{ height: isMobile ? 32 : 'auto' }}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: isMobile ? 1.5 : 2, fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
        Note: Travel times may vary based on traffic conditions.
      </Typography>
    </Paper>
  );
};

export default RouteInfo;
