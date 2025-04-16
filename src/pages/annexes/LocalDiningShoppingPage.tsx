import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, Chip } from '@mui/material';
import { PageHeader } from '../../components/common';
import { Restaurant as RestaurantIcon, ShoppingBag as ShoppingIcon, LocalCafe as CafeIcon } from '@mui/icons-material';

const LocalDiningShoppingPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Local Dining & Shopping"
        subtitle="Discover the best places to eat and shop near your hotel and the convention center"
      />
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <RestaurantIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5">
            Dining Options
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Near Crowne Plaza Hotel (Medical Center)
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Pappadeaux Seafood Kitchen
              </Typography>
              <Chip label="Seafood" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="$$" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                2525 South Loop W, Houston, TX 77054
              </Typography>
              <Typography variant="body2">
                Popular seafood restaurant with Cajun-inspired dishes. Known for their gumbo and fresh fish.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Fadi's Mediterranean Grill
              </Typography>
              <Chip label="Mediterranean" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="$$" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                4738 Beechnut St, Houston, TX 77096
              </Typography>
              <Typography variant="body2">
                Fresh Mediterranean cuisine with a buffet-style service. Great for vegetarians.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Pho Saigon
              </Typography>
              <Chip label="Vietnamese" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="$" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                2808 Milam St #D, Houston, TX 77006
              </Typography>
              <Typography variant="body2">
                Authentic Vietnamese restaurant known for their delicious pho and banh mi sandwiches.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Typography variant="h6" gutterBottom>
          Near George R. Brown Convention Center
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Xochi
              </Typography>
              <Chip label="Mexican" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="$$$" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                1777 Walker St, Houston, TX 77010
              </Typography>
              <Typography variant="body2">
                Upscale Oaxacan cuisine by award-winning chef Hugo Ortega. Known for mole dishes and creative cocktails.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                The Grove
              </Typography>
              <Chip label="American" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="$$$" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                1611 Lamar St, Houston, TX 77010
              </Typography>
              <Typography variant="body2">
                Located in Discovery Green park, offering upscale American cuisine with a focus on local ingredients.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Pappasito's Cantina
              </Typography>
              <Chip label="Tex-Mex" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="$$" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                1600 Lamar St, Houston, TX 77010
              </Typography>
              <Typography variant="body2">
                Popular Tex-Mex restaurant known for fajitas, margaritas, and lively atmosphere.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ShoppingIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5">
            Shopping Destinations
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                The Galleria
              </Typography>
              <Chip label="Upscale Mall" size="small" sx={{ mr: 1, mb: 1 }} />
              <Typography variant="body2" paragraph>
                5085 Westheimer Rd, Houston, TX 77056
              </Typography>
              <Typography variant="body2" paragraph>
                Houston's premier shopping destination with over 400 stores, including luxury brands, 
                department stores, and specialty shops. Also features an ice skating rink and numerous restaurants.
              </Typography>
              <Typography variant="body2">
                Distance from hotel: ~15 minutes by car
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Rice Village
              </Typography>
              <Chip label="Shopping District" size="small" sx={{ mr: 1, mb: 1 }} />
              <Typography variant="body2" paragraph>
                2500 Rice Blvd, Houston, TX 77005
              </Typography>
              <Typography variant="body2" paragraph>
                Charming shopping district near Rice University with a mix of national retailers, 
                local boutiques, and diverse dining options. Great for casual shopping and dining.
              </Typography>
              <Typography variant="body2">
                Distance from hotel: ~10 minutes by car
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Highland Village
              </Typography>
              <Chip label="Outdoor Shopping Center" size="small" sx={{ mr: 1, mb: 1 }} />
              <Typography variant="body2" paragraph>
                4055 Westheimer Rd, Houston, TX 77027
              </Typography>
              <Typography variant="body2" paragraph>
                Upscale outdoor shopping center with a mix of high-end retailers, specialty stores, 
                and restaurants. Features beautiful landscaping and a relaxed atmosphere.
              </Typography>
              <Typography variant="body2">
                Distance from hotel: ~15 minutes by car
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Katy Mills Mall
              </Typography>
              <Chip label="Outlet Mall" size="small" sx={{ mr: 1, mb: 1 }} />
              <Typography variant="body2" paragraph>
                5000 Katy Mills Cir, Katy, TX 77494
              </Typography>
              <Typography variant="body2" paragraph>
                Large outlet mall with over 175 stores offering discounted prices on name brands. 
                Great for bargain shopping and finding deals on clothing, accessories, and more.
              </Typography>
              <Typography variant="body2">
                Distance from hotel: ~30 minutes by car
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CafeIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5">
            Coffee Shops & Quick Bites
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Starbucks
            </Typography>
            <Typography variant="body2" paragraph>
              Multiple locations, including one in the Medical Center and near the Convention Center
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Tout Suite
            </Typography>
            <Typography variant="body2" paragraph>
              2001 Commerce St, Houston, TX 77002
            </Typography>
            <Typography variant="body2">
              Hip café near the convention center with coffee, pastries, and light meals
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Antidote Coffee
            </Typography>
            <Typography variant="body2" paragraph>
              729 Studewood St, Houston, TX 77007
            </Typography>
            <Typography variant="body2">
              Local coffee shop with a cozy atmosphere and great coffee
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LocalDiningShoppingPage;
