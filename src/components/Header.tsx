import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  // useMediaQuery, // Removed unused import
  // useTheme, // Removed unused import
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Navigation items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Attractions', path: '/attractions' },
  { name: 'Dining', path: '/dining' },
  { name: 'Shopping', path: '/shopping' },
  { name: 'Maps', path: '/maps' },
  { name: 'FIRST Championship', path: '/first-championship' },
  { name: 'Safety & Logistics', path: '/safety-logistics' },
];

interface HeaderProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Header = ({ mobileOpen, handleDrawerToggle }: HeaderProps) => {
  // const theme = useTheme(); // Removed unused variable
  // const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Removed unused variable

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Houston Guide
      </Typography>
      <List>
        {navItems.map(item => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'block' },
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Houston Travel Guide
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map(item => (
              <Button key={item.name} component={RouterLink} to={item.path} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
