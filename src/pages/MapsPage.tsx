import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Chip,
} from '@mui/material';
import {
  Map as MapIcon,
  Restaurant as RestaurantIcon,
  Attractions as AttractionsIcon,
  EmojiEvents as EventsIcon,
  ShoppingBag as ShoppingIcon,
  Hotel as HotelIcon,
  DirectionsCar as TransportIcon,
  Route as RouteIcon,
} from '@mui/icons-material';
import { PageHeader, Section } from '../components/common';
import { Location } from '../components/maps/types';
import ReactGoogleMap from '../components/maps/ReactGoogleMap';
import MobileNavigation from '../components/maps/MobileNavigation/MobileNavigation';
import { locations as allLocations } from '../data/locations';

// Define itinerary interface
interface Itinerary {
  id: string;
  name: string;
  description: string;
  day: string;
  stops: {
    locationId: string;
    order: number;
    duration: string;
    notes?: string;
  }[];
}

// Use locations from data file
const locations: Location[] = allLocations;

// Updated itinerary data
const itineraries: Itinerary[] = [
  {
    id: 'jour1',
    name: 'Arrival in Houston',
    description: 'Arrival in Houston and check-in at the hotel.',
    day: 'Tuesday, April 15, 2025',
    stops: [
      { locationId: '28', order: 1, duration: '1-2 hours', notes: 'Arrival at George Bush Intercontinental Airport (IAH) at 19:05 on Turkish Airlines TK658.' },
      {
        locationId: '22',
        order: 2,
        duration: '1-2 hours',
        notes: 'Check-in at Crowne Plaza Hotel and rest.',
      },
    ],
  },
  {
    id: 'jour2',
    name: 'FIRST Championship',
    description: 'Participation in the FIRST Championship at George R. Brown Convention Center.',
    day: 'Wednesday-Saturday, April 16-19, 2025',
    stops: [
      {
        locationId: '22',
        order: 1,
        duration: '1 hour',
        notes: 'Departure from Crowne Plaza Hotel.',
      },
      {
        locationId: '25',
        order: 2,
        duration: 'All day',
        notes: 'Main events of the FIRST Championship including competitions, STEM conferences, and social events.',
      },
      {
        locationId: '26',
        order: 3,
        duration: 'Varies',
        notes: 'Additional activities at Discovery Green.',
      },
      {
        locationId: '27',
        order: 4,
        duration: 'Varies',
        notes: 'Special events at Minute Maid Park.',
      },
    ],
  },
  {
    id: 'jour3',
    name: 'Space Center & Kemah',
    description: 'Exploration of the Space Center Houston and Kemah Boardwalk.',
    day: 'Sunday, April 20, 2025',
    stops: [
      { locationId: '22', order: 1, duration: '1 hour', notes: 'Departure from Crowne Plaza Hotel.' },
      { locationId: '1', order: 2, duration: '3-4 hours', notes: 'Morning: Visit to Space Center Houston.' },
      {
        locationId: '9',
        order: 3,
        duration: '2-3 hours',
        notes: 'Afternoon: Explore Kemah Boardwalk with attractions and dining.',
      },
    ],
  },
  {
    id: 'jour4',
    name: 'Shopping Day',
    description: 'Shopping at Katy Mills Mall.',
    day: 'Monday, April 21, 2025',
    stops: [
      { locationId: '22', order: 1, duration: '1 hour', notes: 'Departure from Crowne Plaza Hotel.' },
      { locationId: '17', order: 2, duration: '4-6 hours', notes: 'Shopping at Katy Mills Mall with over 175 stores offering discounted prices.' },
    ],
  },
  {
    id: 'jour5',
    name: 'Museum District',
    description: 'Visit Houston Museum of Natural Science and The Health Museum.',
    day: 'Tuesday, April 22, 2025',
    stops: [
      { locationId: '22', order: 1, duration: '1 hour', notes: 'Departure from Crowne Plaza Hotel.' },
      { locationId: '2', order: 2, duration: '3-4 hours', notes: 'Visit to Houston Museum of Natural Science with exhibits on dinosaurs, space, and more.' },
      { locationId: '6', order: 3, duration: '2-3 hours', notes: 'Visit to The Health Museum (Children\'s Museum Houston).' },
    ],
  },
  {
    id: 'jour6',
    name: 'Hermann Park & Departure',
    description: 'Exploration of Hermann Park, Houston Zoo, and departure.',
    day: 'Wednesday, April 23, 2025',
    stops: [
      { locationId: '22', order: 1, duration: '1 hour', notes: 'Departure from Crowne Plaza Hotel.' },
      { locationId: '7', order: 2, duration: '1-2 hours', notes: 'Morning: Visit Hermann Park.' },
      { locationId: '3', order: 3, duration: '2-3 hours', notes: 'Morning: Explore Houston Zoo.' },
      { locationId: '8', order: 4, duration: '1-2 hours', notes: 'Afternoon: Visit Japanese Garden and McGovern Gardens.' },
      { locationId: '28', order: 5, duration: '2-3 hours', notes: 'Evening: Departure from Houston at 21:00 on Turkish Airlines TK34.' },
    ],
  },
];

