import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Card as MuiCard,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Info as InfoIcon,
  LocationCity as CityIcon,
  WbSunny as WeatherIcon,
  AccessTime as TimeIcon,
  Language as LanguageIcon,
  LocalAirport as AirportIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  Attractions as AttractionsIcon,
  DirectionsCar as TransportIcon,
  ShoppingBag as ShoppingIcon,
  EventNote as EventIcon,
  Map as MapIcon,
  LocationCity as LocationCityIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { PageHeader, Section, Card } from '../components/common';

const IntroductionPage: React.FC = () => {
  // Quick links data
  const quickLinks = [
    {
      title: 'Attractions',
      icon: <AttractionsIcon color="primary" />,
      description: 'Explore Space Center Houston, museums, and more',
      link: '/attractions',
      image: '/assets/images/intro/attractions.jpg',
    },
    {
      title: 'Dining',
      icon: <RestaurantIcon color="primary" />,
      description: "Discover Houston's diverse culinary scene",
      link: '/dining',
      image: '/assets/images/intro/dining.jpg',
    },
    {
      title: 'Shopping',
      icon: <ShoppingIcon color="primary" />,
      description: 'Find the best shopping destinations',
      link: '/shopping',
      image: '/assets/images/intro/shopping.jpg',
    },
    {
      title: 'FIRST Championship',
      icon: <EventIcon color="primary" />,
      description: 'Information about the FIRST Championship event',
      link: '/first-championship',
      image: '/assets/images/intro/first-championship.jpg',
    },
    {
      title: 'Maps',
      icon: <MapIcon color="primary" />,
      description: 'Interactive maps of Houston',
      link: '/maps',
      image: '/assets/images/intro/maps.jpg',
    },
    {
      title: 'Safety & Logistics',
      icon: <InfoIcon color="primary" />,
      description: 'Important safety and travel information',
      link: '/safety-logistics',
      image: '/assets/images/intro/safety.jpg',
    },
  ];

  // Houston facts data
  const houstonFacts = [
    {
      title: 'Population',
      fact: 'Over 2.3 million in the city, 7+ million in the metro area',
      icon: <CityIcon color="primary" />,
    },
    {
      title: 'Weather',
      fact: 'Subtropical climate. April averages: 60-80°F (15-27°C), can be humid',
      icon: <WeatherIcon color="primary" />,
    },
    {
      title: 'Time Zone',
      fact: 'Central Time (CT): UTC-6 (Standard) / UTC-5 (Daylight)',
      icon: <TimeIcon color="primary" />,
    },
    {
      title: 'Language',
      fact: 'English is the primary language. Spanish is also widely spoken.',
      icon: <LanguageIcon color="primary" />,
    },
    {
      title: 'Airports',
      fact: 'George Bush Intercontinental (IAH) and William P. Hobby (HOU)',
      icon: <AirportIcon color="primary" />,
    },
    {
      title: 'Transportation',
      fact: 'Car-centric city with limited public transit. Rideshare widely available.',
      icon: <TransportIcon color="primary" />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Welcome to Houston"
        subtitle="Your guide to the 2025 FIRST Championship in Houston, Texas"
        data-testid="page-title"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Introduction' }]}
      />

      {/* Welcome Section */}
      <Section title="About This Guide" titleIcon={<InfoIcon color="primary" />} divider>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Welcome to your comprehensive guide for the 2025 FIRST Championship in Houston, Texas!
              This guide has been created to help you navigate the city, find attractions, dining
              options, and everything you need to know for a successful trip.
            </Typography>
            <Typography variant="body1" paragraph>
              Houston is America's fourth-largest city and one of its most diverse. Known for its
              contributions to space exploration, energy industry, medical research, and culinary
              diversity, Houston offers visitors a unique blend of Southern hospitality and
              cosmopolitan experiences.
            </Typography>
            <Typography variant="body1">
              The FIRST Championship will take place at the George R. Brown Convention Center from
              April 16-19, 2025. This guide will help you make the most of your time in Houston,
              whether you're attending the championship or exploring the city.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/intro/houston-skyline.jpg"
              alt="Houston Skyline"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
            <Typography variant="caption" align="center" display="block" sx={{ mt: 1 }}>
              Houston skyline featuring downtown and the Buffalo Bayou
            </Typography>
          </Grid>
        </Grid>
      </Section>

      {/* Quick Links Section */}
      <Section title="Quick Navigation" titleIcon={<MapIcon color="primary" />} divider>
        <Typography variant="body1" paragraph>
          Navigate to key sections of this guide using these quick links:
        </Typography>

        <Grid container spacing={3}>
          {quickLinks.map((link, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MuiCard
                component={RouterLink}
                to={link.link}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia component="img" height="140" image={link.image} alt={link.title} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ mr: 1 }}>{link.icon}</Box>
                    <Typography variant="h6" component="div">
                      {link.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {link.description}
                  </Typography>
                </CardContent>
              </MuiCard>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Houston Facts Section */}
      <Section title="Houston at a Glance" titleIcon={<CityIcon color="primary" />} divider>
        <Typography variant="body1" paragraph>
          Here are some key facts about Houston to help you prepare for your visit:
        </Typography>

        <Grid container spacing={3}>
          {houstonFacts.map((fact, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ mr: 1 }}>{fact.icon}</Box>
                  <Typography variant="h6" component="div">
                    {fact.title}
                  </Typography>
                </Box>
                <Typography variant="body2">{fact.fact}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Accommodation Section */}
      <Section title="Accommodation" titleIcon={<HotelIcon color="primary" />} divider>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              The official hotel for the 2025 FIRST Championship is the Crowne Plaza Houston Med-Ctr
              Galleria Area. It's conveniently located near the George R. Brown Convention Center
              and offers special rates for championship attendees.
            </Typography>
            <Typography variant="body1" paragraph>
              Other recommended areas to stay include:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <HotelIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Downtown Houston"
                  secondary="Close to the convention center, restaurants, and attractions"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HotelIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Medical Center Area"
                  secondary="Quieter area with good access to public transportation"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HotelIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Galleria Area"
                  secondary="Upscale shopping and dining options"
                />
              </ListItem>
            </List>
            <Typography variant="body1">
              We recommend booking your accommodation early, as hotels fill up quickly during the
              championship.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              title="Crowne Plaza Houston Med-Ctr Galleria Area"
              description="The official hotel for the 2025 FIRST Championship, offering special rates for attendees."
              image="/assets/images/intro/crowne-plaza.jpg"
              imageAlt="Crowne Plaza Houston"
              imageHeight={200}
              action={
                <Button
                  variant="contained"
                  color="primary"
                  href="https://www.ihg.com/crowneplaza/hotels/us/en/houston/houcp/hoteldetail"
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  Book Now
                </Button>
              }
            >
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationCityIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    8686 Kirby Dr, Houston, TX 77054
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Check-in: 3:00 PM, Check-out: 12:00 PM
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Use code "FIRST2025" for special rates
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Section>

      {/* Getting Around Section */}
      <Section title="Getting Around" titleIcon={<TransportIcon color="primary" />} divider>
        <Typography variant="body1" paragraph>
          Houston is a car-centric city, but there are several transportation options available:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Public Transportation
              </Typography>
              <Typography variant="body2" paragraph>
                The METRORail Red Line connects downtown to the Museum District, Medical Center, and
                NRG Park. METRO buses cover most of the city, but service can be limited in some
                areas.
              </Typography>
              <Typography variant="body2" paragraph>
                A METRO Day Pass costs $3 and provides unlimited rides on buses and light rail for
                the day.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                href="https://www.ridemetro.org/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 1 }}
              >
                METRO Website
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Rideshare & Taxis
              </Typography>
              <Typography variant="body2" paragraph>
                Uber and Lyft operate throughout Houston and are often the most convenient way to
                get around. Traditional taxis are also available, especially at airports, hotels,
                and the convention center.
              </Typography>
              <Typography variant="body2">
                For longer trips, consider renting a car, especially if you plan to visit
                attractions outside the city center.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/annexes/transport-maps"
            startIcon={<MapIcon />}
          >
            View Detailed Transportation Maps
          </Button>
        </Box>
      </Section>

      {/* What to Pack Section */}
      <Section title="What to Pack" titleIcon={<WeatherIcon color="primary" />}>
        <Typography variant="body1" paragraph>
          Houston in April typically has warm weather with occasional rain. Here's what we recommend
          packing:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <WeatherIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Light clothing" secondary="T-shirts, shorts, light pants" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WeatherIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Light jacket or sweater"
                  secondary="For air-conditioned venues and cooler evenings"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WeatherIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Comfortable walking shoes"
                  secondary="You'll be doing a lot of walking at the convention and attractions"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <WeatherIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Rain gear" secondary="Umbrella or light rain jacket" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WeatherIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Sun protection" secondary="Sunscreen, sunglasses, hat" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WeatherIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Reusable water bottle"
                  secondary="Stay hydrated in Houston's humidity"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/safety-logistics"
            startIcon={<InfoIcon />}
          >
            View Safety & Logistics Information
          </Button>
        </Box>
      </Section>
    </Container>
  );
};

export default IntroductionPage;
