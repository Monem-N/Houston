import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import { PageHeader } from '../../components/common';

const TouristanbulPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Touristanbul"
        subtitle="Explore Istanbul during your layover with Turkish Airlines' free tour program"
      />
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          What is Touristanbul?
        </Typography>
        <Typography paragraph>
          Touristanbul is a complimentary service offered by Turkish Airlines that allows international 
          transit passengers to tour Istanbul during their layover. Instead of waiting at the airport, 
          you can explore the highlights of Istanbul with a guided tour, completely free of charge.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Eligibility
          </Typography>
          <Typography paragraph>
            To be eligible for Touristanbul:
          </Typography>
          <ul>
            <li>You must be an international transit passenger flying with Turkish Airlines</li>
            <li>Your layover in Istanbul must be between 6 and 24 hours</li>
            <li>You must be eligible to enter Turkey (check visa requirements)</li>
          </ul>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Tour Options
          </Typography>
          <Typography paragraph>
            Turkish Airlines offers several tour options depending on your layover duration:
          </Typography>
          <ul>
            <li><strong>Short Tours (6-9 hours layover):</strong> Visit key attractions like the Blue Mosque and Hagia Sophia</li>
            <li><strong>Medium Tours (9-12 hours layover):</strong> More comprehensive tours including the Grand Bazaar</li>
            <li><strong>Long Tours (12+ hours layover):</strong> Extended tours covering more attractions</li>
          </ul>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              How to Book
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography paragraph>
              To participate in Touristanbul:
            </Typography>
            <ol>
              <li>Check your eligibility based on your layover time</li>
              <li>Visit the Hotel Desk in the International Arrivals Terminal at Istanbul Airport</li>
              <li>Register for the tour at least 30 minutes before the departure time</li>
              <li>Tours are available on a first-come, first-served basis</li>
            </ol>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Note: It's recommended to check the current status of the Touristanbul program before your trip, 
              as availability and schedules may change.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              What's Included
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography paragraph>
              The Touristanbul service includes:
            </Typography>
            <ul>
              <li>Guided tour of Istanbul's highlights</li>
              <li>Transportation to and from the airport</li>
              <li>Meals (depending on the tour)</li>
              <li>Museum entrance fees</li>
            </ul>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              You should bring:
            </Typography>
            <ul>
              <li>Your passport and boarding pass</li>
              <li>Comfortable walking shoes</li>
              <li>Weather-appropriate clothing</li>
              <li>Camera</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Istanbul Highlights
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Blue Mosque (Sultan Ahmed Mosque)
            </Typography>
            <Typography paragraph>
              Famous for its blue tiles and six minarets, this historic mosque is one of Istanbul's most iconic landmarks.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Hagia Sophia
            </Typography>
            <Typography paragraph>
              Originally a Byzantine church, later a mosque, and now a museum, Hagia Sophia is renowned for its massive dome and stunning architecture.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Grand Bazaar
            </Typography>
            <Typography paragraph>
              One of the world's oldest and largest covered markets, with over 4,000 shops selling everything from spices to jewelry.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TouristanbulPage;
