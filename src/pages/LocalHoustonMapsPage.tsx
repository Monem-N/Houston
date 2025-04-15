import React, { useState } from 'react';
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
  Divider,
  Chip,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  ShoppingBag as ShoppingIcon,
  LocalGroceryStore as GroceryIcon,
  Hotel as HotelIcon,
  LocalPharmacy as PharmacyIcon,
  Map as MapIcon,
  Place as PlaceIcon,
  LocalCafe as CafeIcon,
  Fastfood as FastfoodIcon,
} from '@mui/icons-material';
import { PageHeader, Section } from '../components/common';
import ReactGoogleMap from '../components/maps/ReactGoogleMap';
import { Location } from '../components/maps/types';

// Define location data for the Crowne Plaza area
const crownePlazaLocations: Location[] = [
  // Restaurants
  {
    id: 'cp-1',
    name: '2712 Bistro and Bar / Seventysix11 Bistro & Lounge',
    position: { lat: 29.7328, lng: -95.4173 },
    category: 'restaurant',
    description: 'Located within the Crowne Plaza, offering American cuisine for breakfast, lunch, and dinner.',
    address: 'Crowne Plaza Houston Med-Ctr Galleria Area, 2712 Southwest Freeway, Houston, TX',
    image: '/assets/images/dining/hotel-restaurant.jpg',
  },
  {
    id: 'cp-2',
    name: 'Chick-fil-A',
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'fastfood',
    description: 'Popular fast food chain known for chicken sandwiches and friendly service.',
    address: '5015 Westheimer Rd Ste 1330, Houston, TX 77056',
    image: '/assets/images/dining/chick-fil-a.jpg',
  },
  {
    id: 'cp-3',
    name: 'Whataburger',
    position: { lat: 29.7328, lng: -95.4173 },
    category: 'fastfood',
    description: 'Texas-based burger chain offering a variety of burgers and breakfast items.',
    address: '3639 Westheimer Road, Houston, TX 77027',
    image: '/assets/images/dining/whataburger.jpg',
  },
  {
    id: 'cp-4',
    name: 'Warehouse 72',
    position: { lat: 29.7841, lng: -95.4583 },
    category: 'restaurant',
    description: 'Contemporary American cuisine with Mediterranean influence in an industrial setting.',
    address: '7620 Katy Fwy #100, Houston, TX 77024',
    image: '/assets/images/dining/warehouse72.jpg',
  },
  {
    id: 'cp-5',
    name: "Dave & Buster's",
    position: { lat: 29.7841, lng: -95.4583 },
    category: 'restaurant',
    description: 'American cuisine in a lively atmosphere with arcade games and entertainment.',
    address: '7620 Katy Fwy #100, Houston, TX 77024',
    image: '/assets/images/dining/dave-busters.jpg',
  },
  {
    id: 'cp-6',
    name: 'Steak 48',
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'restaurant',
    description: 'Upscale steakhouse known for excellent steaks and seafood in an intimate setting.',
    address: '4444 Westheimer Rd, Houston, TX 77027',
    image: '/assets/images/dining/steak48.jpg',
  },
  {
    id: 'cp-7',
    name: "Rumi's Kitchen",
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'restaurant',
    description: 'Exceptional Persian cuisine in a vibrant setting.',
    address: '1801 Post Oak Blvd Suite 120, Houston, TX 77056',
    image: '/assets/images/dining/rumis-kitchen.jpg',
  },
  {
    id: 'cp-8',
    name: "Mastro's Steakhouse",
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'restaurant',
    description: 'Sophisticated steakhouse with world-class service, acclaimed cuisine, and live entertainment.',
    address: '1650 West Loop South, Houston, TX 77027',
    image: '/assets/images/dining/mastros.jpg',
  },
  {
    id: 'cp-9',
    name: 'Lombardi Cucina Italiana',
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'restaurant',
    description: 'Authentic Italian cuisine with a modern twist, featuring handmade pasta.',
    address: '1101 Uptown Park Blvd Suite 18, Houston, TX 77056',
    image: '/assets/images/dining/lombardi.jpg',
  },

  // Grocery Stores
  {
    id: 'cp-10',
    name: 'Phoenicia Specialty Foods',
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'grocery',
    description: 'Specialty grocery store offering international foods and high-quality ingredients.',
    address: '4715 Westheimer, Houston, TX',
    image: '/assets/images/shopping/phoenicia.jpg',
  },
  {
    id: 'cp-11',
    name: 'H-E-B',
    position: { lat: 29.7841, lng: -95.4583 },
    category: 'grocery',
    description: 'Texas-based supermarket chain offering a complete selection of groceries and household essentials.',
    address: '9710 Katy Freeway, Houston, TX',
    image: '/assets/images/shopping/heb.jpg',
  },
  {
    id: 'cp-12',
    name: 'Whole Foods Market',
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'grocery',
    description: 'Specializing in organic and natural foods, prepared meals, juice bar, pizzeria, and café.',
    address: '1700 Post Oak Blvd, Houston, TX',
    image: '/assets/images/shopping/whole-foods.jpg',
  },
  {
    id: 'cp-13',
    name: 'Kroger',
    position: { lat: 29.7841, lng: -95.4583 },
    category: 'grocery',
    description: 'Large supermarket chain offering a wide variety of groceries and household products.',
    address: '2300 Gessner Rd, Houston, TX',
    image: '/assets/images/shopping/kroger.jpg',
  },

  // Convenience Stores & Pharmacies
  {
    id: 'cp-14',
    name: 'CVS Pharmacy',
    position: { lat: 29.7399, lng: -95.4647 },
    category: 'pharmacy',
    description: 'Pharmacy chain offering prescriptions, over-the-counter medications, health and beauty products, and convenience items.',
    address: '5402 Westheimer Rd Ste K, Houston, TX',
    image: '/assets/images/shopping/cvs.jpg',
  },
  {
    id: 'cp-15',
    name: 'Walgreens',
    position: { lat: 29.7841, lng: -95.4583 },
    category: 'pharmacy',
    description: 'Pharmacy offering health and wellness products, beauty items, and convenience goods.',
    address: '11038 Westheimer Rd, Houston, TX',
    image: '/assets/images/shopping/walgreens.jpg',
  },
  {
    id: 'cp-16',
    name: '7-Eleven',
    position: { lat: 29.7328, lng: -95.4173 },
    category: 'convenience',
    description: '24/7 convenience store offering snacks, beverages, and basic essentials.',
    address: '4085 Gulf Freeway, Houston, TX',
    image: '/assets/images/shopping/7-eleven.jpg',
  },
];

