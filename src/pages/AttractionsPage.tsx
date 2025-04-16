import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Container,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney as PriceIcon,
  Attractions as AttractionsIcon,
  Rocket as RocketIcon,
  Museum as MuseumIcon,
  Park as ParkIcon,
  Info as InfoIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Card, PageHeader, Section } from '../components/common';

// Define interfaces for our data
interface Attraction {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  location: string;
  hours: string;
  price: string;
  ticketLink?: string | null;
  rating?: number;
  reviewCount?: number;
  highlights?: string[];
  tips?: string[];
  nearbyAttractions?: string[];
  area?: string;
}

interface AreaInfo {
  name: string;
  description: string;
  image: string;
  highlights: string[];
  gettingThere: string;
  tips: string[];
}

const AttractionsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // All attractions data
  // Space Center & Kemah area information
  const spaceCenterAreaInfo: AreaInfo = {
    name: t('attractions.areas.spaceCenter.name', 'Space Center & Kemah'),
    description: t('attractions.areas.spaceCenter.description', "Explore NASA's Johnson Space Center and the nearby Kemah Boardwalk for a perfect blend of education and entertainment."),
    image: '/assets/images/attractions/space-center-area.jpg',
    highlights: [
      t('attractions.areas.spaceCenter.highlights.1', "Tour NASA's Johnson Space Center and see real spacecraft"),
      t('attractions.areas.spaceCenter.highlights.2', 'Experience the Kemah Boardwalk with rides, restaurants, and shops'),
      t('attractions.areas.spaceCenter.highlights.3', "Learn about America's space program and future missions"),
      t('attractions.areas.spaceCenter.highlights.4', 'Enjoy waterfront dining and entertainment'),
    ],
    gettingThere: t('attractions.areas.spaceCenter.gettingThere', 'Space Center Houston is located about 25 miles southeast of downtown Houston. Kemah Boardwalk is approximately 20 minutes further southeast. Driving is recommended, but guided tours are also available from downtown Houston.'),
    tips: [
      t('attractions.areas.spaceCenter.tips.1', 'Plan at least 4-5 hours for Space Center Houston to see everything'),
      t('attractions.areas.spaceCenter.tips.2', 'Buy Space Center tickets online in advance to avoid lines'),
      t('attractions.areas.spaceCenter.tips.3', 'Visit Kemah Boardwalk in the evening for the best atmosphere'),
      t('attractions.areas.spaceCenter.tips.4', 'Check the Space Center website for special events and astronaut appearances'),
    ],
  };

  // Museum District area information
  const museumDistrictAreaInfo: AreaInfo = {
    name: t('attractions.areas.museumDistrict.name', 'Museum District'),
    description: t('attractions.areas.museumDistrict.description', "Houston's Museum District features 19 museums within a 1.5-mile radius, offering world-class exhibits in art, science, history, and culture."),
    image: '/assets/images/attractions/museum-district-area.jpg',
    highlights: [
      t('attractions.areas.museumDistrict.highlights.1', 'Visit the Houston Museum of Natural Science with its dinosaur hall and planetarium'),
      t('attractions.areas.museumDistrict.highlights.2', 'Explore the Museum of Fine Arts with over 65,000 works spanning antiquity to present'),
      t('attractions.areas.museumDistrict.highlights.3', "Experience the Children's Museum of Houston, rated one of the best in the country"),
      t('attractions.areas.museumDistrict.highlights.4', 'Discover the Health Museum, Holocaust Museum, and Contemporary Arts Museum'),
    ],
    gettingThere: t('attractions.areas.museumDistrict.gettingThere', "The Museum District is located just south of downtown Houston. It's easily accessible via the METRORail Red Line, with several stations serving the area. Parking is available but can be limited on busy days."),
    tips: [
      t('attractions.areas.museumDistrict.tips.1', 'Many museums offer free admission on Thursdays'),
      t('attractions.areas.museumDistrict.tips.2', 'Consider the Houston CityPASS if visiting multiple attractions'),
      t('attractions.areas.museumDistrict.tips.3', 'The area is walkable, but the Houston heat can be intense - stay hydrated'),
      t('attractions.areas.museumDistrict.tips.4', 'Some museums require timed entry tickets - check websites before visiting'),
    ],
  };

  // Hermann Park & Zoo area information
  const hermannParkAreaInfo: AreaInfo = {
    name: t('attractions.areas.hermannPark.name', 'Hermann Park & Zoo'),
    description: t('attractions.areas.hermannPark.description', 'Hermann Park is a 445-acre urban park that includes the Houston Zoo, Japanese Garden, Miller Outdoor Theatre, and recreational facilities.'),
    image:'/assets/images/attractions/hermann-park-area.jpg',
    highlights: [
      t('attractions.areas.hermannPark.highlights.1', 'Visit the Houston Zoo with over 6,000 animals from 900 species'),
      t('attractions.areas.hermannPark.highlights.2', 'Enjoy the Japanese Garden with traditional architecture and landscaping'),
      t('attractions.areas.hermannPark.highlights.3', 'Ride the Hermann Park Railroad, perfect for families with children'),
      t('attractions.areas.hermannPark.highlights.4', 'Catch a free performance at Miller Outdoor Theatre (seasonal)'),
    ],
    gettingThere: t('attractions.areas.hermannPark.gettingThere', "Hermann Park is located adjacent to the Museum District. It's accessible via the METRORail Red Line (Hermann Park/Rice University station). Parking is available in several lots throughout the park."),
    tips: [
      t('attractions.areas.hermannPark.tips.1', 'The Houston Zoo is busiest on weekends and holidays - visit on weekdays if possible'),
      t('attractions.areas.hermannPark.tips.2', 'Bring a picnic to enjoy in designated areas of the park'),
      t('attractions.areas.hermannPark.tips.3', 'Rent a paddleboat on McGovern Lake for a relaxing experience'),
      t('attractions.areas.hermannPark.tips.4', 'Check the Miller Outdoor Theatre schedule for free performances'),
    ],
  };

  // All attractions data
  const attractions: Attraction[] = [
    {
      id: 1,
      name: 'Space Center Houston',
      category: 'Museum',
      area:'Space Center & Kemah',
      image: '/assets/images/attractions/space-center.jpg',
      description:
        'The official visitor center of NASA Johnson Space Center, featuring spacecraft exhibits, interactive displays, and behind-the-scenes tours of NASA facilities.',
      location:'1601 E NASA Pkwy, Houston, TX 77058',
      hours: '10:00 AM - 5:00 PM',
      price: '$29.95 adults, $24.95 children',
      rating: 4.6,
      reviewCount: 1245,
      ticketLink:'https://tickets.spacecenter.org/webstore/shop/viewitems.aspx',
      highlights: [
        'See real spacecraft including the Saturn V rocket',
        'Touch a real moon rock',
        "Tour NASA's Johnson Space Center on the tram tour",
        'Meet an astronaut (on select days),',
      ],
      tips: [
        'Plan to spend at least 4-5 hours here','The tram tour often has long lines - do this early',
        'Check the daily schedule for special presentations',
        'Buy tickets online to save time',
      ],
      nearbyAttractions: ['Kemah Boardwalk', 'Armand Bayou Nature Center', 'Clear Lake'],
    },
    {
      id: 2,
      name:'Kemah Boardwalk',
      category: 'Entertainment',
      area: 'Space Center & Kemah',
      image:'/assets/images/attractions/kemah-boardwalk.jpg',
      description:
        'A 60-acre waterfront entertainment complex with rides, restaurants, shopping, and midway games along Galveston Bay.',
      location: '215 Kipp Ave, Kemah, TX 77565',
      hours:'Mon-Thu: 12:00 PM - 8:00 PM, Fri-Sun: 10:30 AM - 10:00 PM',
      price: 'Free admission, rides: $5-12 each or $24.99 all-day pass',
      rating: 4.4,
      reviewCount: 987,
      ticketLink: 'https://www.kemahboardwalk.com/tickets.asp',
      highlights: ['Boardwalk Beast speedboat thrill ride',
        'Wooden roller coaster and Ferris wheel',
        'Stingray Reef touch tank experience','Waterfront dining with bay views',
      ],
      tips: [
        'Visit on weekdays to avoid crowds',
        'All-day ride passes offer the best value if riding multiple attractions','Restaurants can have long waits on weekends - make reservations',
        'Check the website for special events and fireworks schedules',
      ],
      nearbyAttractions: ['Space Center Houston','Clear Lake', 'Armand Bayou Nature Center'],
    },
    {
      id: 3,
      name: 'Houston Museum of Natural Science',
      category:'Museum',
      area: 'Museum District',
      image: '/assets/images/attractions/museum-natural-science.jpg',
      description:'A science museum with world-class exhibits on paleontology, astronomy, gems and minerals, wildlife, and more.',
      location: '5555 Hermann Park Dr, Houston, TX 77030',
      hours: '9:00 AM - 5:00 PM',
      price:'$25 adults, $16 children (includes permanent exhibits only)',
      rating: 4.7,
      reviewCount: 1532,
      ticketLink: 'https://store.hmns.org/',
      highlights: [
        'Morian Hall of Paleontology with over 60 dinosaur skeletons','Burke Baker Planetarium with state-of-the-art star shows',
        'Cockrell Butterfly Center with a three-story rainforest habitat',
        'Cullen Hall of Gems and Minerals featuring the famous Cullinan Diamond replica',
      ],
      tips: ['Special exhibits and the planetarium require additional tickets',
        'Free admission on Thursdays from 2:00 PM - 5:00 PM (permanent exhibits only)',
        'The museum can get crowded with school groups on weekday mornings','Allow at least 3-4 hours to see the main exhibits',
      ],
      nearbyAttractions: ['Hermann Park', 'Houston Zoo','Museum of Fine Arts'],
    },
    {
      id: 4,
      name: 'Museum of Fine Arts, Houston',
      category: 'Museum',
      area:'Museum District',
      image: '/assets/images/attractions/museum-fine-arts.jpg',
      description:
        'One of the largest art museums in the United States, with a collection spanning more than 6,000 years of history.',
      location:'1001 Bissonnet St, Houston, TX 77005',
      hours: 'Wed-Sun: 11:00 AM - 6:00 PM, Thu: 11:00 AM - 9:00 PM',
      price: '$19 adults, free for children 12 and under',
      rating: 4.6,
      reviewCount: 1123,
      ticketLink:'https://www.mfah.org/visit/admissions',
      highlights: [
        'European art collection including works by Monet, Picasso, and Rembrandt',
        'Latin American art collection, one of the most comprehensive in the world','Bayou Bend Collection and Gardens featuring American decorative arts',
        'Cullen Sculpture Garden with works by Rodin, Matisse, and others',
      ],
      tips: [
        'Free admission on Thursdays','The museum spans multiple buildings - pick up a map at the entrance',
        'Check the website for current special exhibitions',
        'The on-site restaurant, MFA Café, is a good option for lunch',
      ],
      nearbyAttractions: ['Contemporary Arts Museum Houston',
        'The Menil Collection',
        'Rice University Campus',
      ],
    },
    {
      id: 5,
      name: "Children's Museum Houston",
      category: 'Museum',
      area: 'Museum District',
      image:'/assets/images/attractions/childrens-museum.jpg',
      description:
        'An interactive museum designed for children with exhibits focusing on science, technology, health, and culture.',
      location: '1500 Binz St, Houston, TX 77004',
      hours:'Tue-Sat: 10:00 AM - 6:00 PM, Thu: 10:00 AM - 8:00 PM',
      price: '$15 per person, children under 1 free',
      rating: 4.8,
      reviewCount: 876,
      ticketLink: 'https://www.cmhouston.org/tickets',
      highlights: ['Kidtropolis, USA - a kid-sized city where children can role-play different careers',
        'PowerPlay - a three-story physical challenge course',
        'Invention Convention - hands-on engineering activities','FlowWorks - water play area exploring fluid dynamics',
      ],
      tips: [
        'Free admission on Thursdays from 5:00 PM - 8:00 PM',
        'Best for children ages 0-12','Weekday mornings can be busy with school groups',
        'Bring a change of clothes for water play areas',
      ],
      nearbyAttractions: ['Houston Museum of Natural Science','Hermann Park', 'Health Museum'],
    },
    {
      id: 6,
      name: 'Houston Zoo',
      category:'Zoo',
      area: 'Hermann Park & Zoo',
      image: '/assets/images/attractions/houston-zoo.jpg',
      description:'Home to more than 6,000 animals from 900 species in naturalistic habitats, located within Hermann Park.',
      location: '6200 Hermann Park Dr, Houston, TX 77030',
      hours: '9:00 AM - 5:00 PM (last entry at 4:00 PM)',
      price:'$22.95 adults, $17.95 children (2-11)',
      rating: 4.5,
      reviewCount: 1876,
      ticketLink: 'https://www.houstonzoo.org/plan-your-visit/prices-and-discounts/',
      highlights: [
        'African Forest exhibit with gorillas, chimpanzees, and rhinos','McNair Asian Elephant Habitat with daily elephant baths',
        'Sea Lion exhibit with underwater viewing',
        'Natural Encounters building with interactive exhibits',
      ],
      tips: ['Buy tickets online to avoid lines',
        'Visit early in the morning when animals are most active',
        'The zoo is busiest on weekends and holidays','Bring water bottles - refill stations are available throughout the zoo',
      ],
      nearbyAttractions: [
        'Hermann Park Railroad',
        'McGovern Centennial Gardens','Miller Outdoor Theatre',
      ],
    },
    {
      id: 7,
      name: 'Hermann Park',
      category: 'Park',
      area:'Hermann Park & Zoo',
      image: '/assets/images/attractions/hermann-park.jpg',
      description:
        'A 445-acre urban park featuring gardens, recreational areas, a lake, and cultural venues.',
      location:'6001 Fannin St, Houston, TX 77030',
      hours: '6:00 AM - 11:00 PM',
      price: 'Free (some attractions within the park have fees)',
      rating: 4.7,
      reviewCount: 1432,
      ticketLink: null,
      highlights: ['McGovern Centennial Gardens with themed garden rooms',
        'Japanese Garden with traditional architecture and landscaping',
        'Paddleboat rentals on McGovern Lake','Miller Outdoor Theatre with free performances',
      ],
      tips: [
        'The Hermann Park Railroad is a fun way to tour the park ($3.75 per ride)',
        'Bring a picnic to enjoy in designated areas','Check the Miller Outdoor Theatre schedule for free performances',
        'Visit on weekdays to avoid crowds',
      ],
      nearbyAttractions: ['Houston Zoo','Museum of Natural Science', 'Rice University Campus'],
    },
    {
      id: 8,
      name: 'Miller Outdoor Theatre',
      category:'Entertainment',
      area: 'Hermann Park & Zoo',
      image: '/assets/images/attractions/miller-outdoor-theatre.jpg',
      description:'An open-air theater in Hermann Park offering free performances including concerts, plays, dance, and films.',
      location: '6000 Hermann Park Dr, Houston, TX 77030',
      hours: 'Varies by performance (typically March-November)',
      price:'Free',
      rating: 4.8,
      reviewCount: 765,
      ticketLink: 'https://www.milleroutdoortheatre.com/events/',
      highlights: [
        'Free performances ranging from symphony concerts to Shakespeare plays','Covered seating (tickets required) and hill seating (no tickets needed)',
        'Beautiful setting in Hermann Park',
        'Family-friendly environment',
      ],
      tips: ['Covered seating tickets are available online the day before the performance',
        'Bring blankets or lawn chairs for hill seating',
        'Outside food and drinks are allowed (no glass containers)','Arrive early for best hill seating spots',
      ],
      nearbyAttractions: ['Hermann Park', 'Houston Zoo','Museum of Natural Science'],
    },
    {
      id: 9,
      name: 'Contemporary Arts Museum Houston',
      category: 'Museum',
      area:'Museum District',
      image: '/assets/images/attractions/contemporary-arts-museum.jpg',
      description: 'A non-collecting museum dedicated to exhibiting cutting-edge contemporary art.',
      location:'5216 Montrose Blvd, Houston, TX 77006',
      hours: 'Wed-Sun: 12:00 PM - 6:00 PM, Thu: 12:00 PM - 9:00 PM',
      price: 'Free',
      rating: 4.3,
      reviewCount: 543,
      ticketLink: null,
      highlights: ['Rotating exhibitions of contemporary art',
        'Works by both established and emerging artists',
        'Distinctive stainless steel building designed by Gunnar Birkerts','Educational programs and artist talks',
      ],
      tips: [
        'Check the website for current exhibitions before visiting',
        'Free guided tours available on Saturdays at 2:00 PM','The museum shop has unique art books and gifts',
        'Combine with visits to nearby museums',
      ],
      nearbyAttractions: ['Museum of Fine Arts','Rothko Chapel', 'The Menil Collection'],
    },
  ];

  // Helper functions to filter attractions by area
  const getSpaceCenterAttractions = () =>
    attractions.filter(attraction => attraction.area === 'Space Center & Kemah');
  const getMuseumDistrictAttractions = () =>
    attractions.filter(attraction => attraction.area ==='Museum District');
  const getHermannParkAttractions = () =>
    attractions.filter(attraction => attraction.area === 'Hermann Park & Zoo');

  // Render attraction card
  const renderAttractionCard = (attraction: Attraction) => (
    <Grid item xs={12} sm={6} md={4} key={attraction.id}>
      <Card
        title={attraction.name}
        description={attraction.description}
        image={attraction.image}
        imageAlt={attraction.name}
        imageHeight={180}
        action={
          attraction.ticketLink && (
            <Button
              variant="outlined"
              color="primary"
              href={attraction.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              fullWidth
            >
              {t('attractions.buyTickets', 'Buy Tickets')}
            </Button>
          )
        }
      >
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Chip label={attraction.category} size="small" color="primary" />

            {attraction.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={attraction.rating} readOnly precision={0.1} size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  ({t('attractions.reviews', '{{count}} reviews', { count: attraction.reviewCount })})
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {attraction.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {attraction.hours}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PriceIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {attraction.price}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  );

  // Render area information
  const renderAreaInfo = (areaInfo: AreaInfo) => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={areaInfo.image}
            alt={areaInfo.name}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 1,
              mb: { xs: 2, md: 0 },
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            {t('attractions.aboutArea', 'About {{name}}', { name: areaInfo.name })}
          </Typography>
          <Typography variant="body1" paragraph>
            {areaInfo.description}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <strong>{t('attractions.highlights', 'Highlights')}:</strong>
          </Typography>
          <List dense>
            {areaInfo.highlights.map((highlight, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <StarIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={highlight} />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle1" gutterBottom>
            <strong>{t('attractions.gettingThere', 'Getting There')}:</strong>
          </Typography>
          <Typography variant="body2" paragraph>
            {areaInfo.gettingThere}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <strong>{t('attractions.tips', 'Tips')}:</strong>
          </Typography>
          <List dense>
            {areaInfo.tips.map((tip, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InfoIcon color="info" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Container maxWidth="lg">
      <PageHeader
        title={t('attractions.title', 'Attractions')}
        subtitle={t('attractions.subtitle', 'Discover the best attractions and things to do in Houston during your visit.')}
        data-testid="page-title"
        breadcrumbs={[{ label: t('navigation.home', 'Home'), path: '/'}, { label: t('navigation.attractions', 'Attractions') }]}
      />

      <Box sx={{ borderBottom: 1, borderColor:'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="attractions tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<AttractionsIcon />}
            label={t('attractions.tabs.all', 'All Attractions')}
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab
            icon={<RocketIcon />}
            label={t('attractions.tabs.spaceCenter', 'Space Center & Kemah')}
            id="tab-1"
            aria-controls="tabpanel-1"
          />
          <Tab
            icon={<MuseumIcon />}
            label={t('attractions.tabs.museumDistrict', 'Museum District')}
            id="tab-2"
            aria-controls="tabpanel-2"
          />
          <Tab
            icon={<ParkIcon />}
            label={t('attractions.tabs.hermannPark', 'Hermann Park & Zoo')}
            id="tab-3"
            aria-controls="tabpanel-3"
          />
        </Tabs>
      </Box>

      {/* All Attractions Tab */}
      <Box role="tabpanel" hidden={activeTab !== 0} id="tabpanel-0" aria-labelledby="tab-0">
        {activeTab === 0 && (
          <Section
            title={t('attractions.popularAttractions', 'Popular Attractions')}
            titleIcon={<AttractionsIcon color="primary" />}
            divider
          >
            <Typography variant="body1" paragraph>
              {t('attractions.overview', 'Houston offers a wide variety of attractions for visitors, from world-class museums and cultural institutions to outdoor spaces and entertainment venues. Here are some of the most popular attractions to visit during your stay in Houston.')}
            </Typography>

            <Grid container spacing={3}>
              {attractions.map(attraction => renderAttractionCard(attraction))}
            </Grid>
          </Section>
        )}
      </Box>

      {/* Space Center & Kemah Tab */}
      <Box role="tabpanel" hidden={activeTab !== 1} id="tabpanel-1" aria-labelledby="tab-1">
        {activeTab === 1 && (
          <>
            <Section
              title={t('attractions.areas.spaceCenter.name', 'Space Center & Kemah')}
              titleIcon={<RocketIcon color="primary" />}
              divider
            >
              {renderAreaInfo(spaceCenterAreaInfo)}

              <Typography variant="h6" gutterBottom>
                {t('attractions.featuredAttractions', 'Featured Attractions')}
              </Typography>
              <Grid container spacing={3}>
                {getSpaceCenterAttractions().map(attraction => renderAttractionCard(attraction))}
              </Grid>
            </Section>
          </>
        )}
      </Box>

      {/* Museum District Tab */}
      <Box role="tabpanel" hidden={activeTab !== 2} id="tabpanel-2" aria-labelledby="tab-2">
        {activeTab === 2 && (
          <>
            <Section title={t('attractions.areas.museumDistrict.name', 'Museum District')} titleIcon={<MuseumIcon color="primary" />} divider>
              {renderAreaInfo(museumDistrictAreaInfo)}

              <Typography variant="h6" gutterBottom>
                {t('attractions.featuredMuseums', 'Featured Museums')}
              </Typography>
              <Grid container spacing={3}>
                {getMuseumDistrictAttractions().map(attraction => renderAttractionCard(attraction))}
              </Grid>
            </Section>
          </>
        )}
      </Box>

      {/* Hermann Park & Zoo Tab */}
      <Box role="tabpanel" hidden={activeTab !== 3} id="tabpanel-3" aria-labelledby="tab-3">
        {activeTab === 3 && (
          <>
            <Section title={t('attractions.areas.hermannPark.name', 'Hermann Park & Zoo')} titleIcon={<ParkIcon color="primary" />} divider>
              {renderAreaInfo(hermannParkAreaInfo)}

              <Typography variant="h6" gutterBottom>
                {t('attractions.featuredAttractions', 'Featured Attractions')}
              </Typography>
              <Grid container spacing={3}>
                {getHermannParkAttractions().map(attraction => renderAttractionCard(attraction))}
              </Grid>
            </Section>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AttractionsPage;
