import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { DirectionsWalk as DirectionsIcon, Place as PlaceIcon } from '@mui/icons-material';
import { Location } from '../../../components/maps/types';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';

interface LocationCardProps {
  location: Location;
  onClick?: (location: Location) => void;
  onGetDirections?: (location: Location) => void;
  selected?: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onClick,
  onGetDirections,
  selected = false,
}) => {
  const { isMobile } = useDeviceDetect();

  const handleClick = () => {
    if (onClick) {
      onClick(location);
    }
  };

  const handleGetDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onGetDirections) {
      onGetDirections(location);
    } else {
      // Default directions handler
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
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          boxShadow: onClick ? 3 : 1,
        },
        ...(selected && {
          border: '2px solid',
          borderColor: 'primary.main',
        }),
      }}
      onClick={handleClick}
    >
      {location.image ? (
        <CardMedia
          component="img"
          sx={{
            width: isMobile ? '100%' : 150,
            height: isMobile ? 140 : 150,
            objectFit: 'cover',
          }}
          image={location.image}
          alt={location.name}
        />
      ) : (
        <Box
          sx={{
            width: isMobile ? '100%' : 150,
            height: isMobile ? 140 : 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
          }}
        >
          <PlaceIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="div" sx={{ pr: 2 }}>
              {location.name}
            </Typography>
            <FavoriteButton location={location} size="small" />
          </Box>
          <Chip
            label={location.category}
            size="small"
            sx={{ textTransform: 'capitalize', mb: 1 }}
          />
          {location.address && (
            <Typography variant="body2" color="text.secondary">
              {location.address}
            </Typography>
          )}
          {location.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {location.description}
            </Typography>
          )}
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <CardActions>
          <Button
            size="small"
            startIcon={<DirectionsIcon />}
            onClick={handleGetDirections}
          >
            Directions
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default LocationCard;
