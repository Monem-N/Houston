import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SentimentDissatisfied as SadIcon } from '@mui/icons-material';
import { Card } from '../components/common';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="md">
      <Card
        title={t('notFound.title', '404 - Page Not Found')}
        description={t('notFound.description', 'The page you are looking for does not exist or has been moved. Please check the URL or navigate back to the home page.')}
        action={
          <Button variant="contained" color="primary" component={RouterLink} to="/" size="large">
            {t('notFound.returnHome', 'Return to Home')}
          </Button>
        }
        sx={{ p: 4, borderRadius: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <SadIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
        </Box>
      </Card>
    </Container>
  );
};

export default NotFoundPage;
