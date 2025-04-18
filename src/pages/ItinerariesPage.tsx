import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Map as MapIcon,
  Route as RouteIcon,
  Info as InfoIcon,
  DirectionsCar as CarIcon,
  DirectionsTransit as TransitIcon,
  LocalTaxi as TaxiIcon,
  WbSunny as SunnyIcon,
  Restaurant as RestaurantIcon,
  ConfirmationNumber as TicketIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

// Define the itinerary data structure
interface Waypoint {
  name: string;
  lat: number;
  lng: number;
  description: string;
  stopover: boolean;
}

interface Itinerary {
  id: string;
  title: string;
  description: string;
  color: string;
  waypoints: Waypoint[];
}

// Sample itinerary data based on the original site
const SUGGESTED_ITINERARIES: Itinerary[] = [
  {
    id: 'jour1',
    title: 'Jour 1: Arrivée à Houston',
    description: 'Arrivée à Houston et installation à l’hôtel',
    color: '#4285F4',
    waypoints: [
      {
        name: 'Aéroport de Houston',
        lat: 29.9902,
        lng: -95.3368,
        description: 'Arrivée à l’aéroport de Houston',
        stopover: true,
      },
      {
        name: 'Hôtel Crowne Plaza',
        lat: 29.7328,
        lng: -95.416,
        description: 'Installation à l’hôtel Crowne Plaza Houston Med-Ctr Galleria Area',
        stopover: true,
      },
    ],
  },
  {
    id: 'jour2',
    title: 'Jour 2: Space Center & Kemah',
    description: 'Découverte du Space Center Houston et de Kemah Boardwalk',
    color: '#DB4437',
    waypoints: [
      {
        name: 'Hôtel (départ)',
        lat: 29.7328,
        lng: -95.416,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true,
      },
      {
        name: 'Space Center Houston',
        lat: 29.5519,
        lng: -95.097,
        description: 'Visite du centre spatial de la NASA (prévoir 3-4h)',
        stopover: true,
      },
      {
        name: 'Déjeuner au Space Center',
        lat: 29.5519,
        lng: -95.097,
        description: 'Déjeuner au restaurant du Space Center',
        stopover: true,
      },
      {
        name: 'Kemah Boardwalk',
        lat: 29.5447,
        lng: -95.02,
        description: 'Attractions et divertissements en bord de mer (prévoir 2-3h)',
        stopover: true,
      },
      {
        name: 'Dîner à Kemah',
        lat: 29.5447,
        lng: -95.02,
        description: "Dîner dans l'un des restaurants de fruits de mer à Kemah",
        stopover: true,
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.416,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true,
      },
    ],
  },
  {
    id: 'jour3',
    title: 'Jour 3: FIRST Championship',
    description: 'Participation au FIRST Championship au George R. Brown Convention Center',
    color: '#0F9D58',
    waypoints: [
      {
        name: 'Hôtel (départ)',
        lat: 29.7328,
        lng: -95.416,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true,
      },
      {
        name: 'George R. Brown Convention Center',
        lat: 29.752,
        lng: -95.3562,
        description: 'Participation au FIRST Championship (toute la journée)',
        stopover: true,
      },
      {
        name: 'Déjeuner au Convention Center',
        lat: 29.752,
        lng: -95.3562,
        description: "Déjeuner dans l'un des restaurants du Convention Center",
        stopover: true,
      },
      {
        name: 'Retour au FIRST Championship',
        lat: 29.752,
        lng: -95.3562,
        description: "Retour aux compétitions de l'après-midi",
        stopover: true,
      },
      {
        name: 'Dîner près du Convention Center',
        lat: 29.752,
        lng: -95.3562,
        description: "Dîner dans l'un des restaurants près du Convention Center",
        stopover: true,
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.416,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true,
      },
    ],
  },
  {
    id: 'jour4',
    title: 'Jour 4: Hermann Park & Zoo de Houston',
    description: 'Exploration de Hermann Park et du Zoo de Houston',
    color: '#F4B400',
    waypoints: [
      {
        name: 'Hôtel (départ)',
        lat: 29.7328,
        lng: -95.416,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true,
      },
      {
        name: 'Hermann Park',
        lat: 29.7194,
        lng: -95.3909,
        description: 'Promenade dans le parc Hermann (prévoir 1h)',
        stopover: true,
      },
      {
        name: 'Zoo de Houston',
        lat: 29.7146,
        lng: -95.3909,
        description: 'Visite du zoo de Houston (prévoir 2h)',
        stopover: true,
      },
      {
        name: 'Déjeuner au Café Pinewood',
        lat: 29.7194,
        lng: -95.3909,
        description: 'Déjeuner au Café Pinewood dans Hermann Park',
        stopover: true,
      },
      {
        name: 'Jardin Japonais',
        lat: 29.7194,
        lng: -95.3909,
        description: 'Promenade dans le Jardin Japonais',
        stopover: true,
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.416,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true,
      },
    ],
  },
];

