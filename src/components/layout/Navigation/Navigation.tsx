import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  useMediaQuery,
  Container,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Map as MapIcon,
  Restaurant as RestaurantIcon,
  Attractions as AttractionsIcon,
  ShoppingBag as ShoppingIcon,
  EmojiEvents as EventIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  ExpandLess,
  ExpandMore,
  // Unused icon
  // Feedback as FeedbackIcon,
  LocalAirport as TravelIcon,
  // Unused icon
  // Bookmark as IndexIcon,
  DirectionsWalk as ItineraryIcon,
  Train as TransportIcon,
  LocalHospital as EmergencyIcon,
  Store as LocalShoppingIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';

// Define the navigation items structure
interface NavItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

// Define styled components
const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: 'inherit',
  '&.active': {
    fontWeight: 'bold',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const Navigation: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  // Define navigation items
  const navItems: NavItem[] = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Introduction', path: '/introduction', icon: <InfoIcon /> },
    { label: 'Attractions', path: '/attractions', icon: <AttractionsIcon /> },
    { label: 'Dining', path: '/dining', icon: <RestaurantIcon /> },
    { label: 'Shopping', path: '/shopping', icon: <ShoppingIcon /> },
    { label: 'Maps', path: '/maps', icon: <MapIcon /> },
    { label: 'Search', path: '/search', icon: <SearchIcon /> },
    { label: 'Favorites', path: '/favorites', icon: <FavoriteIcon /> },
    { label: 'FIRST Championship', path: '/first-championship', icon: <EventIcon /> },
    { label: 'Safety & Logistics', path: '/safety-logistics', icon: <SecurityIcon /> },
    {
      label: 'Annexes',
      icon: <InfoIcon />,
      children: [
        { label: 'Transport Maps', path: '/annexes/transport-maps', icon: <TransportIcon /> },
        { label: 'Local Houston Maps', path: '/annexes/local-houston-maps', icon: <MapIcon /> },
        {
          label: 'Emergency Contacts',
          path: '/annexes/emergency-contacts',
          icon: <EmergencyIcon />,
        },
        { label: 'Touristanbul', path: '/annexes/touristanbul', icon: <TravelIcon /> },
        {
          label: 'Local Dining & Shopping',
          path: '/annexes/local-dining-shopping',
          icon: <LocalShoppingIcon />,
        },
      ],
    },
    {
      label: 'More',
      icon: <InfoIcon />,
      children: [
        // FeedbackPage and ThematicIndexPage removed per user request
        { label: 'Itineraries', path: '/itineraries', icon: <ItineraryIcon /> },
        // Removed DirectMapsPage
        // Removed VeryBasicMapPage
        // Removed IframeMapPage
        // Removed NewMapPage
        // Removed ReactGoogleMapPage
      ],
    },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Render desktop navigation
  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {navItems.map(item => {
        if (item.children) {
          return (
            <Box
              key={item.label}
              sx={{
                position: 'relative',
                '&:hover .MuiBox-root': {
                  display: 'block',
                },
              }}
            >
              <NavButton color="inherit" endIcon={<ExpandMore />}>
                {item.label}
              </NavButton>
              <Box
                sx={{
                  display: 'none',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 1000,
                  minWidth: 200,
                  backgroundColor: 'background.paper',
                  boxShadow: 3,
                  borderRadius: 1,
                }}
              >
                {item.children.map(child => (
                  <Button
                    key={child.label}
                    component={RouterLink}
                    to={child.path || '#'}
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      padding: 1.5,
                      textAlign: 'left',
                      borderRadius: 0,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                    startIcon={child.icon}
                    className={isActive(child.path || '') ? 'active' : ''}
                  >
                    {child.label}
                  </Button>
                ))}
              </Box>
            </Box>
          );
        }
        return (
          <Button
            key={item.label}
            href={item.path || '#'}
            startIcon={item.icon}
            className={isActive(item.path || '') ? 'active' : ''}
            onClick={e => {
              e.preventDefault();
              window.location.href = item.path || '#';
            }}
            sx={{ margin: theme => theme.spacing(0, 1), color: 'inherit' }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );

  // Render mobile navigation drawer
  const renderDrawerItems = (items: NavItem[], level = 0) => (
    <List disablePadding>
      {items.map(item => {
        const hasChildren = item.children && item.children.length > 0;

        return (
          <React.Fragment key={item.label}>
            {item.path ? (
              <ListItem
                component={RouterLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  pl: 2 + level * 2,
                  backgroundColor: isActive(item.path) ? 'action.selected' : 'inherit',
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ) : (
              <ListItem onClick={() => toggleSubMenu(item.label)} sx={{ pl: 2 + level * 2 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {hasChildren && (openSubMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
            )}

            {hasChildren && (
              <Collapse in={openSubMenus[item.label]} timeout="auto" unmountOnExit>
                {renderDrawerItems(item.children!, level + 1)}
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              Houston Guide
            </Typography>

            {/* Theme toggle button */}
            <Box sx={{ mr: 2 }}>
              <ThemeToggle />
            </Box>

            {isMobile ? (
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              renderDesktopNav()
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 300 },
            boxSizing: 'border-box',
          },
        }}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Houston Guide
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {renderDrawerItems(navItems)}
      </Drawer>
    </>
  );
};

export default Navigation;
