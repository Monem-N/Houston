import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  Feedback as FeedbackIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // Footer navigation sections
  const footerSections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Attractions', path: '/attractions' },
        { name: 'Dining', path: '/dining' },
        { name: 'Shopping', path: '/shopping' },
        { name: 'Maps', path: '/maps' },
        { name: 'FIRST Championship', path: '/first-championship' },
      ],
    },
    {
      title: 'Annexes',
      links: [
        { name: 'Transport Maps', path: '/annexes/transport-maps' },
        { name: 'Emergency Contacts', path: '/annexes/emergency-contacts' },
        { name: 'Touristanbul', path: '/annexes/touristanbul' },
        { name: 'Local Dining & Shopping', path: '/annexes/local-dining-shopping' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Thematic Index', path: '/thematic-index' },
        { name: 'Itineraries', path: '/itineraries' },
        { name: 'Feedback', path: '/feedback' },
        { name: 'Safety & Logistics', path: '/safety-logistics' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Houston Guide
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your comprehensive guide for the FIRST Championship 2025 in Houston, Texas. Find
              information about attractions, dining, shopping, and more.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="facebook" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="primary">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="github" color="primary">
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Navigation sections */}
          {footerSections.map(section => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map(link => (
                  <Box component="li" key={link.name} sx={{ py: 0.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="text.secondary"
                      underline="hover"
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Feedback button */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Feedback
            </Typography>
            <Link
              component={RouterLink}
              to="/feedback"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <FeedbackIcon sx={{ mr: 1 }} />
              Send Feedback
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Houston Guide. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="text.secondary" sx={{ ml: 2 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" sx={{ ml: 2 }}>
              Terms of Use
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
