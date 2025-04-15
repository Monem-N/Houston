import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  ShoppingBag as ShoppingBagIcon,
  Store as StoreIcon,
  LocalMall as LocalMallIcon,
  FamilyRestroom as FamilyRestroomIcon,
  Cake as CakeIcon,
  Lightbulb as LightbulbIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationOnIcon,
  Info as InfoIcon,
  LocalDining as LocalDiningIcon,
  Storefront as StorefrontIcon,
  LocalPizza as LocalPizzaIcon,
  AccessTime as AccessTimeIcon,
  DirectionsCar as DirectionsCarIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`local-dining-shopping-tabpanel-${index}`}
      aria-labelledby={`local-dining-shopping-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `local-dining-shopping-tab-${index}`,
    'aria-controls': `local-dining-shopping-tabpanel-${index}`,
  };
}

const LocalDiningShoppingPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Local Dining & Shopping Guide
      </Typography>

      <Typography variant="subtitle1" paragraph align="center" sx={{ mb: 4 }}>
        Discover Houston's authentic dining and shopping experiences with our detailed guide to
        local neighborhoods, culinary specialties, and unique boutiques.
      </Typography>

      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Local dining and shopping tabs"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: '72px',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Tab icon={<RestaurantIcon />} label="Dining Districts" {...a11yProps(0)} />
          <Tab icon={<LocalDiningIcon />} label="Culinary Specialties" {...a11yProps(1)} />
          <Tab icon={<ShoppingBagIcon />} label="Local Shopping" {...a11yProps(2)} />
          <Tab icon={<LocalMallIcon />} label="Shopping Centers" {...a11yProps(3)} />
          <Tab icon={<FamilyRestroomIcon />} label="Family Shopping" {...a11yProps(4)} />
          <Tab icon={<CakeIcon />} label="Specialty Foods" {...a11yProps(5)} />
          <Tab icon={<LightbulbIcon />} label="Shopping Tips" {...a11yProps(6)} />
        </Tabs>
      </Paper>

      {/* Dining Districts Tab */}
      <TabPanel value={value} index={0}>
        <Typography variant="h4" component="h2" gutterBottom>
          <RestaurantIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Houston's Gastronomic Neighborhoods
        </Typography>

        <Typography variant="body1" paragraph>
          Explore Houston's diverse culinary scene through its distinctive neighborhoods, each
          offering unique dining experiences.
        </Typography>

        <Grid container spacing={3}>
          {/* Downtown */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    Downtown
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  The heart of Houston offers a mix of upscale restaurants, casual eateries, and
                  vibrant bars.
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Top Restaurants</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Xochi"
                          secondary="Modern Oaxacan cuisine by award-winning chef Hugo Ortega"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Potente"
                          secondary="Upscale Italian dining near Minute Maid Park"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Pappas Bros. Steakhouse"
                          secondary="Classic steakhouse with an extensive wine list"
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          {/* Midtown */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    Midtown
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  A trendy area with diverse dining options, craft breweries, and lively nightlife.
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Top Restaurants</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Brennan's of Houston"
                          secondary="Upscale Creole cuisine in an elegant setting"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Weights + Measures"
                          secondary="American brasserie with bakery and bar"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Axelrad Beer Garden"
                          secondary="Relaxed beer garden with hammocks and pizza"
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          {/* Heights */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    The Heights
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  A historic neighborhood with charming restaurants, cafes, and boutique eateries.
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Top Restaurants</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Coltivare"
                          secondary="Italian-inspired cuisine with garden-fresh ingredients"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Better Luck Tomorrow"
                          secondary="Neighborhood bar with excellent food"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Squable"
                          secondary="European-inspired American bistro"
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Culinary Specialties Tab */}
      <TabPanel value={value} index={1}>
        <Typography variant="h4" component="h2" gutterBottom>
          <LocalDiningIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Houston's Culinary Specialties
        </Typography>

        <Typography variant="body1" paragraph>
          Discover the distinctive culinary traditions that make Houston a food lover's paradise.
        </Typography>

        <Grid container spacing={3}>
          {/* Tex-Mex */}
          <Grid item xs={12} md={6} lg={3}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalPizzaIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    Tex-Mex
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  The fusion of Texan and Mexican cuisines featuring fajitas, queso, and margaritas.
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Where to Try</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Ninfa's on Navigation"
                          secondary="The original home of fajitas"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Pappasito's Cantina"
                          secondary="Popular local chain with festive atmosphere"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Try: Mama Ninfa's beef fajitas" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>

          {/* BBQ */}
          <Grid item xs={12} md={6} lg={3}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalDiningIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    Texas BBQ
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Slow-smoked meats with an emphasis on brisket, ribs, and sausage.
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Where to Try</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Killen's BBQ"
                          secondary="Award-winning barbecue worth the drive to Pearland"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Truth BBQ"
                          secondary="Central Texas-style barbecue on Washington Ave"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Try: Beef brisket and beef ribs" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Local Shopping Tab */}
      <TabPanel value={value} index={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          <ShoppingBagIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Local Shopping
        </Typography>

        <Typography variant="body1" paragraph>
          Explore Houston's unique boutiques, local markets, and authentic Texan souvenirs.
        </Typography>

        <Grid container spacing={3}>
          {/* Unique Boutiques */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StorefrontIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    Unique Boutiques
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Discover locally-owned shops offering clothing, accessories, and home goods.
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Recommended Shops</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <StoreIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Kuhl-Linscomb"
                          secondary="Upscale department store with curated home goods and gifts"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <StoreIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Space Montrose"
                          secondary="Local art, jewelry, and Houston-themed gifts"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <StoreIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="The Tinderbox"
                          secondary="Men's clothing and accessories with Texas flair"
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Shopping Centers Tab */}
      <TabPanel value={value} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalMallIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    The Galleria
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Houston's premier shopping destination with over 400 stores and restaurants.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Chip
                    icon={<LocationOnIcon />}
                    label="5085 Westheimer Rd"
                    sx={{ mb: 1, mr: 1 }}
                  />
                  <Chip
                    icon={<AccessTimeIcon />}
                    label="10am-9pm Mon-Sat, 11am-7pm Sun"
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Features luxury brands like Gucci, Louis Vuitton, and Neiman Marcus alongside
                  mid-range retailers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Family Shopping Tab */}
      <TabPanel value={value} index={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          <FamilyRestroomIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Family-Friendly Shopping
        </Typography>

        <Typography variant="body1" paragraph>
          Shopping destinations and experiences that cater to families with children.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StoreIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    Toy Stores
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Specialty toy stores offering unique and educational toys for children.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Toys R Us"
                      secondary="5730 W Loop S, Houston, TX 77081"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Fundamentally Toys"
                      secondary="2401 Rice Blvd, Houston, TX 77005"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Specialty Foods Tab */}
      <TabPanel value={value} index={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          <CakeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Specialty Food Shopping
        </Typography>

        <Typography variant="body1" paragraph>
          Where to find gourmet ingredients, international foods, and local delicacies.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StoreIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    Farmers Markets
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Fresh, local produce and artisanal food products direct from producers.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Urban Harvest Farmers Market"
                      secondary="2752 Buffalo Speedway, Houston, TX 77027"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Saturdays 8am-12pm" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Shopping Tips Tab */}
      <TabPanel value={value} index={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          <LightbulbIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Houston Shopping Tips
        </Typography>

        <Typography variant="body1" paragraph>
          Practical advice to enhance your shopping experience in Houston.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InfoIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h5" component="h3">
                    General Tips
                  </Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Most shopping centers have free parking, but downtown locations may require paid parking." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sales tax in Houston is 8.25%, which is added at checkout." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Many malls and shopping centers are climate-controlled, providing relief from Houston's heat." />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default LocalDiningShoppingPage;
