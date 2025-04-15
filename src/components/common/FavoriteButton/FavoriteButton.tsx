import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useUserPreferences } from '../../../contexts/UserPreferencesContext';
import { Location } from '../../../components/maps/types';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';

interface FavoriteButtonProps {
  location: Location;
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
  color?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  location,
  size = 'medium',
  showTooltip = true,
  color = 'error',
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useUserPreferences();
  const muiTheme = useMuiTheme();
  const { isMobile } = useDeviceDetect();
  
  const isFav = isFavorite(location.id);

  const handleToggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isFav) {
      removeFavorite(location.id);
    } else {
      addFavorite(location);
    }
  };

  const button = (
    <IconButton
      onClick={handleToggleFavorite}
      size={size}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      sx={{
        color: isFav ? muiTheme.palette[color as 'error'].main : 'inherit',
        transition: muiTheme.transitions.create(['color'], {
          duration: muiTheme.transitions.duration.short,
        }),
      }}
    >
      {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );

  if (!showTooltip || isMobile) {
    return button;
  }

  return (
    <Tooltip title={isFav ? 'Remove from favorites' : 'Add to favorites'}>
      {button}
    </Tooltip>
  );
};

export default FavoriteButton;