// Define location data for the Convention Center area
const conventionCenterLocations: Location[] = [
  // Restaurants
  {
    id: 'cc-1',
    name: 'Niko Nikos',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'restaurant',
    description: 'Popular Greek restaurant with a kiosk in Market Square Park, serving breakfast, lunch, and dinner.',
    address: 'Market Square Park, Houston, TX',
    image: '/assets/images/dining/niko-nikos.jpg',
  },
  {
    id: 'cc-2',
    name: 'Tenfold Coffee',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'cafe',
    description: 'Excellent coffee shop offering delicious pastries, located near Discovery Green Park.',
    address: '1550 Lamar St Suite 110, Houston, TX 77010',
    image: '/assets/images/dining/tenfold-coffee.jpg',
  },
  {
    id: 'cc-3',
    name: 'Starbucks',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'cafe',
    description: 'Located on level 2 of the George R. Brown Convention Center, offering a full range of Starbucks products.',
    address: 'George R. Brown Convention Center, Level 2, Houston, TX',
    image: '/assets/images/dining/starbucks.jpg',
  },
  {
    id: 'cc-4',
    name: 'Grotto Downtown',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'restaurant',
    description: 'Italian restaurant offering a chic dining experience with a rustic warehouse-style interior.',
    address: '1001 Avenida de las Americas, Suite A, Houston, TX',
    image: '/assets/images/dining/grotto.jpg',
  },
  {
    id: 'cc-5',
    name: 'The Rustic Houston Downtown',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'restaurant',
    description: 'American cuisine with a culinary twist, featuring fresh ingredients from Texas purveyors, live music, and an award-winning patio.',
    address: '1836 Polk St, Houston, TX',
    image: '/assets/images/dining/the-rustic.jpg',
  },
  {
    id: 'cc-6',
    name: 'Hearsay on the Green',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'restaurant',
    description: 'Serving distinctive American cuisine in an elegant antique setting near downtown Houston and Discovery Green Park.',
    address: '1515 Dallas Street, Houston, TX',
    image: '/assets/images/dining/hearsay.jpg',
  },
  {
    id: 'cc-7',
    name: 'Pappas Bros. Steakhouse - Downtown',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'restaurant',
    description: 'Elegant, award-winning steakhouse serving prime dry-aged beef, fresh seafood, and an exceptional wine list.',
    address: '1200 McKinney Street, Houston, TX',
    image: '/assets/images/dining/pappas-bros.jpg',
  },
  {
    id: 'cc-8',
    name: 'Brasserie du Parc',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'restaurant',
    description: 'Authentic French brasserie located on the ground floor of One Park Place, overlooking Discovery Green.',
    address: '1440 Lamar St, Houston, TX',
    image: '/assets/images/dining/brasserie-du-parc.jpg',
  },
  {
    id: 'cc-9',
    name: 'Kulture',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'restaurant',
    description: 'Innovative dining concept exploring the food and spirits of the African diaspora, located on the ground floor of the Partnership Tower.',
    address: '701 Avenida de las Americas, Ste. A, Houston, TX',
    image: '/assets/images/dining/kulture.jpg',
  },

  // Grocery Stores
  {
    id: 'cc-10',
    name: 'Phoenicia Specialty Foods Downtown',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'grocery',
    description: 'Large gourmet market offering a wide selection of international and local foods, fresh produce, meats, seafood, artisan breads, cheeses, wines, and prepared foods.',
    address: '1001 Austin Street, Houston, TX',
    image: '/assets/images/shopping/phoenicia-downtown.jpg',
  },

  // Convenience Stores & Pharmacies
  {
    id: 'cc-11',
    name: 'CVS Pharmacy',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'pharmacy',
    description: 'Pharmacy chain offering prescriptions, over-the-counter medications, health and beauty products, and convenience items.',
    address: '1003 Richmond Ave, Houston, TX 77006',
    image: '/assets/images/shopping/cvs.jpg',
  },
  {
    id: 'cc-12',
    name: 'Walgreens',
    position: { lat: 29.7604, lng: -95.3698 },
    category: 'pharmacy',
    description: 'Pharmacy offering health and wellness products, beauty items, and convenience goods.',
    address: '2612 Smith St, Houston, TX 77006',
    image: '/assets/images/shopping/walgreens.jpg',
  },
];

const LocalHoustonMapsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Get locations based on active tab
  const getLocations = () => {
    switch (activeTab) {
      case 0: // All Crowne Plaza Area
        return crownePlazaLocations;
      case 1: // Crowne Plaza Restaurants
        return crownePlazaLocations.filter(loc =>
          loc.category === 'restaurant' || loc.category === 'fastfood' || loc.category === 'cafe'
        );
      case 2: // Crowne Plaza Grocery & Convenience
        return crownePlazaLocations.filter(loc =>
          loc.category === 'grocery' || loc.category === 'convenience' || loc.category === 'pharmacy'
        );
      case 3: // All Convention Center Area
        return conventionCenterLocations;
      case 4: // Convention Center Restaurants
        return conventionCenterLocations.filter(loc =>
          loc.category === 'restaurant' || loc.category === 'fastfood' || loc.category === 'cafe'
        );
      case 5: // Convention Center Grocery & Convenience
        return conventionCenterLocations.filter(loc =>
          loc.category === 'grocery' || loc.category === 'convenience' || loc.category === 'pharmacy'
        );
      default:
        return crownePlazaLocations;
    }
  };

  // Get tab title
  const getTabTitle = () => {
    switch (activeTab) {
      case 0:
        return 'Crowne Plaza Area - All Locations';
      case 1:
        return 'Crowne Plaza Area - Restaurants & Cafés';
      case 2:
        return 'Crowne Plaza Area - Grocery & Convenience';
      case 3:
        return 'Convention Center Area - All Locations';
      case 4:
        return 'Convention Center Area - Restaurants & Cafés';
      case 5:
        return 'Convention Center Area - Grocery & Convenience';
      default:
        return 'All Locations';
    }
  };

  // Get tab icon
  const getTabIcon = () => {
    switch (activeTab) {
      case 0:
        return <MapIcon color="primary" />;
      case 1:
        return <RestaurantIcon color="primary" />;
      case 2:
        return <GroceryIcon color="primary" />;
      case 3:
        return <MapIcon color="primary" />;
      case 4:
        return <RestaurantIcon color="primary" />;
      case 5:
        return <GroceryIcon color="primary" />;
      default:
        return <MapIcon color="primary" />;
    }
  };

  // Get map center based on active tab
  const getMapCenter = () => {
    switch (activeTab) {
      case 0:
      case 1:
      case 2:
        return { lat: 29.7328, lng: -95.4173 }; // Crowne Plaza area
      case 3:
      case 4:
      case 5:
        return { lat: 29.7604, lng: -95.3698 }; // Convention Center area
      default:
        return { lat: 29.7328, lng: -95.4173 };
    }
  };

  // Get map zoom based on active tab
  const getMapZoom = () => {
    switch (activeTab) {
      case 0:
      case 3:
        return 13; // Wider view for "All Locations"
      default:
        return 14; // Closer view for specific categories
    }
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Local Houston Dining & Shopping"
        subtitle="Find restaurants, cafés, grocery stores, and convenience stores near your hotel and the convention center"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Annexes', path: '#' },
          { label: 'Local Houston Dining & Shopping' },
        ]}
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          This guide will help you find the best places to eat, drink, and shop around the Crowne Plaza Houston Med-Ctr Galleria Area and the George R. Brown Convention Center. Use the tabs below to explore different categories and areas.
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="local houston tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<HotelIcon />}
            label="Crowne Plaza Area"
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab
            icon={<RestaurantIcon />}
            label="CP Restaurants"
            id="tab-1"
            aria-controls="tabpanel-1"
          />
          <Tab
            icon={<GroceryIcon />}
            label="CP Grocery"
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          <Tab
            icon={<PlaceIcon />}
            label="Convention Center"
            id="tab-3"
            aria-controls="tabpanel-3"
          />
          <Tab
            icon={<RestaurantIcon />}
            label="CC Restaurants"
            id="tab-4"
            aria-controls="tabpanel-4"
          />
          <Tab
            icon={<GroceryIcon />}
            label="CC Grocery"
            id="tab-5"
            aria-controls="tabpanel-5"
          />
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={false} id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        <Section title={getTabTitle()} titleIcon={getTabIcon()} divider>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ReactGoogleMap
                locations={getLocations()}
                height={600}
                mapId="af8bf941f1e27c9d"
                center={getMapCenter()}
                zoom={getMapZoom()}
                enableClustering={true}
                useCustomIcons={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, height: '600px', overflow: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  {getTabTitle()} - Legend
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip icon={<RestaurantIcon />} label="Restaurant" color="primary" variant="outlined" />
                  <Chip icon={<FastfoodIcon />} label="Fast Food" color="secondary" variant="outlined" />
                  <Chip icon={<CafeIcon />} label="Café" color="success" variant="outlined" />
                  <Chip icon={<GroceryIcon />} label="Grocery" color="info" variant="outlined" />
                  <Chip icon={<PharmacyIcon />} label="Pharmacy" color="warning" variant="outlined" />
                </Box>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  {getLocations().map((location) => (
                    <React.Fragment key={location.id}>
                      <ListItem>
                        <ListItemIcon>
                          {location.category === 'restaurant' && <RestaurantIcon color="primary" />}
                          {location.category === 'fastfood' && <FastfoodIcon color="secondary" />}
                          {location.category === 'cafe' && <CafeIcon color="success" />}
                          {location.category === 'grocery' && <GroceryIcon color="info" />}
                          {location.category === 'pharmacy' && <PharmacyIcon color="warning" />}
                          {location.category === 'convenience' && <ShoppingIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={location.name}
                          secondary={
                            <>
                              <Typography variant="body2" component="span" color="text.secondary">
                                {location.address}
                              </Typography>
                              <br />
                              <Typography variant="body2" component="span" color="text.secondary">
                                {location.description}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Section>
      </Box>
    </Container>
  );
};

export default LocalHoustonMapsPage;
