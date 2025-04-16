import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { PageHeader } from '../../components/common';

const TransportMapsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Transport Maps"
        subtitle="Maps and information about transportation in Houston"
      />
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Houston Transportation System
        </Typography>
        <Typography paragraph>
          Houston has various transportation options including buses, light rail, and ride-sharing services.
          This page provides maps and information to help you navigate the city during your stay.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Metro Rail System
          </Typography>
          <Typography paragraph>
            The METRORail is a convenient way to travel to downtown Houston, the Museum District, 
            and the Texas Medical Center. The Red Line runs from Northline Transit Center through 
            downtown to the Texas Medical Center and NRG Park.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Bus Routes
          </Typography>
          <Typography paragraph>
            METRO offers extensive bus service throughout Houston. The system includes local routes, 
            Park & Ride routes, and express routes.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Ride-Sharing Services
          </Typography>
          <Typography paragraph>
            Uber and Lyft operate throughout Houston and provide convenient door-to-door service.
          </Typography>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Getting to the Convention Center
            </Typography>
            <Typography paragraph>
              The George R. Brown Convention Center is located in downtown Houston and is accessible 
              by various transportation options:
            </Typography>
            <ul>
              <li>METRORail: Take the Green or Purple Line to the Convention District Station</li>
              <li>Bus: Several bus routes stop near the convention center</li>
              <li>Ride-sharing: Uber and Lyft can drop you off directly at the convention center</li>
            </ul>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Getting to the Hotel
            </Typography>
            <Typography paragraph>
              The Crowne Plaza Houston Med-Ctr Galleria Area is located near the Texas Medical Center:
            </Typography>
            <ul>
              <li>METRORail: Take the Red Line to the TMC Transit Center, then take a short ride-share</li>
              <li>Bus: Routes 4 and 65 stop near the hotel</li>
              <li>Ride-sharing: Approximately 15-20 minutes from downtown</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransportMapsPage;
