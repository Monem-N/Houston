import { useTranslation } from 'react-i18next';
import { Container, Typography, Paper } from '@mui/material';
import { PageHeader } from '../components/common';

export default function MuseumDistrictPage() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg">
      <PageHeader
        title={t('guides.museumDistrict.title')}
        subtitle={t('guides.museumDistrict.subtitle')}
      />
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography paragraph>{t('guides.museumDistrict.description')}</Typography>
      </Paper>
    </Container>
  );
}
