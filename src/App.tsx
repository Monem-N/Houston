import { useEffect } from 'react';
import { Box, Typography, Alert, List, ListItem } from '@mui/material';
import AppRoutes from './routes';
import { validateEnv } from './utils/env';

function App() {
  // Validate environment variables
  const { valid, missing } = validateEnv();

  const requiredEnvVars = ['VITE_GOOGLE_MAPS_API_KEY', 'VITE_SENTRY_DSN'];
  const missingEnvVars = requiredEnvVars.filter(key => !import.meta.env[key]);

  if (missingEnvVars.length > 0) {
    console.error('Missing environment variables:', missingEnvVars);
  } else {
    console.log('All required environment variables are set.');
  }

  useEffect(() => {
    console.log('App component mounted');
    console.log('Environment variables valid:', valid);
    console.log('Missing environment variables:', missing);

    if (!valid) {
      console.error('Environment variables not valid');
    }
  }, [valid, missing]);

  // If environment variables are missing, show an error
  if (!valid) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          p: 3,
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          Missing environment variables
        </Alert>
        <Typography variant="body1" gutterBottom>
          The following environment variables are required but missing:
        </Typography>
        <List sx={{ width: '100%' }}>
          {missing.map(name => (
            <ListItem key={name}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                {name}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Please check your .env file and make sure all required variables are set.
        </Typography>
      </Box>
    );
  }

  return <AppRoutes />;
}

export default App;
