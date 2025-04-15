import { useState } from 'react';
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
import RouteInfo from '../components/maps/RouteInfo/RouteInfo';
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

// Sample itinerary data
const itineraries: Itinerary[] = [
  {
    id: 'day1',
    name: 'Space Exploration Day',
    description: "Explore NASA's Space Center Houston and the Kemah Boardwalk",
    day: 'Day 1',
    stops: [
      { locationId: '1', order: 1, duration: '4-5 hours', notes: 'Start early to avoid crowds' },
      {
        locationId: '9',
        order: 2,
        duration: '3-4 hours',
        notes: 'Great for evening entertainment',
      },
    ],
  },
  {
    id: 'day2',
    name: 'Museum District Day',
    description: "Visit Houston's world-class museums in the Museum District",
    day: 'Day 2',
    stops: [
      {
        locationId: '2',
        order: 1,
        duration: '2-3 hours',
        notes: "Don't miss the dinosaur exhibit",
      },
      { locationId: '4', order: 2, duration: '2-3 hours', notes: 'Check for special exhibitions' },
      { locationId: '6', order: 3, duration: '2 hours', notes: 'Great for families with children' },
    ],
  },
  {
    id: 'day3',
    name: 'Hermann Park & Zoo Day',
    description: 'Enjoy Hermann Park and the Houston Zoo',
    day: 'Day 3',
    stops: [
      {
        locationId: '3',
        order: 1,
        duration: '3-4 hours',
        notes: 'Visit in the morning when animals are active',
      },
      { locationId: '7', order: 2, duration: '1-2 hours', notes: 'Relax in the Japanese Garden' },
      {
        locationId: '8',
        order: 3,
        duration: '2-3 hours',
        notes: 'Check schedule for evening performances',
      },
    ],
  },
  {
    id: 'day4',
    name: 'Downtown & FIRST Championship Day',
    description: 'Explore downtown Houston and attend the FIRST Championship',
    day: 'Day 4',
    stops: [
      {
        locationId: '25',
        order: 1,
        duration: '4-6 hours',
        notes: 'Main FIRST Championship events',
      },
      { locationId: '26', order: 2, duration: '1-2 hours', notes: 'Take a break at the park' },
      { locationId: '5', order: 3, duration: '2-3 hours', notes: 'Fun for the whole family' },
    ],
  },
];

// List of all categories used in the locations data
// This can be useful for filtering or displaying category information
// Exported so it can be used in other files if needed
export enum CATEGORIES {
  ATTRACTION = 'attraction',
  MUSEUM = 'museum',
  RESTAURANT = 'restaurant',
  VENUE = 'venue',
  SHOPPING = 'shopping',
  GROCERY = 'grocery',
  HOTEL = 'hotel',
  TRANSPORT = 'transport',
  MEDICAL = 'medical',
  PARK = 'park',
}

// This function is not currently used but kept for future reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategoryName = (category: string): string => {
  // Convert the category string to a key of the CATEGORIES enum
  const categoryKey = Object.keys(CATEGORIES).find(
    key => CATEGORIES[key as keyof typeof CATEGORIES] === category
  );
  return categoryKey || category;
};

// Helper function to get location by ID
const getLocationById = (id: string): Location | undefined => {
  return locations.find(location => location.id === id);
};

// Helper function to render itinerary map
const renderItineraryMap = (itinerary: Itinerary): Location[] => {
  // Get locations for each stop in the itinerary
  return itinerary.stops
    .map(stop => {
      const location = getLocationById(stop.locationId);
      return location ? location : undefined;
    })
    .filter((location): location is Location => location !== undefined);
};

const MapsPage: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedItinerary, setSelectedItinerary] = useState<string>('day1');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleItineraryChange = (itineraryId: string) => {
    setSelectedItinerary(itineraryId);
  };

  // Get the selected itinerary
  const currentItinerary = itineraries.find(itinerary => itinerary.id === selectedItinerary);

  // Get locations for the selected itinerary
  const itineraryLocations = currentItinerary ? renderItineraryMap(currentItinerary) : [];

  return (
    <Container maxWidth="lg" sx={{ pb: isMobile ? 8 : 0 }}>
      <PageHeader
        title="Maps"
        subtitle="Interactive maps of Houston with points of interest for the FIRST Championship 2025."
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
            <Tab icon={<MapIcon />} label="All Locations" id="tab-0" aria-controls="tabpanel-0" />
            <Tab
              icon={<AttractionsIcon />}
              label="Attractions"
              id="tab-1"
              aria-controls="tabpanel-1"
            />
            <Tab
              icon={<RestaurantIcon />}
              label="Restaurants"
              id="tab-2"
              aria-controls="tabpanel-2"
            />
            <Tab icon={<ShoppingIcon />} label="Shopping" id="tab-3" aria-controls="tabpanel-3" />
            <Tab icon={<HotelIcon />} label="Hotels" id="tab-4" aria-controls="tabpanel-4" />
            <Tab
              icon={<TransportIcon />}
              label="Transportation"
              id="tab-5"
              aria-controls="tabpanel-5"
            />
            <Tab
              icon={<EventsIcon />}
              label="FIRST Championship"
              id="tab-6"
              aria-controls="tabpanel-6"
            />
            <Tab icon={<RouteIcon />} label="Itineraries" id="tab-7" aria-controls="tabpanel-7" />
          </Tabs>
        </Box>
      )}

      {/* Mobile bottom navigation */}
      {isMobile && <MobileNavigation activeTab={activeTab} onChange={handleTabChange} />}

      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Section title="All Locations" titleIcon={<MapIcon color="primary" />} divider>
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
          <Section title="Attractions" titleIcon={<AttractionsIcon color="primary" />} divider>
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
          <Section title="Restaurants" titleIcon={<RestaurantIcon color="primary" />} divider>
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
          <Section title="Shopping" titleIcon={<ShoppingIcon color="primary" />} divider>
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
          <Section title="Hotels" titleIcon={<HotelIcon color="primary" />} divider>
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
          <Section title="Transportation" titleIcon={<TransportIcon color="primary" />} divider>
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
            title="FIRST Championship Venues"
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
          <Section title="Suggested Itineraries" titleIcon={<RouteIcon color="primary" />} divider>
            <Box sx={{ mb: 3 }}>
              {currentItinerary && itineraryLocations.length > 1 && (
                <RouteInfo
                  locations={itineraryLocations}
                  apiKey="AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0"
                />
              )}
              <Typography variant="body1" paragraph>
                Explore Houston with these suggested itineraries. Each itinerary is designed to help
                you make the most of your time in Houston.
              </Typography>

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
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {currentItinerary.name} - {currentItinerary.day}
                  </Typography>

                  <List>
                    {currentItinerary.stops.map(stop => {
                      const location = getLocationById(stop.locationId);
                      return location ? (
                        <ListItem key={stop.locationId}>
                          <ListItemIcon>
                            <Chip label={stop.order} color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={location.name}
                            secondary={
                              <>
                                <Typography variant="body2" component="span" display="block">
                                  {stop.duration}
                                </Typography>
                                {stop.notes && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    component="span"
                                    display="block"
                                  >
                                    Note: {stop.notes}
                                  </Typography>
                                )}
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
              locations={itineraryLocations}
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
