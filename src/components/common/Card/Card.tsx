import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';

export interface CardProps extends MuiCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageHeight?: number;
  children?: React.ReactNode;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imageHeight = 200,
  children,
  action,
  ...props
}) => {
  return (
    <MuiCard
      {...props}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', ...props.sx }}
    >
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt || title || 'Card image'}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        {title && (
          <Typography variant="h6" component="h3" gutterBottom>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
        )}
        {children}
        {action && <Box sx={{ mt: 2 }}>{action}</Box>}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
