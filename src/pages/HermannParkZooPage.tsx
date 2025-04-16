import { useTranslation } from 'react-i18next';
import { Typography, Container, Paper } from '@mui/material';
import { PageHeader } from '../components/common';

export default function HermannParkZooPage() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <PageHeader
        title={t('guides.hermannPark.title')}
        subtitle={t('guides.hermannPark.subtitle')}
      />
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography paragraph>{t('guides.hermannPark.description')}</Typography>
      </Paper>
    </Container>
  );
}
