import { useState, ReactNode, FC, Fragment, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
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
  Menu,
  MenuItem,
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
  Language as LanguageIcon,
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
import TimeDisplay from '../../common/TimeDisplay';

// Define the navigation items structure
interface NavItem {
  label: string;
  path?: string;
  icon: ReactNode;
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

const Navigation: FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const { t, i18n } = useTranslation();
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  // Define navigation items
  const navItems: NavItem[] = [
    { label: t('navigation.home'), path: '/', icon: <HomeIcon /> },
    { label: t('navigation.maps'), path: '/maps', icon: <MapIcon /> },
    { label: t('navigation.firstChampionship'), path: '/first-championship', icon: <EventIcon /> },
    { label: t('navigation.search', 'Search'), path: '/search', icon: <SearchIcon /> },
    { label: t('navigation.favorites', 'Favorites'), path: '/favorites', icon: <FavoriteIcon /> },
    {
      label: t('menu.guides.title', 'Guides'),
      icon: <InfoIcon />,
      children: [
        { label: t('navigation.dining'), path: '/dining', icon: <RestaurantIcon /> },
        { label: t('navigation.attractions'), path: '/attractions', icon: <AttractionsIcon /> },
        { label: t('navigation.shopping'), path: '/shopping', icon: <ShoppingIcon /> },
      ],
    },
    {
      label: t('navigation.itineraries'),
      icon: <ItineraryIcon />,
      children: [
        {
          label: t('guides.arrival.title'),
          path: '/guides/arrival-departure',
          icon: <TravelIcon />,
        },
        {
          label: t('guides.hermannPark.title'),
          path: '/guides/hermann-park-zoo',
          icon: <AttractionsIcon />,
        },
        {
          label: t('guides.museumDistrict.title'),
          path: '/guides/museum-district',
          icon: <AttractionsIcon />,
        },
        {
          label: t('guides.spaceCenter.title'),
          path: '/guides/space-center-kemah',
          icon: <AttractionsIcon />,
        },
      ],
    },
    {
      label: t('navigation.more', 'More'),
      icon: <InfoIcon />,
      children: [
        { label: t('navigation.introduction'), path: '/introduction', icon: <InfoIcon /> },
        { label: t('navigation.safety'), path: '/safety-logistics', icon: <SecurityIcon /> },
        {
          label: t('navigation.transportMaps'),
          path: '/annexes/transport-maps',
          icon: <TransportIcon />,
        },
        {
          label: t('navigation.localMaps', 'Local Houston Maps'),
          path: '/annexes/local-houston-maps',
          icon: <MapIcon />,
        },
        {
          label: t('navigation.emergencyContacts'),
          path: '/annexes/emergency-contacts',
          icon: <EmergencyIcon />,
        },
        {
          label: t('navigation.touristanbul'),
          path: '/annexes/touristanbul',
          icon: <TravelIcon />,
        },
        {
          label: t('navigation.localDining'),
          path: '/annexes/local-dining-shopping',
          icon: <LocalShoppingIcon />,
        },
      ],
    },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown') {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Tab' || keyboardEvent.key === 'Shift') {
        return;
      }
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
              <NavButton color="inherit" startIcon={item.icon} endIcon={<ExpandMore />}>
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
            component={RouterLink}
            to={item.path || '#'}
            startIcon={item.icon}
            className={isActive(item.path || '') ? 'active' : ''}
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
          <Fragment key={item.label}>
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
          </Fragment>
        );
      })}
    </List>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', mr: 2, flexGrow: { xs: 1, md: 0 } }}
            >
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {t('app.title', 'Houston Guide')}
              </Typography>
              <TimeDisplay />
            </Box>

            {/* Language switcher */}
            <IconButton
              color="inherit"
              onClick={handleLanguageMenuOpen}
              sx={{ mr: 1 }}
              aria-label="change language"
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={languageMenuAnchor}
              open={Boolean(languageMenuAnchor)}
              onClose={handleLanguageMenuClose}
            >
              <MenuItem onClick={() => changeLanguage('en')} selected={i18n.language === 'en'}>
                English
              </MenuItem>
              <MenuItem onClick={() => changeLanguage('fr')} selected={i18n.language === 'fr'}>
                Français
              </MenuItem>
            </Menu>

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
            {t('app.title', 'Houston Guide')}
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
