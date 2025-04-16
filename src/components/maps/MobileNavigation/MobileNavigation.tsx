import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Map as MapIcon,
  Attractions as AttractionsIcon,
  Restaurant as RestaurantIcon,
  ShoppingBag as ShoppingIcon,
  Hotel as HotelIcon,
  DirectionsCar as TransportIcon,
  EmojiEvents as EventsIcon,
  Route as RouteIcon,
} from '@mui/icons-material';

interface MobileNavigationProps {
  activeTab: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, onChange }) => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={onChange}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.65rem',
            },
          },
        }}
      >
        <BottomNavigationAction label="All" icon={<MapIcon />} />
        <BottomNavigationAction label="Attractions" icon={<AttractionsIcon />} />
        <BottomNavigationAction label="Food" icon={<RestaurantIcon />} />
        <BottomNavigationAction label="Shopping" icon={<ShoppingIcon />} />
        <BottomNavigationAction label="Hotels" icon={<HotelIcon />} />
        <BottomNavigationAction label="Transport" icon={<TransportIcon />} />
        <BottomNavigationAction label="FIRST" icon={<EventsIcon />} />
        <BottomNavigationAction label="Routes" icon={<RouteIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNavigation;