// Comparison table data
interface ItineraryComparison {
  id: string;
  title: string;
  duration: string;
  distance: string;
  attractions: number;
  walkingLevel: number;
  idealFor: string;
  tickets: string;
  ticketLink?: string;
}

const ITINERARY_COMPARISON: ItineraryComparison[] = [
  {
    id: 'jour1',
    title: 'Jour 1: Arrivée à Houston',
    duration: 'Demi-journée',
    distance: '10 miles',
    attractions: 1,
    walkingLevel: 1,
    idealFor: 'Voyageurs arrivant à Houston',
    tickets: 'Gratuit',
  },
  {
    id: 'jour2',
    title: 'Jour 2: Space Center & Kemah',
    duration: 'Journée complète',
    distance: '45 miles',
    attractions: 5,
    walkingLevel: 3,
    idealFor: 'Familles, passionnés de science',
    tickets: 'Space Center',
    ticketLink: 'https://tickets.spacecenter.org/webstore/shop/viewitems.aspx',
  },
  {
    id: 'jour3',
    title: 'Jour 3: FIRST Championship',
    duration: 'Journée complète',
    distance: '5 miles',
    attractions: 5,
    walkingLevel: 2,
    idealFor: 'Participants au championnat',
    tickets: 'Inclus',
  },
  {
    id: 'jour4',
    title: 'Jour 4: Hermann Park & Zoo de Houston',
    duration: 'Journée complète',
    distance: '10 miles',
    attractions: 4,
    walkingLevel: 4,
    idealFor: 'Amateurs de nature et d’animaux',
    tickets: 'Zoo de Houston',
  },
];

