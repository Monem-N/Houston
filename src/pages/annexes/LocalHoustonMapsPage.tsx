import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { PageHeader } from '../../components/common';

const LocalHoustonMapsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Local Houston Maps"
        subtitle="Maps of key areas in Houston for your visit"
      />
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Houston Neighborhoods
        </Typography>
        <Typography paragraph>
          Houston is a diverse city with many distinct neighborhoods. This page provides maps of key areas 
          you might visit during your stay for the FIRST Championship.
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Downtown Houston
          </Typography>
          <Typography paragraph>
            Downtown Houston is home to the George R. Brown Convention Center, Discovery Green, 
            Minute Maid Park, and many restaurants and hotels. This is where most of the FIRST Championship 
            activities will take place.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Texas Medical Center
          </Typography>
          <Typography paragraph>
            The Texas Medical Center is the largest medical complex in the world. It's located near 
            the Museum District and Hermann Park, and is close to the Crowne Plaza hotel where many 
            participants will be staying.
          </Typography>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Museum District
          </Typography>
          <Typography paragraph>
            Houston's Museum District includes 19 museums within a 1.5-mile radius. This area is 
            easily accessible by METRORail and is a great place to visit during your free time.
          </Typography>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Walking Maps
            </Typography>
            <Typography paragraph>
              Walking is a great way to explore certain areas of Houston:
            </Typography>
            <ul>
              <li>Downtown: Many attractions are within walking distance of the convention center</li>
              <li>Museum District: The museums are clustered together for easy walking</li>
              <li>Hermann Park: A beautiful park with walking paths and attractions</li>
            </ul>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Driving Maps
            </Typography>
            <Typography paragraph>
              If you're renting a car or using ride-sharing services, here are some key driving routes:
            </Typography>
            <ul>
              <li>Airport to Downtown: Approximately 20-30 minutes from George Bush Intercontinental Airport</li>
              <li>Downtown to Medical Center: About 15 minutes via US-59 S</li>
              <li>Medical Center to Space Center Houston: Approximately 45 minutes via I-45 S</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LocalHoustonMapsPage;
