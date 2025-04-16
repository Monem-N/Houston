import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card as MuiCard,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Info as InfoIcon,
  CheckCircle as EligibilityIcon,
  EventNote as ScheduleIcon,
  HowToReg as RegistrationIcon,
  Lightbulb as TipsIcon,
  PhotoLibrary as GalleryIcon,
  Flight as FlightIcon,
} from '@mui/icons-material';
import { PageHeader, Section } from '../../components/common';

// Define interfaces for TourOption and Attraction
interface TourOption {
  id: number;
  name: string;
  duration: string;
  time: string;
  sites: string[];
  meal: string | null;
}

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
}

const TouristanbulPage: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Tour options data
  const tourOptions: TourOption[] = [
    {
      id: 1,
      name: 'Circuit matinal',
      duration: '2h30',
      time: '08h30 - 11h00',
      sites: ['Mosquée Bleue', 'Hippodrome', 'Grand Bazar'],
      meal: null,
    },
    {
      id: 2,
      name: 'Circuit de la mi-journée',
      duration: '6h00',
      time: '09h00 - 15h00',
      sites: ['Mosquée Bleue', 'Sainte-Sophie', 'Citerne Basilique', 'Grand Bazar'],
      meal: 'Déjeuner inclus',
    },
    {
      id: 3,
      name: "Circuit de l'après-midi",
      duration: '6h00',
      time: '12h00 - 18h00',
      sites: [
        'Mosquée Bleue',
        'Sainte-Sophie',
        'Palais de Topkapi (vue extérieure)',
        'Grand Bazar',
      ],
      meal: 'Déjeuner inclus',
    },
    {
      id: 4,
      name: 'Circuit du soir',
      duration: '5h00',
      time: '16h00 - 21h00',
      sites: ['Mosquée Bleue', 'Place Sultanahmet'],
      meal: 'Dîner inclus',
    },
  ];

  // Attractions data
  const attractions: Attraction[] = [
    {
      id: 1,
      name: 'Mosquée Bleue',
      description:
        'Une mosquée du 17ème siècle célèbre pour ses carreaux bleus, toujours active pour le culte, avec accès touristique pendant la journée.',
      image: '/assets/images/attractions/mosquee-bleue.jpg',
    },
    {
      id: 2,
      name: 'Sainte-Sophie',
      description:
        "Un site classé au patrimoine mondial de l'UNESCO, à l'origine une basilique chrétienne (360-1453), plus tard une mosquée, et maintenant un musée.",
      image: '/assets/images/attractions/sainte-sophie.jpg',
    },
    {
      id: 3,
      name: 'Citerne Basilique',
      description:
        "Un réservoir d'eau souterrain du 6ème siècle, avec des colonnes et des sculptures de la tête de Méduse, offrant une expérience historique unique.",
      image: '/assets/images/attractions/citerne-basilique.jpg',
    },
    {
      id: 4,
      name: 'Grand Bazar',
      description:
        "L'un des plus grands et des plus anciens marchés couverts au monde, avec plus de 4000 boutiques.",
      image: '/assets/images/attractions/grand-bazar.jpg',
    },
    {
      id: 5,
      name: 'Palais de Topkapi',
      description:
        "L'ancienne résidence des sultans ottomans, aujourd'hui un musée présentant des trésors impériaux et des vues panoramiques.",
      image: '/assets/images/attractions/palais-de-topkapi.jpg',
    },
    {
      id: 6,
      name: 'Bosphore',
      description:
        "Le détroit qui sépare l'Europe et l'Asie, offrant des vues pittoresques sur Istanbul.",
      image: '/assets/images/attractions/bosphore.jpg',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <PageHeader
        title="Touristanbul"
        subtitle="Profitez de votre escale à Istanbul avec le programme gratuit de Turkish Airlines"
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <FlightIcon fontSize="large" color="primary" />
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Touristanbul information tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Introduction" icon={<InfoIcon />} iconPosition="start" />
          <Tab label="Éligibilité" icon={<EligibilityIcon />} iconPosition="start" />
          <Tab label="Circuits" icon={<ScheduleIcon />} iconPosition="start" />
          <Tab label="Inscription" icon={<RegistrationIcon />} iconPosition="start" />
          <Tab label="Conseils" icon={<TipsIcon />} iconPosition="start" />
          <Tab label="Galerie" icon={<GalleryIcon />} iconPosition="start" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {/* Introduction Tab */}
          {tabValue === 0 && (
            <Section title="Présentation du Programme">
              <Typography paragraph>
                Touristanbul est un service gratuit exclusif offert par Turkish Airlines aux
                passagers en transit à l'aéroport d'Istanbul avec une escale de 6 à 24 heures. Ce
                programme vous permet de découvrir les principaux sites historiques et culturels
                d'Istanbul, avec transport, repas et guide inclus, le tout sans frais
                supplémentaires.
              </Typography>
              <Typography paragraph>
                Une opportunité exceptionnelle de transformer votre escale en une mini-aventure
                culturelle au carrefour de l'Europe et de l'Asie.
              </Typography>

              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Points clés du programme
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EligibilityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Visite guidée gratuite pour les passagers en transit" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EligibilityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Transport en bus climatisé inclus" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EligibilityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Repas inclus selon l'horaire du circuit" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EligibilityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Guide anglophone (et souvent francophone)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EligibilityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Visite des principaux sites historiques d'Istanbul" />
                  </ListItem>
                </List>
              </Box>
            </Section>
          )}

          {/* Eligibility Tab */}
          {tabValue === 1 && (
            <Section title="Conditions d'Éligibilité">
              <Typography paragraph>
                Pour être éligible au programme Touristanbul, les passagers doivent répondre aux
                critères suivants :
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EligibilityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Escale à l'aéroport d'Istanbul entre 6 et 24 heures" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EligibilityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Voyage international avec Turkish Airlines" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EligibilityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Aucune obligation de visa pour entrer en Turquie" />
                </ListItem>
              </List>
            </Section>
          )}

          {/* Circuits Tab */}
          {tabValue === 2 && (
            <Section title="Circuits Disponibles">
              <Grid container spacing={3}>
                {tourOptions.map(option => (
                  <Grid item xs={12} md={6} key={option.id}>
                    <MuiCard elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {option.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Durée : {option.duration} | Horaire : {option.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Sites visités : {option.sites.join(', ')}
                        </Typography>
                        {option.meal && (
                          <Typography variant="body2" color="text.secondary">
                            Repas : {option.meal}
                          </Typography>
                        )}
                      </CardContent>
                    </MuiCard>
                  </Grid>
                ))}
              </Grid>
            </Section>
          )}

          {/* Registration Tab */}
          {tabValue === 3 && (
            <Section title="Inscription au Programme">
              <Typography paragraph>
                L'inscription au programme Touristanbul se fait directement à l'aéroport d'Istanbul.
                Voici les étapes à suivre :
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <RegistrationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Rendez-vous au comptoir Touristanbul à l'aéroport d'Istanbul" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RegistrationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Présentez votre passeport et billet d'avion" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <RegistrationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Choisissez le circuit qui vous convient" />
                </ListItem>
              </List>
            </Section>
          )}

          {/* Tips Tab */}
          {tabValue === 4 && (
            <Section title="Conseils Pratiques">
              <Typography paragraph>
                Voici quelques conseils pour profiter pleinement de votre expérience Touristanbul :
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <TipsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Portez des chaussures confortables pour les visites" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TipsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Apportez de l'argent liquide pour les souvenirs" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TipsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Respectez les horaires pour éviter les retards" />
                </ListItem>
              </List>
            </Section>
          )}

          {/* Gallery Tab */}
          {tabValue === 5 && (
            <Section title="Galerie d'Images">
              <Grid container spacing={3}>
                {attractions.map(attraction => (
                  <Grid item xs={12} sm={6} md={4} key={attraction.id}>
                    <MuiCard elevation={2}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={attraction.image}
                        alt={attraction.name}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {attraction.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {attraction.description}
                        </Typography>
                      </CardContent>
                    </MuiCard>
                  </Grid>
                ))}
              </Grid>
            </Section>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default TouristanbulPage;
