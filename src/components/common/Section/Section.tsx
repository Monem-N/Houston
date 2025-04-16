import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { Box, Typography, Divider, BoxProps, SxProps, Theme } from '@mui/material';

export interface SectionProps extends BoxProps {
  title?: string;
  subtitle?: string;
  titleIcon?: React.ReactNode;
  divider?: boolean;
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  titleIcon,
  divider = false,
  children,
  titleSx,
  subtitleSx,
  contentSx,
  ...props
}) => {
  const { t } = useTranslation();
  const { isMobile } = useDeviceDetect();
  return (
    <Box component="section" {...props} sx={{ mb: isMobile ? 3 : 4, ...props.sx }}>
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 1.5 : 2 }}>
          {titleIcon && <Box sx={{ mr: 1 }}>{titleIcon}</Box>}
          <Typography variant={isMobile ? 'h6' : 'h5'} component="h2" sx={titleSx}>
            {t(title, title)}
          </Typography>
        </Box>
      )}

      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary" paragraph sx={subtitleSx}>
          {t(subtitle, subtitle)}
        </Typography>
      )}

      {divider && <Divider sx={{ mb: isMobile ? 1.5 : 2 }} />}

      <Box sx={contentSx}>{children}</Box>
    </Box>
  );
};

export default Section;
