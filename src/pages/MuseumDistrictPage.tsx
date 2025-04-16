import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

export default function MuseumDistrictPage() {
  const { t } = useTranslation('guides');
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('museumDistrict.title')}
      </Typography>
      <Typography paragraph>{t('museumDistrict.subtitle')}</Typography>
      <Typography paragraph>{t('museumDistrict.description')}</Typography>
    </Box>
  );
}
