import * as React from 'react';
import { useTranslation } from 'react-i18next';
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
  Divider,
  Card as MuiCard,
  CardContent,
  Link,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  Attractions as AttractionsIcon,
  AccessTime as TimeIcon,
  AttachMoney as TicketIcon,
  DirectionsCar as TransportIcon,
  Info as InfoIcon,
  Star as StarIcon,
  Restaurant as RestaurantIcon,
  LocalActivity as ActivityIcon,
  School as EducationIcon,
  Sailing as SailingIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { PageHeader, Section, Card } from '../components/common';

const SpaceCenterKemahPage: React.FC = () => {
  const { t } = useTranslation(['guides']);

  // Space Center Houston information
  const spaceCenterInfo = {
    name: 'Space Center Houston',
    description:
      'The official visitor center of NASA Johnson Space Center, featuring spacecraft, artifacts, and interactive exhibits about space exploration.',
    address: '1601 E NASA Pkwy, Houston, TX 77058',
    website: 'https://spacecenter.org/',
    hours: {
      weekdays: '10:00 AM - 5:00 PM',
      weekends: '10:00 AM - 6:00 PM',
    },
    tickets: {
      adult: '$29.95',
      child: '$24.95',
      senior: '$27.95',
      member: 'Free',
    },
    mainExhibits: [
      {
        name: 'NASA Tram Tour',
        description: 'Tour of NASA Johnson Space Center, including Mission Control and Rocket Park',
        icon: <StarIcon color="primary" />,
        mustSee: true,
      },
      {
        name: 'Independence Plaza',
        description:
          'Shuttle Independence mounted on the original NASA 905 shuttle carrier aircraft',
        icon: <StarIcon color="primary" />,
        mustSee: true,
      },
      {
        name: 'Starship Gallery',
        description:
          'Collection of spacecraft including Apollo 17 command module and Lunar Samples Vault',
        icon: <StarIcon color="primary" />,
        mustSee: true,
      },
      {
        name: 'Mission Mars',
        description: 'Interactive exhibit about Mars exploration with full-scale models',
        icon: <EducationIcon color="primary" />,
        mustSee: false,
      },
      {
        name: 'International Space Station Gallery',
        description: 'Learn about life aboard the ISS with interactive displays',
        icon: <EducationIcon color="primary" />,
        mustSee: false,
      },
      {
        name: 'Rocket Park',
        description: 'View the enormous Saturn V rocket that took astronauts to the moon',
        icon: <StarIcon color="primary" />,
        mustSee: true,
      },
    ],
    tips: [
      'Purchase tickets online in advance to avoid lines',
      'Plan to spend at least 4-5 hours to see everything',
      'The NASA Tram Tour can have long wait times; do this early in your visit',
      'Download the Space Center Houston app for maps and schedules',
      'Bring water and wear comfortable shoes',
      'Check the daily schedule for special presentations and films',
      'Consider the Space Center Houston Audio Tour for additional information',
    ],
    transportation: [
      'By Car: 30-45 minutes from downtown Houston via I-45 South',
      'Parking: $5 per vehicle',
      'Ride-sharing: Uber/Lyft available, approximately $35-45 from downtown',
      'Public Transit: Limited options, consider renting a car or using ride-sharing',
    ],
  };

  // Kemah Boardwalk information
  const kemahInfo = {
    name: 'Kemah Boardwalk',
    description:
      'A 60-acre waterfront entertainment complex with rides, restaurants, and shopping, located on Galveston Bay.',
    address: '215 Kipp Ave, Kemah, TX 77565',
    website: 'https://www.kemahboardwalk.com/',
    hours: {
      weekdays: '11:00 AM - 9:00 PM',
      weekends: '10:30 AM - 10:00 PM',
    },
    tickets: {
      allDayPass: '$29.99',
      individualRides: '$4.00 - $6.00 each',
    },
    attractions: [
      {
        name: 'Boardwalk Beast',
        description: 'High-speed boat ride on Galveston Bay',
        icon: <SailingIcon color="primary" />,
        type: 'Ride',
      },
      {
        name: 'Ferris Wheel',
        description: '65-foot wheel with views of Galveston Bay',
        icon: <ActivityIcon color="primary" />,
        type: 'Ride',
      },
      {
        name: 'Boardwalk Bullet',
        description: 'Wooden roller coaster with 42-degree drop',
        icon: <ActivityIcon color="primary" />,
        type: 'Ride',
      },
      {
        name: 'Stingray Reef',
        description: 'Touch and feed live stingrays',
        icon: <ActivityIcon color="primary" />,
        type: 'Attraction',
      },
      {
        name: 'Kemah Boardwalk Marina',
        description: 'Full-service marina with boat slips',
        icon: <SailingIcon color="primary" />,
        type: 'Attraction',
      },
    ],
    restaurants: [
      {
        name: 'Aquarium Restaurant',
        description: 'Seafood restaurant with a 50,000-gallon aquarium',
        cuisine: 'Seafood',
      },
      {
        name: "Landry's Seafood",
        description: 'Gulf Coast seafood and steaks',
        cuisine: 'Seafood',
      },
      {
        name: 'Saltgrass Steak House',
        description: 'Texas-style steakhouse',
        cuisine: 'Steakhouse',
      },
      {
        name: 'Bubba Gump Shrimp Co.',
        description: 'Shrimp dishes inspired by the movie Forrest Gump',
        cuisine: 'Seafood',
      },
    ],
    tips: [
      'Visit on weekdays to avoid crowds',
      'Check the weather forecast before visiting (many attractions are outdoors)',
      'Consider the All-Day Ride Pass if you plan to enjoy multiple rides',
      'Make restaurant reservations in advance, especially on weekends',
      'Bring sunscreen and a hat for outdoor activities',
      'Check the entertainment schedule for live music and special events',
    ],
    transportation: [
      'By Car: 35-50 minutes from downtown Houston via I-45 South',
      'Parking: Free parking available',
      'From Space Center Houston: 15-20 minutes by car',
      'Public Transit: Limited options, consider renting a car or using ride-sharing',
    ],
  };

  // Combined itinerary suggestions with translations
  const itineraries = [
    {
      title: t('guides:spaceCenter.itineraries.fullDay.title'),
      schedule: [
        t('guides:spaceCenter.itineraries.fullDay.schedule.0'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.1'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.2'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.3'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.4'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.5'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.6'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.7'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.8'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.9'),
        t('guides:spaceCenter.itineraries.fullDay.schedule.10'),
      ],
    },
    {
      title: t('guides:spaceCenter.itineraries.spaceCenterFocus.title'),
      schedule: [
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.0'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.1'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.2'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.3'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.4'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.5'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.6'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.7'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.8'),
        t('guides:spaceCenter.itineraries.spaceCenterFocus.schedule.9'),
      ],
    },
    {
      title: t('guides:spaceCenter.itineraries.kemahFocus.title'),
      schedule: [
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.0'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.1'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.2'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.3'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.4'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.5'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.6'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.7'),
        t('guides:spaceCenter.itineraries.kemahFocus.schedule.8'),
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title={t('guides:spaceCenter.title')}
        subtitle={t('guides:spaceCenter.subtitle')}
      />

      {/* Introduction */}
      <Section title={t('guides:spaceCenter.overview.title')} subtitle={t('guides:spaceCenter.overview.subtitle')} divider>
        <Typography paragraph>
          {t('guides:spaceCenter.overview.description')}
        </Typography>
        <Box sx={{ mt: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EducationIcon color="primary" />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {t('guides:spaceCenter.overview.spaceCenterName')}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {spaceCenterInfo.description}
                </Typography>
                <Box
                  sx={{
                    mt: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Chip
                    icon={<TimeIcon />}
                    label={`${spaceCenterInfo.hours.weekdays}`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    icon={<TicketIcon />}
                    label={`${t('guides:spaceCenter.overview.from')} ${spaceCenterInfo.tickets.child}`}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={2}
                sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttractionsIcon color="primary" />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {t('guides:spaceCenter.overview.kemahName')}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {kemahInfo.description}
                </Typography>
                <Box
                  sx={{
                    mt: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Chip
                    icon={<TimeIcon />}
                    label={`${kemahInfo.hours.weekdays}`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    icon={<TicketIcon />}
                    label={t('guides:spaceCenter.overview.ridesFrom')}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Section>

      {/* Space Center Houston Section */}
      <Section title={t('guides:spaceCenter.spaceCenterSection.title')} titleIcon={<EducationIcon color="primary" />} divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('guides:spaceCenter.spaceCenterSection.essentialInfo')}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.address')}
                    </TableCell>
                    <TableCell>{spaceCenterInfo.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.hours')}
                    </TableCell>
                    <TableCell>
                      {t('guides:spaceCenter.spaceCenterSection.weekdays')}: {spaceCenterInfo.hours.weekdays}
                      <br />
                      {t('guides:spaceCenter.spaceCenterSection.weekends')}: {spaceCenterInfo.hours.weekends}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.tickets')}
                    </TableCell>
                    <TableCell>
                      {t('guides:spaceCenter.spaceCenterSection.adult')}: {spaceCenterInfo.tickets.adult}
                      <br />
                      {t('guides:spaceCenter.spaceCenterSection.child')}: {spaceCenterInfo.tickets.child}
                      <br />
                      {t('guides:spaceCenter.spaceCenterSection.senior')}: {spaceCenterInfo.tickets.senior}
                      <br />
                      {t('guides:spaceCenter.spaceCenterSection.member')}: {spaceCenterInfo.tickets.member}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.website')}
                    </TableCell>
                    <TableCell>
                      <Link href={spaceCenterInfo.website} target="_blank" rel="noopener">
                        {spaceCenterInfo.website}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.recommendedTime')}
                    </TableCell>
                    <TableCell>4-5 hours</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('guides:spaceCenter.spaceCenterSection.visitorTips')}
            </Typography>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <List>
                {spaceCenterInfo.tips.map((tip, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <InfoIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          {t('guides:spaceCenter.spaceCenterSection.mustSeeExhibits')}
        </Typography>
        <Grid container spacing={2}>
          {spaceCenterInfo.mainExhibits.map((exhibit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {exhibit.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {exhibit.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    {exhibit.description}
                  </Typography>
                  {exhibit.mustSee && (
                    <Chip label={t('guides:spaceCenter.spaceCenterSection.mustSee')} color="secondary" size="small" sx={{ mt: 1 }} />
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          {t('guides:spaceCenter.spaceCenterSection.gettingThere')}
        </Typography>
        <Paper elevation={2} sx={{ p: 2 }}>
          <List>
            {spaceCenterInfo.transportation.map((option, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <TransportIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Section>

      {/* Kemah Boardwalk Section */}
      <Section title={t('guides:spaceCenter.kemahSection.title')} titleIcon={<AttractionsIcon color="primary" />} divider>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('guides:spaceCenter.kemahSection.essentialInfo')}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.address')}
                    </TableCell>
                    <TableCell>{kemahInfo.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.hours')}
                    </TableCell>
                    <TableCell>
                      {t('guides:spaceCenter.spaceCenterSection.weekdays')}: {kemahInfo.hours.weekdays}
                      <br />
                      {t('guides:spaceCenter.spaceCenterSection.weekends')}: {kemahInfo.hours.weekends}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.tickets')}
                    </TableCell>
                    <TableCell>
                      All-Day Pass: {t('guides:spaceCenterData.kemah.tickets.allDayPass')}
                      <br />
                      Individual Rides: {t('guides:spaceCenterData.kemah.tickets.individualRides')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.website')}
                    </TableCell>
                    <TableCell>
                      <Link href={kemahInfo.website} target="_blank" rel="noopener">
                        {kemahInfo.website}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {t('guides:spaceCenter.spaceCenterSection.recommendedTime')}
                    </TableCell>
                    <TableCell>2-3 hours</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('guides:spaceCenter.spaceCenterSection.visitorTips')}
            </Typography>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
              <List>
                {kemahInfo.tips.map((tip, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <InfoIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              {t('guides:spaceCenter.kemahSection.popularAttractions')}
            </Typography>
            <List>
              {kemahInfo.attractions.map((attraction, index) => (
                <ListItem key={index}>
                  <ListItemIcon>{attraction.icon}</ListItemIcon>
                  <ListItemText primary={attraction.name} secondary={attraction.description} />
                  <Chip label={attraction.type} size="small" variant="outlined" />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              {t('guides:spaceCenter.kemahSection.diningOptions')}
            </Typography>
            <List>
              {kemahInfo.restaurants.map((restaurant, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <RestaurantIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={restaurant.name} secondary={restaurant.description} />
                  <Chip label={restaurant.cuisine} size="small" variant="outlined" />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          {t('guides:spaceCenter.kemahSection.gettingThere')}
        </Typography>
        <Paper elevation={2} sx={{ p: 2 }}>
          <List>
            {kemahInfo.transportation.map((option, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <TransportIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Section>

      {/* Suggested Itineraries */}
      <Section title={t('guides:spaceCenter.itineraries.title')} titleIcon={<TimeIcon color="primary" />} divider>
        <Typography paragraph>
          {t('guides:spaceCenter.itineraries.description')}
        </Typography>

        <Grid container spacing={3}>
          {itineraries.map((itinerary, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {itinerary.title}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List dense>
                    {itinerary.schedule.map((item, i) => (
                      <ListItem key={i} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <TimeIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Related Links */}
      <Section title={t('guides:spaceCenter.relatedResources.title')}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <MuiCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('guides:spaceCenter.relatedResources.maps')}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('guides:spaceCenter.relatedResources.mapsDescription')}
                </Typography>
                <Button component={RouterLink} to="/maps" variant="outlined" color="primary">
                  {t('guides:spaceCenter.relatedResources.viewMaps')}
                </Button>
              </CardContent>
            </MuiCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MuiCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('guides:spaceCenter.relatedResources.transportation')}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('guides:spaceCenter.relatedResources.transportationDescription')}
                </Typography>
                <Button
                  component={RouterLink}
                  to="/annexes/transport-maps"
                  variant="outlined"
                  color="primary"
                >
                  {t('guides:spaceCenter.relatedResources.viewTransportation')}
                </Button>
              </CardContent>
            </MuiCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MuiCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('guides:spaceCenter.relatedResources.arrivalDeparture')}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('guides:spaceCenter.relatedResources.arrivalDepartureDescription')}
                </Typography>
                <Button
                  component={RouterLink}
                  to="/arrival-departure"
                  variant="outlined"
                  color="primary"
                >
                  {t('guides:spaceCenter.relatedResources.viewGuide')}
                </Button>
              </CardContent>
            </MuiCard>
          </Grid>
        </Grid>
      </Section>
    </Container>
  );
};

export default SpaceCenterKemahPage;
