import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useTheme } from '../../../contexts/ThemeContext';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'medium',
  showTooltip = true 
}) => {
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const { isMobile } = useDeviceDetect();

  const button = (
    <IconButton
      onClick={toggleColorMode}
      color="inherit"
      size={size}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      sx={{
        bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        '&:hover': {
          bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        },
        transition: muiTheme.transitions.create(['background-color'], {
          duration: muiTheme.transitions.duration.short,
        }),
      }}
    >
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );

  if (!showTooltip || isMobile) {
    return button;
  }

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {button}
    </Tooltip>
  );
};

export default ThemeToggle;
