import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Box,
  Container,
  Grid,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Info as InfoIcon,
  EmojiEvents as TrophyIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import { Card, PageHeader, Section } from '../components/common';

const FirstChampionshipPage: React.FC = () => {
  const { t } = useTranslation();
  // Event schedule data
  const schedule = [
    {
      day: 'Wednesday, April 16',
      events: [
        {
          time: '8:00 AM - 5:00 PM',
          name: 'Team Check-in',
          location: 'George R. Brown Convention Center',
        },
        {
          time: '9:00 AM - 5:00 PM',
          name: 'Pits Open for Setup',
          location: 'George R. Brown Convention Center',
        },
        { time: '1:00 PM - 5:00 PM', name: 'Practice Matches', location: 'Various Fields' },
      ],
    },
    {
      day: 'Thursday, April 17',
      events: [
        { time: '8:00 AM - 6:00 PM', name: 'Qualification Matches', location: 'Various Fields' },
        { time: '10:00 AM - 4:00 PM', name: 'Innovation Faire', location: 'Exhibit Hall A' },
        { time: '2:00 PM - 4:00 PM', name: 'Workshops', location: 'Meeting Rooms' },
      ],
    },
    {
      day: 'Friday, April 18',
      events: [
        { time: '8:00 AM - 6:00 PM', name: 'Qualification Matches', location: 'Various Fields' },
        { time: '10:00 AM - 4:00 PM', name: 'Innovation Faire', location: 'Exhibit Hall A' },
        { time: '7:00 PM - 9:00 PM', name: 'Special Event', location: 'Main Arena' },
      ],
    },
    {
      day: 'Saturday, April 19',
      events: [
        { time: '8:00 AM - 12:00 PM', name: 'Alliance Selections', location: 'Various Fields' },
        { time: '1:00 PM - 5:00 PM', name: 'Playoff Matches', location: 'Various Fields' },
        { time: '6:00 PM - 8:00 PM', name: 'Awards Ceremony', location: 'Main Arena' },
      ],
    },
  ];

  // Venue information
  const venues = [
    {
      name: 'George R. Brown Convention Center',
      address: '1001 Avenida de las Americas, Houston, TX 77010',
      description:
        'Main venue for the FIRST Championship, hosting competitions, pits, and exhibits.',
    },
    {
      name: 'Minute Maid Park',
      address: '501 Crawford St, Houston, TX 77002',
      description: 'Home of the Houston Astros, hosting special events and ceremonies.',
    },
    {
      name: 'Discovery Green',
      address: '1500 McKinney St, Houston, TX 77010',
      description: 'Urban park adjacent to the convention center, hosting outdoor activities.',
    },
  ];

  return (
    <Container maxWidth="lg">
      <PageHeader
        title={t('firstChampionship.title', 'FIRST Championship 2025')}
        subtitle={t('firstChampionship.subtitle', 'Everything you need to know about the FIRST Championship event in Houston, April 16-19, 2025.')}
        data-testid="page-title"
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Section
            title={t('firstChampionship.eventOverview', 'Event Overview')}
            titleIcon={<EventIcon color="primary" />}
            divider
            sx={{ mb: 4 }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" paragraph>
                {t('firstChampionship.overview.paragraph1', 'The FIRST Championship is the culmination of the FIRST Robotics Competition season, bringing together teams from around the world to compete and celebrate STEM education.')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('firstChampionship.overview.paragraph2', 'The 2025 Championship in Houston will feature competitions across all FIRST programs: FIRST LEGO League Jr., FIRST LEGO League, FIRST Tech Challenge, and FIRST Robotics Competition.')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip icon={<LocationIcon />} label={t('firstChampionship.location', 'Houston, TX')} />
              <Chip icon={<ScheduleIcon />} label={t('firstChampionship.dates', 'April 16-19, 2025')} />
              <Chip icon={<TeamIcon />} label={t('firstChampionship.teams', '600+ Teams')} />
              <Chip icon={<TrophyIcon />} label={t('firstChampionship.championship', 'World Championship')} />
            </Box>
          </Section>

          <Section
            title={t('firstChampionship.schedule.title', 'Event Schedule')}
            titleIcon={<ScheduleIcon color="primary" />}
            divider
            sx={{ mb: 4 }}
          >
            {schedule.map((day, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {day.day}
                </Typography>
                <List dense>
                  {day.events.map((event, eventIndex) => (
                    <ListItem key={eventIndex}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={event.name}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {event.time}
                            </Typography>
                            {` — ${event.location}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                {index < schedule.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </Section>
        </Grid>

        <Grid item xs={12} md={4}>
          <Section
            title={t('firstChampionship.venues.title', 'Venues')}
            titleIcon={<LocationIcon color="primary" />}
            divider
            sx={{ mb: 4 }}
          >
            {venues.map((venue, index) => (
              <Card key={index} title={venue.name} description={venue.description} sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {venue.address}
                </Typography>
              </Card>
            ))}
          </Section>

          <Section title={t('firstChampionship.importantInfo', 'Important Information')} titleIcon={<InfoIcon color="primary" />} divider>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Registration opens January 15, 2025" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Team load-in begins April 15, 2025" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Pit areas close at 8:00 PM daily" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Safety glasses required in all pit and field areas" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Event is open to the public with free admission" />
              </ListItem>
            </List>
          </Section>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FirstChampionshipPage;