// Helper function to get location by ID
const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

const MapsPage: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useDeviceDetect();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedItinerary, setSelectedItinerary] = useState<string>('jour1');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleItineraryChange = (itineraryId: string) => {
    setSelectedItinerary(itineraryId);
  };

  // Get the selected itinerary
  const currentItinerary = itineraries.find(itinerary => itinerary.id === selectedItinerary);

  // Get locations for the selected itinerary
  const itineraryLocations = currentItinerary
    ? currentItinerary.stops.map(stop => getLocationById(stop.locationId)).filter(Boolean)
    : [];

  console.log('Selected Itinerary:', currentItinerary);
  console.log('Itinerary Locations:', itineraryLocations);

  return (
    <Container maxWidth="lg" sx={{ pb: isMobile ? 8 : 0 }}>
      <PageHeader
        title={t('maps.title', 'Maps')}
        subtitle={t('maps.subtitle', 'Interactive maps of Houston with points of interest for the FIRST Championship 2025.')}
        data-testid="page-title"
      />

      {!isMobile && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="map tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<MapIcon />} label={t('maps.tabs.allLocations', 'All Locations')} id="tab-0" aria-controls="tabpanel-0" />
            <Tab
              icon={<AttractionsIcon />}
              label={t('maps.tabs.attractions', 'Attractions')}
              id="tab-1"
              aria-controls="tabpanel-1"
            />
            <Tab
              icon={<RestaurantIcon />}
              label={t('maps.tabs.restaurants', 'Restaurants')}
              id="tab-2"
              aria-controls="tabpanel-2"
            />
            <Tab icon={<ShoppingIcon />} label={t('maps.tabs.shopping', 'Shopping')} id="tab-3" aria-controls="tabpanel-3" />
            <Tab icon={<HotelIcon />} label={t('maps.tabs.hotels', 'Hotels')} id="tab-4" aria-controls="tabpanel-4" />
            <Tab
              icon={<TransportIcon />}
              label={t('maps.tabs.transportation', 'Transportation')}
              id="tab-5"
              aria-controls="tabpanel-5"
            />
            <Tab
              icon={<EventsIcon />}
              label={t('maps.tabs.firstChampionship', 'FIRST Championship')}
              id="tab-6"
              aria-controls="tabpanel-6"
            />
            <Tab icon={<RouteIcon />} label={t('maps.tabs.itineraries', 'Itineraries')} id="tab-7" aria-controls="tabpanel-7" />
          </Tabs>
        </Box>
      )}

      {/* Mobile bottom navigation */}
      {isMobile && <MobileNavigation activeTab={activeTab} onChange={handleTabChange} />}

      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Section title={t('maps.sections.allLocations', 'All Locations')} titleIcon={<MapIcon color="primary" />} divider>
            <ReactGoogleMap
              locations={locations}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={11}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
        {activeTab === 1 && (
          <Section title={t('maps.sections.attractions', 'Attractions')} titleIcon={<AttractionsIcon color="primary" />} divider>
            <ReactGoogleMap
              locations={locations.filter(
                loc => loc.category === 'attraction' || loc.category === 'museum'
              )}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={12}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2" aria-labelledby="tab-2">
        {activeTab === 2 && (
          <Section title={t('maps.sections.restaurants', 'Restaurants')} titleIcon={<RestaurantIcon color="primary" />} divider>
            <ReactGoogleMap
              locations={locations.filter(loc => loc.category === 'restaurant')}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={13}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 3} id="tabpanel-3" aria-labelledby="tab-3">
        {activeTab === 3 && (
          <Section title={t('maps.sections.shopping', 'Shopping')} titleIcon={<ShoppingIcon color="primary" />} divider>
            <ReactGoogleMap
              locations={locations.filter(
                loc => loc.category === 'shopping' || loc.category === 'grocery'
              )}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={12}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 4} id="tabpanel-4" aria-labelledby="tab-4">
        {activeTab === 4 && (
          <Section title={t('maps.sections.hotels', 'Hotels')} titleIcon={<HotelIcon color="primary" />} divider>
            <ReactGoogleMap
              locations={locations.filter(loc => loc.category === 'hotel')}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={12}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 5} id="tabpanel-5" aria-labelledby="tab-5">
        {activeTab === 5 && (
          <Section title={t('maps.sections.transportation', 'Transportation')} titleIcon={<TransportIcon color="primary" />} divider>
            <ReactGoogleMap
              locations={locations.filter(loc => loc.category === 'transport')}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={10}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 6} id="tabpanel-6" aria-labelledby="tab-6">
        {activeTab === 6 && (
          <Section
            title={t('maps.sections.firstChampionshipVenues', 'FIRST Championship Venues')}
            titleIcon={<EventsIcon color="primary" />}
            divider
          >
            <ReactGoogleMap
              locations={locations.filter(loc => loc.category === 'venue')}
              height={600}
              mapId="af8bf941f1e27c9d"
              zoom={14}
              enableClustering={true}
              useCustomIcons={true}
            />
          </Section>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 7} id="tabpanel-7" aria-labelledby="tab-7">
        {activeTab === 7 && (
          <Section title={t('maps.sections.travelItinerary', 'Travel Itinerary: April 14-24, 2025')} titleIcon={<RouteIcon color="primary" />} divider>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('maps.itinerary.title', 'Complete Travel Plan: April 14-24, 2025')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('maps.itinerary.description', "This itinerary covers the entire trip from departure in Tunis to return, including the FIRST Championship and exploration of Houston's attractions.")}
              </Typography>
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  {t('maps.itinerary.overview', 'Overview:')}
                </Typography>
                <Typography variant="body2" component="div">
                  <ul>
                    <li><strong>April 14:</strong> Departure from Tunis at 23:35 on Turkish Airlines TK658</li>
                    <li><strong>April 15:</strong> Arrival at George Bush Intercontinental Airport (IAH) at 19:05, transfer to Crowne Plaza Hotel</li>
                    <li><strong>April 16-19:</strong> FIRST Championship at George R. Brown Convention Center</li>
                    <li><strong>April 20:</strong> Space Center Houston and Kemah Boardwalk</li>
                    <li><strong>April 21:</strong> Shopping at Katy Mills Mall</li>
                    <li><strong>April 22:</strong> Museum visits</li>
                    <li><strong>April 23:</strong> Hermann Park, Zoo, and departure from George Bush Intercontinental Airport at 21:00 on Turkish Airlines TK34</li>
                    <li><strong>April 24:</strong> Arrival in Tunis at 22:40</li>
                  </ul>
                </Typography>
              </Box>
              <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: isMobile ? 2 : 3 }}>
                {itineraries.map(itinerary => (
                  <Grid item xs={12} sm={6} md={3} key={itinerary.id}>
                    <Paper
                      sx={{
                        p: isMobile ? 1.5 : 2,
                        cursor: 'pointer',
                        border: selectedItinerary === itinerary.id ? 2 : 0,
                        borderColor: 'primary.main',
                        '&:hover': { boxShadow: 3 },
                      }}
                      onClick={() => handleItineraryChange(itinerary.id)}
                    >
                      <Typography variant="h6" gutterBottom>
                        {itinerary.day}
                      </Typography>
                      <Typography variant="subtitle1">{itinerary.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {itinerary.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {currentItinerary && (
                <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    {currentItinerary.name} - {currentItinerary.day}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {currentItinerary.description}
                  </Typography>

                  <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                    {t('maps.itinerary.detailedItinerary', 'Detailed Itinerary:')}
                  </Typography>

                  <List sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
                    {currentItinerary.stops.map(stop => {
                      const location = getLocationById(stop.locationId);
                      return location ? (
                        <ListItem key={stop.locationId} sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1.5 }}>
                          <ListItemIcon>
                            <Chip label={stop.order} color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2" fontWeight="bold">
                                {location.name}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" component="span" display="block" sx={{ mt: 0.5 }}>
                                  <strong>Duration:</strong> {stop.duration}
                                </Typography>
                                {stop.notes && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    component="span"
                                    display="block"
                                  >
                                    <strong>Note:</strong> {stop.notes}
                                  </Typography>
                                )}
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.8rem' }}>
                                  {location.address}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ) : null;
                    })}
                  </List>
                </Box>
              )}
            </Box>

            <ReactGoogleMap
              locations={itineraryLocations.filter((loc): loc is Location => loc !== undefined)}
              height={isMobile ? 450 : 600}
              mapId="af8bf941f1e27c9d"
              zoom={11}
              enableClustering={true}
              useCustomIcons={true}
              showRoutes={true}
              routeColor="#FF5722"
            />
          </Section>
        )}
      </Box>
    </Container>
  );
};

export default MapsPage;
