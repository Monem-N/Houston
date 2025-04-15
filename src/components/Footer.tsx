import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme => theme.palette.primary.main,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Houston Travel Guide
            </Typography>
            <Typography variant="body2">
              Your comprehensive guide to Houston for the FIRST Championship 2025
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block">
              Home
            </Link>
            <Link component={RouterLink} to="/attractions" color="inherit" display="block">
              Attractions
            </Link>
            <Link component={RouterLink} to="/dining" color="inherit" display="block">
              Dining
            </Link>
            <Link component={RouterLink} to="/maps" color="inherit" display="block">
              Maps
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Annexes
            </Typography>
            <Link component={RouterLink} to="/transport-maps" color="inherit" display="block">
              Transport Maps
            </Link>
            <Link component={RouterLink} to="/emergency-contacts" color="inherit" display="block">
              Emergency Contacts
            </Link>
            <Link component={RouterLink} to="/touristanbul" color="inherit" display="block">
              Touristanbul
            </Link>
            <Link
              component={RouterLink}
              to="/local-dining-shopping"
              color="inherit"
              display="block"
            >
              Local Dining & Shopping
            </Link>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Houston Travel Guide. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
