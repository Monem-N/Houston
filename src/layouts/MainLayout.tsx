import { useState } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme as useMuiTheme,
  Divider,
  Link,
  Button,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Map as MapIcon,
  Restaurant as RestaurantIcon,
  Attractions as AttractionsIcon,
  EmojiEvents as EventsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Close as CloseIcon,
  Flight as FlightIcon,
  Park as ParkIcon,
  Museum as MuseumIcon,
  RocketLaunch as RocketLaunchIcon,
  ExpandLess,
  ExpandMore,
  Language as LanguageIcon,
  MenuBook as GuidesIcon,
  Route as ItineraryIcon,
  ShoppingBag as ShoppingIcon,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const MainLayout: React.FC = () => {
  const { mode, toggleColorMode } = useTheme();
  const muiTheme = useMuiTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [itinerariesOpen, setItinerariesOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();

  console.log('Current language:', i18n.language);
  console.log('Translation for menu.home:', t('menu.home'));
  console.log('Translation for menu.guides.title:', t('menu.guides.title'));

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleGuides = () => {
    setGuidesOpen(!guidesOpen);
  };

  const toggleItineraries = () => {
    setItinerariesOpen(!itinerariesOpen);
  };

  const mainMenuItems = [
    { text: t('menu.home'), icon: <HomeIcon />, path: '/' },
    { text: t('menu.maps'), icon: <MapIcon />, path: '/maps' },
    { text: t('menu.firstChampionship'), icon: <EventsIcon />, path: '/first-championship' },
  ];

  const guidesMenuItems = [
    { text: t('menu.guides.dining'), icon: <RestaurantIcon />, path: '/dining' },
    { text: t('menu.guides.attractions'), icon: <AttractionsIcon />, path: '/attractions' },
    { text: t('menu.guides.shopping'), icon: <ShoppingIcon />, path: '/shopping' },
  ];

  const itinerariesMenuItems = [
    { text: t('menu.itineraries.arrivalDeparture'), icon: <FlightIcon />, path: '/guides/arrival-departure' },
    { text: t('menu.itineraries.hermannParkZoo'), icon: <ParkIcon />, path: '/guides/hermann-park-zoo' },
    { text: t('menu.itineraries.museumDistrict'), icon: <MuseumIcon />, path: '/guides/museum-district' },
    { text: t('menu.itineraries.spaceCenterKemah'), icon: <RocketLaunchIcon />, path: '/guides/space-center-kemah' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6">{t('menu.title')}</Typography>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {mainMenuItems.map(item => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={isMobile ? toggleDrawer : undefined}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        {/* Guides Submenu */}
        <ListItem button onClick={toggleGuides}>
          <ListItemIcon>
            <GuidesIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.guides.title')} />
          {guidesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={guidesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {guidesMenuItems.map(item => (
              <ListItem
                button
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={isMobile ? toggleDrawer : undefined}
                sx={{
                  pl: 4,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Itineraries Submenu */}
        <ListItem button onClick={toggleItineraries}>
          <ListItemIcon>
            <ItineraryIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu.itineraries.title')} />
          {itinerariesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={itinerariesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {itinerariesMenuItems.map(item => (
              <ListItem
                button
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={isMobile ? toggleDrawer : undefined}
                sx={{
                  pl: 4,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
              data-testid="mobile-menu-button"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Houston Travel Guide
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
              {/* Main Menu Items */}
              {mainMenuItems.map(item => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    textTransform: 'none',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                  }}
                >
                  {item.text}
                </Button>
              ))}

              {/* Guides Dropdown */}
              <Button
                color="inherit"
                aria-controls="guides-menu"
                aria-haspopup="true"
                onClick={toggleGuides}
                startIcon={<GuidesIcon />}
                endIcon={guidesOpen ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  textTransform: 'none',
                  fontWeight: guidesMenuItems.some(item => location.pathname === item.path) ? 'bold' : 'normal',
                  borderBottom: guidesMenuItems.some(item => location.pathname === item.path) ? '2px solid white' : 'none',
                }}
              >
                {t('menu.guides.title')}
              </Button>
              <Collapse in={guidesOpen} timeout="auto" sx={{ position: 'absolute', top: '64px', bgcolor: 'background.paper', zIndex: 1000, borderRadius: 1, boxShadow: 3 }}>
                <List>
                  {guidesMenuItems.map(item => (
                    <ListItem
                      button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      selected={location.pathname === item.path}
                      onClick={() => setGuidesOpen(false)}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText',
                          '& .MuiListItemIcon-root': {
                            color: 'primary.contrastText',
                          },
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              {/* Itineraries Dropdown */}
              <Button
                color="inherit"
                aria-controls="itineraries-menu"
                aria-haspopup="true"
                onClick={toggleItineraries}
                startIcon={<ItineraryIcon />}
                endIcon={itinerariesOpen ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  textTransform: 'none',
                  fontWeight: itinerariesMenuItems.some(item => location.pathname === item.path) ? 'bold' : 'normal',
                  borderBottom: itinerariesMenuItems.some(item => location.pathname === item.path) ? '2px solid white' : 'none',
                }}
              >
                {t('menu.itineraries.title')}
              </Button>
              <Collapse in={itinerariesOpen} timeout="auto" sx={{ position: 'absolute', top: '64px', right: '150px', bgcolor: 'background.paper', zIndex: 1000, borderRadius: 1, boxShadow: 3 }}>
                <List>
                  {itinerariesMenuItems.map(item => (
                    <ListItem
                      button
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      selected={location.pathname === item.path}
                      onClick={() => setItinerariesOpen(false)}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText',
                          '& .MuiListItemIcon-root': {
                            color: 'primary.contrastText',
                          },
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          )}

          {/* Language Switcher */}
          <IconButton
            color="inherit"
            onClick={handleLanguageMenuOpen}
            aria-label="change language"
            aria-controls="language-menu"
            aria-haspopup="true"
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={languageMenu}
            keepMounted
            open={Boolean(languageMenu)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={() => changeLanguage('en')} selected={i18n.language === 'en'}>
              English
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('fr')} selected={i18n.language === 'fr'}>
              Français
            </MenuItem>
          </Menu>

          {/* Theme Switcher */}
          <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle dark mode">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} data-testid="mobile-menu">
        {drawer}
      </Drawer>

      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Box sx={{ mb: { xs: 2, md: 0 } }}>
              <Typography variant="h6" gutterBottom>
                Houston Travel Guide
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your comprehensive guide for the FIRST Championship 2025
              </Typography>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} All rights reserved
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {[...mainMenuItems, ...guidesMenuItems, ...itinerariesMenuItems].map(item => (
                  <Link
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    color="text.secondary"
                    underline="hover"
                    sx={{ mb: 0.5 }}
                  >
                    {item.text}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
