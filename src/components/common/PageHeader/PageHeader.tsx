import React from 'react';
import { useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { Typography, Box, Breadcrumbs, Link, BoxProps, SxProps, Theme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface PageHeaderProps extends BoxProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  action,
  titleSx,
  subtitleSx,
  ...props
}) => {
  const { isMobile } = useDeviceDetect();
  return (
    <Box {...props} sx={{ mb: isMobile ? 3 : 4, ...props.sx }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: isMobile ? 1.5 : 2 }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return isLast ? (
              <Typography key={item.label} color="text.primary">
                {item.label}
              </Typography>
            ) : (
              <Link
                key={item.label}
                component={RouterLink}
                to={item.path || '#'}
                color="inherit"
                underline="hover"
              >
                {item.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center'
      }}>
        <Box>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            gutterBottom
            data-testid="page-title"
            sx={titleSx}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              color="text.secondary"
              paragraph
              sx={subtitleSx}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {action && <Box sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 2 : 0 }}>{action}</Box>}
      </Box>
    </Box>
  );
};

export default PageHeader;
