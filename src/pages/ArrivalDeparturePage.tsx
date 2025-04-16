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
  Link,
  Button,
} from '@mui/material';
import {
  LocalAirport as AirportIcon,
  DirectionsCar as TransportIcon,
  Hotel as HotelIcon,
  AccessTime as TimeIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import PageHeader from '../components/common/PageHeader';
import Section from '../components/common/Section';

const ArrivalDeparturePage: React.FC = () => {
  const { t } = useTranslation();

  // Airport information
  const airports = [
    {
      name: 'George Bush Intercontinental Airport (IAH)',
      code: 'IAH',
      description: "Houston's largest international airport, located 23 miles north of downtown",
      icon: <AirportIcon color="primary" />,
      website: 'https://www.fly2houston.com/iah/',
      transportOptions: [
        'Taxi: $45-60 to downtown, 30-45 minutes',
        'Uber/Lyft: $35-45 to downtown, 30-45 minutes',
        'METRO Bus: Route 102, $1.25, 60-75 minutes to downtown',
        'Shuttle: SuperShuttle shared ride, $23+ per person',
        'Rental Car: All major companies available at the airport',
      ],
    },
    {
      name: 'William P. Hobby Airport (HOU)',
      code: 'HOU',
      description:
        'Smaller airport located 7 miles southeast of downtown, primarily domestic flights',
      icon: <AirportIcon color="primary" />,
      website: 'https://www.fly2houston.com/hou/',
      transportOptions: [
        'Taxi: $25-35 to downtown, 15-25 minutes',
        'Uber/Lyft: $20-30 to downtown, 15-25 minutes',
        'METRO Bus: Route 40, $1.25, 50-60 minutes to downtown',
        'Shuttle: SuperShuttle shared ride, $19+ per person',
        'Rental Car: All major companies available at the airport',
      ],
    },
  ];

  // Hotel check-in/check-out information
  const hotelInfo = {
    checkInTime: 'Typically 3:00 PM - 4:00 PM',
    checkOutTime: 'Typically 11:00 AM - 12:00 PM',
    earlyCheckIn: 'May be available for an additional fee, subject to room availability',
    lateCheckOut: 'May be available for an additional fee, subject to room availability',
    luggageStorage: 'Most hotels offer complimentary luggage storage on arrival/departure day',
    tips: [
      'Request early check-in or late check-out in advance',
      'Join hotel loyalty programs for potential benefits',
      'Check if your hotel offers airport shuttle service',
      'Confirm your reservation 24-48 hours before arrival',
    ],
  };

  // Transportation options
  const transportationOptions = [
    {
      name: 'METRO Rail',
      description: 'Light rail system connecting downtown, medical center, and NRG Park',
      icon: <TransportIcon color="primary" />,
      details: 'Fare: $1.25 per ride, Day Pass: $3.00',
      website: 'https://www.ridemetro.org/Pages/Rail.aspx',
    },
    {
      name: 'METRO Bus',
      description: 'Extensive bus network covering the Houston metropolitan area',
      icon: <TransportIcon color="primary" />,
      details: 'Fare: $1.25 per ride, Day Pass: $3.00',
      website: 'https://www.ridemetro.org/Pages/Bus.aspx',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title={t('guides.arrival.title')}
        subtitle={t('guides.arrival.dates')}
        breadcrumbs={[
          { label: t('navigation.home'), path: '/' },
          { label: t('guides.arrival.title') },
        ]}
      />

      {/* Airport Information */}
      <Section title={t('guides.arrival.airport')} titleIcon={<AirportIcon />} divider>
        <Grid container spacing={3}>
          {airports.map(airport => (
            <Grid item xs={12} md={6} key={airport.code}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {airport.icon}
                  <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                    {airport.name}
                  </Typography>
                </Box>
                <Typography paragraph>{airport.description}</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Transportation Options:
                </Typography>
                <List dense>
                  {airport.transportOptions.map((option, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <TransportIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  component={Link}
                  href={airport.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Visit Website
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Transportation Options */}
      <Section title={t('guides.arrival.transportation')} titleIcon={<TransportIcon />} divider>
        <Grid container spacing={3}>
          {transportationOptions.map((option, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {option.icon}
                  <Typography variant="h6" component="h3" sx={{ ml: 1 }}>
                    {option.name}
                  </Typography>
                </Box>
                <Typography paragraph>{option.description}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.details}
                </Typography>
                <Button
                  component={Link}
                  href={option.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Visit Website
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Hotel Information */}
      <Section title={t('guides.arrival.hotels')} titleIcon={<HotelIcon />} divider>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                <TimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Check-in/Check-out Times
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Check-in Time" secondary={hotelInfo.checkInTime} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Check-out Time" secondary={hotelInfo.checkOutTime} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Early Check-in" secondary={hotelInfo.earlyCheckIn} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Late Check-out" secondary={hotelInfo.lateCheckOut} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Luggage Storage" secondary={hotelInfo.luggageStorage} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Helpful Tips
              </Typography>
              <List dense>
                {hotelInfo.tips.map((tip, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <InfoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Section>
    </Container>
  );
};

export default ArrivalDeparturePage;
