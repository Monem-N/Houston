import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Container, Grid, Chip, Rating } from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  LocalCafe as CafeIcon,
  LocalBar as BarIcon,
} from '@mui/icons-material';
import { Card, PageHeader, Section } from '../components/common';

const DiningPage: React.FC = () => {
  const { t } = useTranslation();
  // Placeholder data for restaurants
  const restaurants = [
    {
      id: 1,
      name: 'Houston Restaurant 1',
      type: 'American',
      rating: 4.5,
      image: '/assets/images/dining/restaurant1.jpg',
      description: 'A popular American restaurant with a variety of dishes.',
      category: 'restaurant',
    },
    {
      id: 2,
      name: 'Houston Cafe 1',
      type: 'Cafe',
      rating: 4.2,
      image: '/assets/images/dining/cafe1.jpg',
      description: 'A cozy cafe with great coffee and pastries.',
      category: 'cafe',
    },
    {
      id: 3,
      name: 'Houston Bar 1',
      type: 'Bar & Grill',
      rating: 4.0,
      image: '/assets/images/dining/bar1.jpg',
      description: 'A lively bar with good food and drinks.',
      category: 'bar',
    },
    {
      id: 4,
      name: 'Houston Restaurant 2',
      type: 'Mexican',
      rating: 4.7,
      image: '/assets/images/dining/restaurant2.jpg',
      description: 'Authentic Mexican cuisine in a vibrant atmosphere.',
      category: 'restaurant',
    },
    {
      id: 5,
      name: 'Houston Cafe 2',
      type: 'Bakery',
      rating: 4.3,
      image: '/assets/images/dining/cafe2.jpg',
      description: 'Fresh baked goods and specialty coffees.',
      category: 'cafe',
    },
    {
      id: 6,
      name: 'Houston Restaurant 3',
      type: 'Italian',
      rating: 4.6,
      image: '/assets/images/dining/restaurant3.jpg',
      description: 'Traditional Italian dishes in a family-friendly setting.',
      category: 'restaurant',
    },
  ];

  // Function to get the appropriate icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant':
        return <RestaurantIcon />;
      case 'cafe':
        return <CafeIcon />;
      case 'bar':
        return <BarIcon />;
      default:
        return <RestaurantIcon />;
    }
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title={t('dining.title', 'Dining')}
        subtitle={t('dining.subtitle', 'Explore the best dining options in Houston near the FIRST Championship venues.')}
        data-testid="page-title"
        breadcrumbs={[{ label: t('navigation.home', 'Home'), path: '/'}, { label: t('navigation.dining', 'Dining') }]}
      />

      <Section title={t('dining.featuredRestaurants', 'Featured Restaurants')} titleIcon={<RestaurantIcon color="primary" />} divider>
        <Grid container spacing={3}>
          {restaurants.map(restaurant => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Card
                title={t(`dining.restaurants.${restaurant.id}.name`, restaurant.name)}
                description={t(`dining.restaurants.${restaurant.id}.description`, restaurant.description)}
                image={restaurant.image}
                imageAlt={restaurant.name}
                imageHeight={160}
              >
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Chip
                      icon={getCategoryIcon(restaurant.category)}
                      label={t(`dining.restaurants.${restaurant.id}.type`, restaurant.type)}
                      size="small"
                      color={
                        restaurant.category === 'restaurant'
                          ? 'primary'
                          : restaurant.category === 'cafe'
                            ? 'secondary'
                            : 'default'
                      }
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={restaurant.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {restaurant.rating}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Container>
  );
};

export default DiningPage;
