import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  Chip,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import {
  ShoppingBag as ShoppingIcon,
  LocalMall as MallIcon,
  CompareArrows as CompareIcon,
  Store as StoreIcon,
  Directions as DirectionsIcon,
  AccessTime as TimeIcon,
  AttachMoney as PriceIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { PageHeader, Section, Card } from '../components/common';

// Define interfaces for our data
interface ShoppingVenue {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  hours: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  category: string;
  distance: string;
  website?: string;
  directions?: string;
}

interface ShoppingComparison {
  category: string;
  items: {
    name: string;
    katyMills: string | number;
    galleria: string | number;
    targetWalmart: string | number;
    notes?: string;
  }[];
}

// Sample data for shopping venues
const shoppingVenues: ShoppingVenue[] = [
  {
    id: '1',
    name: 'Katy Mills Mall',
    description:
      'A large outlet mall with over 175 stores, including designer brands at discounted prices.',
    image: '/assets/images/shopping/katy-mills.jpg',
    address: '5000 Katy Mills Cir, Katy, TX 77494',
    hours: 'Mon-Sat: 10AM-9PM, Sun: 11AM-7PM',
    priceRange: '$$',
    rating: 4.2,
    reviewCount: 1245,
    category: 'mall',
    distance: '25 miles from downtown Houston',
    website: 'https://www.simon.com/mall/katy-mills',
    directions: 'https://goo.gl/maps/1JKqpZ9Z9Z9Z9Z9Z9',
  },
  {
    id: '2',
    name: 'The Galleria',
    description:
      "Houston's premier shopping destination with over 400 stores, including high-end luxury brands.",
    image: '/assets/images/shopping/galleria.jpg',
    address: '5085 Westheimer Rd, Houston, TX 77056',
    hours: 'Mon-Sat: 10AM-9PM, Sun: 11AM-7PM',
    priceRange: '$$$',
    rating: 4.5,
    reviewCount: 2345,
    category: 'mall',
    distance: '8 miles from downtown Houston',
    website: 'https://www.simon.com/mall/the-galleria',
    directions: 'https://goo.gl/maps/2JKqpZ9Z9Z9Z9Z9Z9',
  },
  {
    id: '3',
    name: 'Target',
    description:
      'General merchandise retailer offering a wide variety of products including clothing, electronics, and groceries.',
    image: '/assets/images/shopping/target.jpg',
    address: '8500 S Main St, Houston, TX 77025',
    hours: 'Mon-Sun: 8AM-10PM',
    priceRange: '$',
    rating: 4.0,
    reviewCount: 987,
    category: 'store',
    distance: '5 miles from downtown Houston',
    website: 'https://www.target.com',
    directions: 'https://goo.gl/maps/3JKqpZ9Z9Z9Z9Z9Z9',
  },
  {
    id: '4',
    name: 'Walmart Supercenter',
    description:
      'Large retail store offering a wide range of products at affordable prices, including groceries.',
    image: '/assets/images/shopping/walmart.jpg',
    address: '3450 FM 1960 Rd W, Houston, TX 77068',
    hours: 'Open 24 hours',
    priceRange: '$',
    rating: 3.8,
    reviewCount: 1123,
    category: 'store',
    distance: '15 miles from downtown Houston',
    website: 'https://www.walmart.com',
    directions: 'https://goo.gl/maps/4JKqpZ9Z9Z9Z9Z9Z9',
  },
  {
    id: '5',
    name: 'Houston Premium Outlets',
    description: 'Outdoor outlet mall featuring discounted designer and name-brand stores.',
    image: '/assets/images/shopping/premium-outlets.jpg',
    address: '29300 Hempstead Rd, Cypress, TX 77433',
    hours: 'Mon-Sat: 10AM-9PM, Sun: 11AM-7PM',
    priceRange: '$$',
    rating: 4.3,
    reviewCount: 1056,
    category: 'mall',
    distance: '30 miles from downtown Houston',
    website: 'https://www.premiumoutlets.com/outlet/houston',
    directions: 'https://goo.gl/maps/5JKqpZ9Z9Z9Z9Z9Z9',
  },
  {
    id: '6',
    name: 'Rice Village',
    description: 'Charming shopping district with a mix of national retailers and local boutiques.',
    image: '/assets/images/shopping/rice-village.jpg',
    address: '2500 Rice Blvd, Houston, TX 77005',
    hours: 'Varies by store',
    priceRange: '$$$',
    rating: 4.4,
    reviewCount: 876,
    category: 'district',
    distance: '3 miles from downtown Houston',
    website: 'https://www.ricevillagedistrict.com',
    directions: 'https://goo.gl/maps/6JKqpZ9Z9Z9Z9Z9Z9',
  },
];

// Sample data for shopping comparison
const shoppingComparisons: ShoppingComparison[] = [
  {
    category: 'Clothing',
    items: [
      {
        name: 'T-Shirt (Basic)',
        katyMills: '$15-25',
        galleria: '$20-40',
        targetWalmart: '$8-15',
        notes: 'Better deals at outlet stores in Katy Mills',
      },
      {
        name: 'Jeans',
        katyMills: '$30-60',
        galleria: '$50-150',
        targetWalmart: '$20-40',
        notes: 'Designer brands available at Galleria',
      },
      {
        name: 'Athletic Shoes',
        katyMills: '$40-80',
        galleria: '$60-150',
        targetWalmart: '$25-60',
        notes: 'Nike Outlet at Katy Mills has good deals',
      },
    ],
  },
  {
    category: 'Electronics',
    items: [
      {
        name: 'Phone Charger',
        katyMills: '$15-25',
        galleria: '$20-30',
        targetWalmart: '$10-20',
        notes: 'Best prices at Target/Walmart',
      },
      {
        name: 'Headphones',
        katyMills: '$20-100',
        galleria: '$30-300',
        targetWalmart: '$15-80',
        notes: 'High-end brands at Galleria',
      },
      {
        name: 'Portable Battery',
        katyMills: '$20-40',
        galleria: '$25-50',
        targetWalmart: '$15-35',
        notes: 'Similar prices across locations',
      },
    ],
  },
  {
    category: 'Souvenirs',
    items: [
      {
        name: 'Houston T-Shirt',
        katyMills: '$15-25',
        galleria: '$20-35',
        targetWalmart: '$10-20',
        notes: 'More variety at Galleria',
      },
      {
        name: 'Texas Magnets',
        katyMills: '$5-10',
        galleria: '$8-15',
        targetWalmart: '$3-8',
        notes: 'Cheapest at Target/Walmart',
      },
      {
        name: 'Local Crafts',
        katyMills: 'Limited',
        galleria: 'Good selection',
        targetWalmart: 'Very limited',
        notes: 'Best at local markets (not listed)',
      },
    ],
  },
];

const ShoppingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Filter venues by category
  const getMalls = () => shoppingVenues.filter(venue => venue.category === 'mall');
  const getStores = () =>
    shoppingVenues.filter(venue => venue.category === 'store' || venue.category === 'district');

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Shopping"
        subtitle="Explore shopping options in Houston, from outlet malls to local stores."
        data-testid="page-title"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Shopping' }]}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="shopping tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<ShoppingIcon />} label="All Shopping" id="tab-0" aria-controls="tabpanel-0" />
          <Tab icon={<MallIcon />} label="Malls & Outlets" id="tab-1" aria-controls="tabpanel-1" />
          <Tab
            icon={<StoreIcon />}
            label="Stores & Districts"
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          <Tab
            icon={<CompareIcon />}
            label="Price Comparison"
            id="tab-3" aria-controls="tabpanel-3"
          />
        </Tabs>
      </Box>

      {/* All Shopping Tab */}
      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Section title="Shopping Options" titleIcon={<ShoppingIcon color="primary" />} divider>
            <Typography variant="body1" paragraph>
              Houston offers a variety of shopping experiences, from large outlet malls to upscale
              shopping centers and local stores. Here are some recommended shopping destinations for
              visitors during the FIRST Championship.
            </Typography>

            <Grid container spacing={3}>
              {shoppingVenues.map(venue => (
                <Grid item xs={12} sm={6} md={4} key={venue.id}>
                  <Card
                    title={venue.name}
                    description={venue.description}
                    image={venue.image}
                    imageAlt={venue.name}
                    imageHeight={180}
                    action={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {venue.website && (
                          <Button
                            variant="outlined"
                            color="primary"
                            href={venue.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Website
                          </Button>
                        )}
                        {venue.directions && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            href={venue.directions}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            startIcon={<DirectionsIcon />}
                          >
                            Directions
                          </Button>
                        )}
                      </Box>
                    }
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
                          label={
                            venue.category === 'mall'
                              ? 'Mall'
                              : venue.category === 'district'
                                ? 'District'
                                : 'Store'
                          }
                          size="small"
                          color={
                            venue.category === 'mall'
                              ? 'primary'
                              : venue.category === 'district'
                                ? 'secondary'
                                : 'default'
                          }
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={venue.rating} readOnly size="small" precision={0.1} />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({venue.reviewCount})
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.hours}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PriceIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.priceRange}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <DirectionsIcon fontSize="small" color="action" sx={{ mr: 1, mt: 0.3 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.address}
                          <br />
                          {venue.distance}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </Box>

      {/* Malls & Outlets Tab */}
      <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
        {activeTab === 1 && (
          <Section title="Malls & Outlets" titleIcon={<MallIcon color="primary" />} divider>
            <Typography variant="body1" paragraph>
              Houston is home to several large shopping malls and outlet centers. These destinations
              offer a wide variety of stores, from high-end luxury brands to discounted outlet
              shops.
            </Typography>

            <Grid container spacing={3}>
              {getMalls().map(venue => (
                <Grid item xs={12} sm={6} key={venue.id}>
                  <Card
                    title={venue.name}
                    description={venue.description}
                    image={venue.image}
                    imageAlt={venue.name}
                    imageHeight={200}
                    action={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {venue.website && (
                          <Button
                            variant="outlined"
                            color="primary"
                            href={venue.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Website
                          </Button>
                        )}
                        {venue.directions && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            href={venue.directions}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            startIcon={<DirectionsIcon />}
                          >
                            Directions
                          </Button>
                        )}
                      </Box>
                    }
                  >
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={venue.rating} readOnly size="small" precision={0.1} />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({venue.reviewCount})
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.hours}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PriceIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.priceRange}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <DirectionsIcon fontSize="small" color="action" sx={{ mr: 1, mt: 0.3 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.address}
                          <br />
                          {venue.distance}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </Box>

      {/* Stores & Districts Tab */}
      <Box role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2" aria-labelledby="tab-2">
        {activeTab === 2 && (
          <Section
            title="Stores & Shopping Districts"
            titleIcon={<StoreIcon color="primary" />}
            divider
          >
            <Typography variant="body1" paragraph>
              In addition to malls, Houston has several individual stores and shopping districts
              that offer unique shopping experiences. These include big-box retailers and charming
              shopping neighborhoods.
            </Typography>

            <Grid container spacing={3}>
              {getStores().map(venue => (
                <Grid item xs={12} sm={6} key={venue.id}>
                  <Card
                    title={venue.name}
                    description={venue.description}
                    image={venue.image}
                    imageAlt={venue.name}
                    imageHeight={200}
                    action={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {venue.website && (
                          <Button
                            variant="outlined"
                            color="primary"
                            href={venue.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            Website
                          </Button>
                        )}
                        {venue.directions && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            href={venue.directions}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            startIcon={<DirectionsIcon />}
                          >
                            Directions
                          </Button>
                        )}
                      </Box>
                    }
                  >
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip
                          label={venue.category === 'district' ? 'Shopping District' : 'Store'}
                          size="small"
                          color={venue.category === 'district' ? 'secondary' : 'default'}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.hours}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PriceIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.priceRange}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <DirectionsIcon fontSize="small" color="action" sx={{ mr: 1, mt: 0.3 }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.address}
                          <br />
                          {venue.distance}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
      </Box>

      {/* Price Comparison Tab */}
      <Box role="tabpanel" hidden={activeTab !== 3} id="tabpanel-3" aria-labelledby="tab-3">
        {activeTab === 3 && (
          <Section title="Price Comparison" titleIcon={<CompareIcon color="primary" />} divider>
            <Typography variant="body1" paragraph>
              This comparison helps you decide where to shop based on your needs and budget. Prices
              are approximate and may vary.
            </Typography>

            {shoppingComparisons.map(comparison => (
              <Box key={comparison.category} sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  {comparison.category}
                </Typography>

                <TableContainer component={Paper} variant="outlined">
                  <Table aria-label={`${comparison.category} price comparison`}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell>
                          <strong>Item</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Katy Mills</strong>
                        </TableCell>
                        <TableCell>
                          <strong>The Galleria</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Target/Walmart</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Notes</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {comparison.items.map(item => (
                        <TableRow key={item.name}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.katyMills}</TableCell>
                          <TableCell>{item.galleria}</TableCell>
                          <TableCell>{item.targetWalmart}</TableCell>
                          <TableCell>{item.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Shopping Tips:
              </Typography>
              <ul>
                <li>
                  Katy Mills is great for outlet shopping but is farther from downtown (25 miles).
                </li>
                <li>The Galleria offers high-end shopping and is closer to downtown (8 miles).</li>
                <li>Target and Walmart are best for everyday essentials and basic souvenirs.</li>
                <li>Consider transportation costs when deciding where to shop.</li>
                <li>Many malls offer visitor discount programs - ask at information desks.</li>
              </ul>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/maps"
                  startIcon={<DirectionsIcon />}
                >
                  View Shopping Locations on Map
                </Button>
              </Box>
            </Box>
          </Section>
        )}
      </Box>
    </Container>
  );
};

export default ShoppingPage;
