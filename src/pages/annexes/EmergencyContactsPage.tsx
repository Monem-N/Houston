import * as React from 'react';
import { Container, Typography, Paper, Grid, Box, Divider, Link } from '@mui/material';
import { PageHeader } from '../../components/common';
import {
  Phone as PhoneIcon,
  LocalHospital as HospitalIcon,
  Policy as PoliceIcon,
} from '@mui/icons-material';

const EmergencyContactsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Emergency Contacts"
        subtitle="Important contacts and information for emergencies during your stay in Houston"
      />

      <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: '#f8d7da', color: '#721c24' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Emergency: 911
          </Typography>
        </Box>
        <Typography>
          In case of emergency (police, fire, or medical), dial 911 from any phone. This number is
          free and works from all phones, including cell phones without service.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HospitalIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" gutterBottom>
                Medical Services
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="h6" gutterBottom>
              Nearby Hospitals
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography fontWeight="bold">Houston Methodist Hospital</Typography>
              <Typography>6565 Fannin St, Houston, TX 77030</Typography>
              <Typography>Phone: (713) 790-3311</Typography>
              <Link href="https://www.houstonmethodist.org" target="_blank" rel="noopener">
                Website
              </Link>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography fontWeight="bold">Memorial Hermann-Texas Medical Center</Typography>
              <Typography>6411 Fannin St, Houston, TX 77030</Typography>
              <Typography>Phone: (713) 704-4000</Typography>
              <Link href="https://www.memorialhermann.org" target="_blank" rel="noopener">
                Website
              </Link>
            </Box>

            <Typography variant="h6" gutterBottom>
              Urgent Care Centers
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography fontWeight="bold">NextLevel Urgent Care - Medical Center</Typography>
              <Typography>2101 Crawford St, Houston, TX 77002</Typography>
              <Typography>Phone: (281) 783-8162</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PoliceIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" gutterBottom>
                Police & Security
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="h6" gutterBottom>
              Police Departments
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography fontWeight="bold">Houston Police Department (Non-Emergency)</Typography>
              <Typography>Phone: (713) 884-3131</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography fontWeight="bold">Downtown Police Station</Typography>
              <Typography>1900 Rusk St, Houston, TX 77010</Typography>
              <Typography>Phone: (713) 247-4400</Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              FIRST Championship Security
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography>
                Security personnel will be stationed throughout the George R. Brown Convention
                Center during the FIRST Championship. Look for staff wearing security badges or
                uniforms if you need assistance.
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Hotel Security
            </Typography>
            <Box>
              <Typography>
                The Crowne Plaza Houston Med-Ctr Galleria Area has 24-hour security. Contact the
                front desk for any security concerns during your stay.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Important Travel Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              U.S. Embassy in France
            </Typography>
            <Typography>2 Avenue Gabriel, 75008 Paris, France</Typography>
            <Typography>Phone: +33 1 43 12 22 22</Typography>
            <Typography>Emergency: +33 1 43 12 22 22 (after hours)</Typography>
            <Link href="https://fr.usembassy.gov/" target="_blank" rel="noopener">
              Website
            </Link>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Lost Passport
            </Typography>
            <Typography paragraph>
              If you lose your passport, contact the nearest U.S. Embassy or Consulate immediately.
              For French citizens, contact the French Consulate in Houston:
            </Typography>
            <Typography>777 Post Oak Blvd, Suite 600, Houston, TX 77056</Typography>
            <Typography>Phone: (346) 272-5363</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EmergencyContactsPage;
