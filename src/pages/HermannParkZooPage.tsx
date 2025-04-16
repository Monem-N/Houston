import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

export default function HermannParkZooPage() {
  const { t } = useTranslation('guides');
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('hermannPark.title')}
      </Typography>
      <Typography paragraph>{t('hermannPark.description')}</Typography>
    </Box>
  );
}