// Map component placeholder
const ItineraryMap: React.FC<{ itinerary: Itinerary }> = ({ itinerary }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: 400,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        mb: 2,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <MapIcon sx={{ fontSize: 60, color: itinerary.color, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Carte Interactive
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cette carte afficherait normalement l&apos;itinéraire {itinerary.title} avec{' '}
          {itinerary.waypoints.length} points d&apos;arrêt.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Intégration Google Maps requise pour afficher l&apos;itinéraire complet.
        </Typography>
      </Box>
    </Paper>
  );
};

// Itinerary card component
const ItineraryCard: React.FC<{ itinerary: Itinerary; onSelect: (id: string) => void }> = ({
  itinerary,
  onSelect,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        mb: 3,
        borderLeft: `5px solid ${itinerary.color}`,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardHeader
        title={itinerary.title}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={itinerary.description}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Points d&apos;intérêt: {itinerary.waypoints.length - 2} (hors départ et retour)
        </Typography>
        <List dense>
          {itinerary.waypoints.slice(1, -1).map((waypoint, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <RouteIcon style={{ color: itinerary.color }} />
              </ListItemIcon>
              <ListItemText primary={waypoint.name} secondary={waypoint.description} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onSelect(itinerary.id)}
          startIcon={<MapIcon />}
          sx={{ borderColor: itinerary.color, color: itinerary.color }}
        >
          Voir l&#39;itinéraire
        </Button>
      </CardActions>
    </Card>
  );
};

const ItinerariesPage: React.FC = () => {
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelectItinerary = (id: string) => {
    const itinerary = SUGGESTED_ITINERARIES.find(item => item.id === id) || null;
    setSelectedItinerary(itinerary);

    // Scroll to map section if on mobile
    if (isMobile && itinerary) {
      const mapElement = document.getElementById('itinerary-map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Itinéraires Suggérés
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <MapIcon sx={{ mr: 1 }} /> Planifiez votre séjour
        </Typography>
        <Typography paragraph>
          Pour vous aider à organiser votre séjour à Houston, nous avons préparé plusieurs
          itinéraires suggérés. Chaque itinéraire est conçu pour une journée complète et regroupe
          des attractions par proximité et par thème.
        </Typography>
        <Typography paragraph>
          Ces itinéraires sont des suggestions que vous pouvez adapter selon vos préférences et
          votre emploi du temps. Les temps de visite sont approximatifs et peuvent varier en
          fonction de votre rythme et de vos centres d&apos;intérêt.
        </Typography>
        <Typography paragraph sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: '&apos;' }} />
        <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Comment utiliser ces itinéraires
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Chaque itinéraire est présenté avec une carte interactive montrant le parcours suggéré" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Cliquez sur les marqueurs pour obtenir plus d'informations sur chaque point d'arrêt" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Les temps de trajet sont calculés en voiture, mais vous pouvez également utiliser les transports en commun ou des services de VTC" />
            </ListItem>
          </List>
        </Alert>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={selectedItinerary ? 5 : 12}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ScheduleIcon sx={{ mr: 1 }} /> Itinéraires par jour
          </Typography>
          <Typography paragraph>
            Voici nos suggestions d&apos;itinéraires pour un séjour de 5 jours à Houston, incluant{' '}
            le FIRST Championship et les principales attractions de la ville.
          </Typography>

          {SUGGESTED_ITINERARIES.map(itinerary => (
            <ItineraryCard
              key={itinerary.id}
              itinerary={itinerary}
              onSelect={handleSelectItinerary}
            />
          ))}
        </Grid>

        {selectedItinerary && (
          <Grid item xs={12} md={7} id="itinerary-map">
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ color: selectedItinerary.color }}
              >
                {selectedItinerary.title}
              </Typography>
              <Typography paragraph>{selectedItinerary.description}</Typography>
              
              <ItineraryMap itinerary={selectedItinerary} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Points d&apos;arrêt
              </Typography>
              {selectedItinerary.waypoints.length > 0 && (
                <List>
                  {selectedItinerary.waypoints.map((waypoint, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            backgroundColor: selectedItinerary.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        >
                          {index + 1}
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={waypoint.name} secondary={waypoint.description} />
                    </ListItem>
                  ))}
                </List>
              )}
              {selectedItinerary.waypoints.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Aucun point d'arrêt disponible pour cet itinéraire.
                </Typography>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CarIcon sx={{ mr: 1 }} /> Conseils de transport
        </Typography>
        <Typography paragraph>
          Pour suivre ces itinéraires, vous avez plusieurs options de transport :
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader avatar={<CarIcon />} title="Voiture de location" />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Option recommandée pour une flexibilité maximale, surtout pour les destinations
                  éloignées comme le Space Center et Katy Mills.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Réservez à l'avance pour de meilleurs tarifs" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Prévoyez un budget pour le stationnement" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Utilisez une application GPS pour naviguer facilement" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader avatar={<TransitIcon />} title="Transports en commun" />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Le système METRO de Houston est pratique pour les déplacements dans le
                  centre-ville et le Museum District.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Achetez une carte METRO Q pour des trajets illimités" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Téléchargez l'application METRO pour les horaires en temps réel" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Certaines destinations nécessitent des correspondances" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader avatar={<TaxiIcon />} title="Services VTC" />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Uber et Lyft sont largement disponibles à Houston et constituent une bonne
                  alternative à la location de voiture.
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Pratique pour les trajets courts" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Évite les problèmes de stationnement" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Peut devenir coûteux pour les longues distances" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <InfoIcon sx={{ mr: 1 }} /> Conseils pratiques
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader avatar={<SunnyIcon />} title="Météo" />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Houston peut être chaud et humide en avril. Prévoyez des vêtements légers, de&nbsp;
                  l&apos;a&nbsp; crème solaire et une bouteille d&apos;eau réutilisable.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader avatar={<RestaurantIcon />} title="Repas" />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Les itinéraires incluent des suggestions de repas, mais n&apos;hésitez pas à explorer d&apos;autres options gastronomiques de Houston.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader avatar={<TicketIcon />} title="Billets" />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Achetez vos billets pour les attractions à l&apos;avance pour éviter les files d&apos;attente et bénéficier de tarifs réduits.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Liens utiles :
                </Typography>
                <Link
                  href="https://tickets.spacecenter.org/webstore/shop/viewitems.aspx"
                  target="_blank"
                  rel="noopener"
                >
                  Billets Space Center Houston
                </Link> 
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardHeader avatar={<ScheduleIcon />} title="Temps libre" />
              <CardContent> 
                <Typography variant="body2">
                  Prévoyez du temps libre dans votre emploi du temps pour vous reposer ou explorer
                  des découvertes imprévues.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <InfoIcon sx={{ mr: 1 }} /> Tableau comparatif des itinéraires
        </Typography>
        <Typography paragraph>
          Ce tableau vous permet de comparer rapidement les différents itinéraires suggérés.
        </Typography>

        <TableContainer component={Paper} elevation={2}>
          <Table aria-label="tableau comparatif des itinéraires">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableCell sx={{ color: 'white' }}>Itinéraire</TableCell>
                <TableCell sx={{ color: 'white' }}>Durée</TableCell>
                <TableCell sx={{ color: 'white' }}>Distance</TableCell>
                <TableCell sx={{ color: 'white' }}>Attractions</TableCell>
                <TableCell sx={{ color: 'white' }}>Niveau de marche</TableCell>
                <TableCell sx={{ color: 'white' }}>Idéal pour</TableCell>
                <TableCell sx={{ color: 'white' }}>Billets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ITINERARY_COMPARISON.map(item => (
                <TableRow key={item.id} hover>
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="medium">
                      {item.title}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.distance}</TableCell>
                  <TableCell>
                    <Rating value={item.attractions} readOnly max={5} size="small" />
                  </TableCell>
                  <TableCell>
                    <Rating value={item.walkingLevel} readOnly max={5} size="small" />
                  </TableCell>
                  <TableCell>{item.idealFor}</TableCell>
                  <TableCell>
                    {item.ticketLink ? (
                      <Link href={item.ticketLink} target="_blank" rel="noopener">
                        {item.tickets}
                      </Link>
                    ) : (
                      item.tickets
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          * Le niveau de marche est évalué sur une échelle de 1 à 5 étoiles, 5 étant le plus élevé.
        </Typography>
      </Box>
    </Container>
  );
};

export default ItinerariesPage;
