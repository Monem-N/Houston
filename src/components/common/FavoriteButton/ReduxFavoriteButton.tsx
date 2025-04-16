import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectIsFavorite, addFavorite, removeFavorite } from '../../../store/slices/userPreferencesSlice';
import { Location } from '../../../components/maps/types';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';

interface FavoriteButtonProps {
  location: Location;
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
  color?: string;
}

const ReduxFavoriteButton: React.FC<FavoriteButtonProps> = ({
  location,
  size = 'medium',
  showTooltip = true,
  color = 'error',
}) => {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector(state => selectIsFavorite(state, location.id));
  const muiTheme = useMuiTheme();
  const { isMobile } = useDeviceDetect();
  
  const handleToggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isFav) {
      dispatch(removeFavorite(location.id));
    } else {
      dispatch(addFavorite(location));
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

export default ReduxFavoriteButton;
