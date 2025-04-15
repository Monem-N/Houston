import * as React from 'react';
import { Typography, Box, Paper, Grid, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Section } from '../components/common';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Section sx={{ mb: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            mb: 4,
            bgcolor: 'background.default',
            backgroundImage: 'url(/assets/images/general/houston-skyline.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            borderRadius: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 2,
            },
          }}
        >
          <Box sx={{ position: 'relative', color: 'white', textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Houston Travel Guide
            </Typography>
            <Typography variant="h6" paragraph>
              Your comprehensive guide for the FIRST Championship 2025 in Houston, Texas
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/maps"
              >
                Explore Maps
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={RouterLink}
                to="/first-championship"
                sx={{ color: 'white', borderColor: 'white' }}
              >
                FIRST Championship Info
              </Button>
            </Box>
          </Box>
        </Paper>
      </Section>

      <Section title="Featured Attractions" sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              title="Space Center Houston"
              description="Explore NASA's Johnson Space Center and learn about space exploration."
              image="/assets/images/attractions/space-center-desktop.jpg"
              imageAlt="Space Center Houston"
              action={
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/attractions"
                  size="small"
                >
                  Learn More
                </Button>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              title="Museum District"
              description="Visit Houston's renowned museums and cultural institutions."
              image="/assets/images/attractions/museum-district.jpg"
              imageAlt="Museum District"
              action={
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/attractions"
                  size="small"
                >
                  Learn More
                </Button>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              title="FIRST Championship"
              description="Everything you need to know about the FIRST Championship event."
              image="/assets/images/events/first-championship.jpg"
              imageAlt="FIRST Championship"
              action={
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/first-championship"
                  size="small"
                >
                  Learn More
                </Button>
              }
            />
          </Grid>
        </Grid>
      </Section>

      <Section title="Quick Links" sx={{ mb: 6 }}>
        <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/maps"
                sx={{ py: 2 }}
              >
                Maps
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/dining"
                sx={{ py: 2 }}
              >
                Dining
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="info"
                component={RouterLink}
                to="/attractions"
                sx={{ py: 2 }}
              >
                Attractions
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                component={RouterLink}
                to="/first-championship"
                sx={{ py: 2 }}
              >
                FIRST Championship
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Section>
    </Container>
  );
};

export default HomePage;
