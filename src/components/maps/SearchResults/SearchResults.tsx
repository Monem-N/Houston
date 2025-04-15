import * as React from 'react';
import { Box, List, Paper, Typography } from '@mui/material';
// We don't need useDeviceDetect anymore since we're using LocationCard
// import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { Location } from '../types';
import LocationCard from '../../common/LocationCard/LocationCard';

interface SearchResultsProps {
  results: Location[];
  onResultClick: (location: Location) => void;
  onGetDirections: (location: Location) => void;
  getMarkerIcon?: (category: string) => React.ReactNode;
  maxHeight?: string | number;
  onAddToFavorites: (location: Location) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onResultClick,
  onGetDirections,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMarkerIcon,
  maxHeight = '400px',
  onAddToFavorites,
}) => {
  if (results.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1">No results found</Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search or filters
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ mb: 3 }}>
      <List
        sx={{
          width: '100%',
          maxHeight,
          overflow: 'auto',
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {results.map(location => (
          <Box key={location.id} sx={{ px: 2, pb: 1 }}>
            <LocationCard
              location={location}
              onClick={() => onResultClick(location)}
              onGetDirections={onGetDirections}
            />
            <button onClick={() => onAddToFavorites(location)}>❤️</button>
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default SearchResults;
