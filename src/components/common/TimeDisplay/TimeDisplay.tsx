import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';

const TimeDisplay: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [tunisTime, setTunisTime] = useState<string>('');
  const [houstonTime, setHoustonTime] = useState<string>('');

  useEffect(() => {
    // Function to update times
    const updateTimes = () => {
      // Tunis time (UTC+1)
      const tunisDate = new Date();
      // Houston time (UTC-6 or UTC-5 depending on daylight saving)
      const houstonDate = new Date();

      // Format the times
      const tunisTimeStr = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Africa/Tunis',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(tunisDate);

      const houstonTimeStr = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(houstonDate);

      setTunisTime(tunisTimeStr);
      setHoustonTime(houstonTimeStr);
    };

    // Update times immediately
    updateTimes();

    // Update times every minute
    const intervalId = setInterval(updateTimes, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 0.5,
        mb: 0.5,
        px: 2,
        borderRadius: 1,
        backgroundColor: theme.palette.primary.main + '10',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
        <Typography variant="caption" color="textSecondary">
          {t('timeDisplay.currentTime')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="caption" sx={{ mr: 2 }}>
          <strong>{t('timeDisplay.tunis')}:</strong> {tunisTime}
        </Typography>
        <Typography variant="caption">
          <strong>{t('timeDisplay.houston')}:</strong> {houstonTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeDisplay;
