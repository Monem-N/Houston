import { useState, useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Box, Grid, Alert } from '@mui/material';
import { Map as MapIcon } from '@mui/icons-material';
import ReduxLocationCard from '../components/common/LocationCard/ReduxLocationCard';
import { PageHeader, Section } from '../components/common';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import ReactGoogleMap from '../components/maps/ReactGoogleMap';
import { Location } from '../components/maps/types';
import { useAppSelector } from '../redux/hooks';
import { selectFavorites } from '../redux/store';

const FavoritesPage: FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useDeviceDetect();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const favoriteLocations = useAppSelector(selectFavorites);

  // Map FavoriteItem to Location
  const mappedLocations: Location[] = favoriteLocations.map(favorite => ({
    ...favorite,
    position: favorite.position || { lat: 0, lng: 0 }, // Default position
    category: favorite.category || 'Unknown', // Default category
  }));

  // Memoize selected location to avoid unnecessary re-renders
  const memoizedSelectedLocation = useMemo(() => selectedLocation, [selectedLocation]);

  // Handle getting directions to a location
  const getDirections = (location: Location) => {
    const destination = location.address
      ? encodeURIComponent(location.address)
      : location.position?.lat && location.position?.lng
        ? `${location.position.lat},${location.position.lng}`
        : null;

    if (destination) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
    } else {
      console.error('No valid destination for the selected location.');
    }
  };

  // Handle selecting a location to show on the map
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <Container maxWidth="lg">
      <PageHeader
        title={t('favorites.title', 'Favorite Locations')}
        subtitle={t('favorites.subtitle', 'Your saved locations in Houston')}
        data-testid="favorites-page-title"
      />

      {mappedLocations.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          {t('favorites.noFavorites', "You haven't added any favorite locations yet. Browse the map or search for locations to add them to your favorites.")}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {/* Favorites List */}
          <Grid item xs={12} md={6}>
            <Section title={t('favorites.yourFavorites', 'Your Favorites')} titleIcon={<MapIcon color="primary" />}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mappedLocations.map(location => (
                  <ReduxLocationCard
                    key={location.id}
                    location={location}
                    onClick={handleSelectLocation}
                    onGetDirections={getDirections}
                    selected={memoizedSelectedLocation?.id === location.id}
                  />
                ))}
              </Box>
            </Section>
          </Grid>

          {/* Map */}
          <Grid item xs={12} md={6}>
            <Section title={t('favorites.mapView', 'Map View')} titleIcon={<MapIcon color="primary" />}>
              <ReactGoogleMap
                locations={memoizedSelectedLocation ? [memoizedSelectedLocation] : mappedLocations}
                height={isMobile ? 400 : 600}
                mapId="af8bf941f1e27c9d"
                zoom={memoizedSelectedLocation ? 15 : 11}
                center={memoizedSelectedLocation?.position}
                useCustomIcons={true}
              />
            </Section>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;
