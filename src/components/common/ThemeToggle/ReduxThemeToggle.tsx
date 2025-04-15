import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectTheme, toggleTheme } from '../../../store/slices/userPreferencesSlice';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

const ReduxThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'medium',
  showTooltip = true 
}) => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const muiTheme = useMuiTheme();
  const { isMobile } = useDeviceDetect();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const button = (
    <IconButton
      onClick={handleToggleTheme}
      color="inherit"
      size={size}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      sx={{
        bgcolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        '&:hover': {
          bgcolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        },
        transition: muiTheme.transitions.create(['background-color'], {
          duration: muiTheme.transitions.duration.short,
        }),
      }}
    >
      {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );

  if (!showTooltip || isMobile) {
    return button;
  }

  return (
    <Tooltip title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {button}
    </Tooltip>
  );
};

export default ReduxThemeToggle;
