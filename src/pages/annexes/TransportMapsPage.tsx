import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
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
  DirectionsTransit as TransitIcon,
  DirectionsCar as CarIcon,
  LocalTaxi as TaxiIcon,
  DirectionsBus as BusIcon,
  Train as TrainIcon,
  Map as MapIcon,
  LocalAirport as AirportIcon,
  Directions as DirectionsIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { PageHeader, Section } from '../../components/common';
import { Location } from '../../components/maps/types';
import ReactGoogleMap from '../../components/maps/ReactGoogleMap';

// Define the transport locations
const transportLocations: Location[] = [
  {
    id: '1',
    name: 'George Bush Intercontinental Airport (IAH)',
    position: { lat: 29.9902, lng: -95.3368 },
    category: 'airport',
    description:
      "Houston's largest international airport, located about 23 miles north of downtown.",
    address: '2800 N Terminal Rd, Houston, TX 77032',
    image: 'assets/images/transport/iah-airport.jpg',
  },
  {
    id: '2',
    name: 'William P. Hobby Airport (HOU)',
    position: { lat: 29.6454, lng: -95.2789 },
    category: 'airport',
    description:
      "Houston's second airport, primarily serving domestic flights, located about 7 miles south of downtown.",
    address: '7800 Airport Blvd, Houston, TX 77061',
    image: '/assets/images/transport/hobby-airport.jpg',
  },
  {
    id: '3',
    name: 'METRORail Red Line',
    position: { lat: 29.752, lng: -95.36 },
    category: 'rail',
    description: 'Light rail line connecting downtown to the Museum District and Medical Center.',
    address: 'Downtown Transit Center, Houston, TX 77002',
    image: '/assets/images/transport/metrorail.jpg',
  },
  {
    id: '4',
    name: 'Downtown Transit Center',
    position: { lat: 29.752, lng: -95.36 },
    category: 'bus',
    description: 'Major bus hub in downtown Houston with connections to multiple routes.',
    address: '1900 Main St, Houston, TX 77002',
    image: '/assets/images/transport/downtown-transit.jpg',
  },
  {
    id: '5',
    name: 'Texas Medical Center Transit Center',
    position: { lat: 29.7062, lng: -95.4012 },
    category: 'bus',
    description: 'Transit center serving the Texas Medical Center area.',
    address: '6910 Fannin St, Houston, TX 77030',
    image: '/assets/images/transport/medical-center-transit.jpg',
  },
  {
    id: '6',
    name: 'Crowne Plaza Houston Med-Ctr Galleria Area',
    position: { lat: 29.6908, lng: -95.415 },
    category: 'hotel',
    description: 'The official hotel for the 2025 FIRST Championship.',
    address: '8686 Kirby Dr, Houston, TX 77054',
    image: '/assets/images/intro/crowne-plaza.jpg',
  },
  {
    id: '7',
    name: 'George R. Brown Convention Center',
    position: { lat: 29.752, lng: -95.3562 },
    category: 'venue',
    description: 'Main venue for the FIRST Championship.',
    address: '1001 Avenida de las Americas, Houston, TX 77010',
    image: '/assets/images/events/first-championship.jpg',
  },
];

// Define public transportation options
const publicTransportOptions = [
  {
    name: 'METRORail',
    icon: <TrainIcon color="primary" />,
    description: "Houston's light rail system with three lines: Red, Green, and Purple.",
    website: 'https://www.ridemetro.org/Pages/Rail.aspx',
    fare: '$1.25 for a single ride, $3.00 for a day pass',
    hours:
      'Monday-Thursday: 4:30am-12:00am, Friday: 4:30am-2:15am, Saturday: 5:30am-2:15am, Sunday: 5:30am-11:40pm',
    tips: 'The Red Line connects downtown to the Museum District and Medical Center. Trains arrive every 6-20 minutes depending on time of day.',
  },
  {
    name: 'METRO Bus',
    icon: <BusIcon color="primary" />,
    description: 'Extensive bus network covering the Houston metropolitan area.',
    website: 'https://www.ridemetro.org/Pages/Bus.aspx',
    fare: '$1.25 for a single ride, $3.00 for a day pass',
    hours: 'Varies by route, most routes operate from 5:00am to 11:00pm',
    tips: 'Use the METRO Trip Planner or Google Maps to find the best route. Look for the route number on the front and side of the bus.',
  },
  {
    name: 'Park & Ride',
    icon: <CarIcon color="primary" />,
    description: 'Commuter service from suburban areas to downtown and major employment centers.',
    website: 'https://www.ridemetro.org/Pages/ParkRide.aspx',
    fare: '$2.00-$4.50 one-way depending on zone',
    hours: 'Primarily weekday service during peak hours',
    tips: "Great option if you're staying outside the city center. Parking is free at Park & Ride lots.",
  },
];

const TransportMapsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Transportation & Maps"
        subtitle="Getting around Houston during your visit"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Annexes', path: '#' },
          { label: 'Transportation & Maps' },
        ]}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="transport tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<MapIcon />} label="Transport Map" id="tab-0" aria-controls="tabpanel-0" />
          <Tab
            icon={<TransitIcon />}
            label="Public Transportation"
            id="tab-1"
            aria-controls="tabpanel-1"
          />
          <Tab
            icon={<TaxiIcon />}
            label="Rideshare & Taxis"
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          <Tab
            icon={<AirportIcon />}
            label="Airport Transportation"
            id="tab-3"
            aria-controls="tabpanel-3"
          />
          <Tab
            icon={<DirectionsIcon />}
            label="Getting to FIRST Championship"
            id="tab-4"
            aria-controls="tabpanel-4"
          />
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Section
            title="Houston Transportation Map"
            titleIcon={<MapIcon color="primary" />}
            divider
          >
            <Typography variant="body1" paragraph>
              This map shows key transportation hubs, airports, and important locations in Houston.
              Use it to plan your travel around the city.
            </Typography>
            <ReactGoogleMap
              locations={transportLocations}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={11}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      {/* Public Transportation Tab */}
      <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
        {activeTab === 1 && (
          <Section
            title="Public Transportation Options"
            titleIcon={<TransitIcon color="primary" />}
            divider
          >
            <Typography variant="body1" paragraph>
              Houston offers several public transportation options operated by METRO (Metropolitan
              Transit Authority of Harris County). These include light rail, buses, and park & ride
              services.
            </Typography>

            <Typography variant="body1" paragraph>
              The METRO Q Fare Card or METRO Day Pass can be purchased at METRO RideStores, online,
              or at ticket vending machines at rail stations. For more information, visit the{' '}
              <Link href="https://www.ridemetro.org" target="_blank" rel="noopener noreferrer">
                METRO website
              </Link>
              .
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {publicTransportOptions.map(option => (
                <Grid item xs={12} md={4} key={option.name}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ mr: 1 }}>{option.icon}</Box>
                      <Typography variant="h6">{option.name}</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {option.description}
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Fare" secondary={option.fare} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Hours" secondary={option.hours} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Tips" secondary={option.tips} />
                      </ListItem>
                    </List>
                    <Button
                      variant="outlined"
                      href={option.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mt: 2 }}
                    >
                      Visit Website
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </Box>
    </Container>
  );
};

export default TransportMapsPage;
