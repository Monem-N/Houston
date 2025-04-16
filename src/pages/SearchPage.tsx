import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import { Map as MapIcon, List as ListIcon } from '@mui/icons-material';
import { PageHeader, Section } from '../components/common';
import { Location } from '../components/maps/types';
import ReactGoogleMap from '../components/maps/ReactGoogleMap';
import SearchBar from '../components/maps/SearchBar/SearchBar';
import SearchResults from '../components/maps/SearchResults/SearchResults';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { locations as allLocations } from '../data/locations';
import { useAppDispatch } from '../store/hooks';
import { addFavorite } from '../redux/store';

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const { isMobile } = useDeviceDetect();
  // We track the search query in state but don't need to access it directly
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(allLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>(isMobile ? 'list' : 'map');
  const [activeCategories, setActiveCategories] = useState<{ [key: string]: boolean }>({});
  const dispatch = useAppDispatch();

  // Get unique categories from locations
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allLocations.forEach(location => uniqueCategories.add(location.category));
    return Array.from(uniqueCategories);
  }, []);

  // Initialize active categories
  useMemo(() => {
    const initialCategories: { [key: string]: boolean } = {};
    categories.forEach(category => {
      initialCategories[category] = true;
    });
    setActiveCategories(initialCategories);
  }, [categories]);

  // Handle search
  const handleSearch = useCallback((query: string, results: Location[]) => {
    setSearchQuery(query);
    setFilteredLocations(results);
  }, []);

  // Handle category toggle
  const handleCategoryToggle = useCallback((category: string) => {
    setActiveCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  // Handle result click
  const handleResultClick = useCallback(
    (location: Location) => {
      setSelectedLocation(location);
      if (isMobile) {
        setViewMode('map');
      }
    },
    [isMobile]
  );

  // Handle adding a location to favorites
  const handleAddToFavorites = useCallback(
    (location: Location) => {
      dispatch(addFavorite(location));
    },
    [dispatch]
  );

  // Get directions to a location
  const getDirections = useCallback((location: Location) => {
    if (location.address) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          location.address
        )}`,
        '_blank'
      );
    } else if (location.position) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${location.position.lat},${location.position.lng}`,
        '_blank'
      );
    }
  }, []);

  // Get icon based on location category
  const getMarkerIcon = (category: string) => {
    const iconStyle = { fontSize: '24px' };

    switch (category) {
      case 'attraction':
        return <MapIcon style={{ ...iconStyle, color: '#FF5722' }} />;
      case 'restaurant':
        return <MapIcon style={{ ...iconStyle, color: '#F44336' }} />;
      case 'shopping':
        return <MapIcon style={{ ...iconStyle, color: '#2196F3' }} />;
      case 'hotel':
        return <MapIcon style={{ ...iconStyle, color: '#3F51B5' }} />;
      case 'transport':
        return <MapIcon style={{ ...iconStyle, color: '#009688' }} />;
      case 'venue':
        return <MapIcon style={{ ...iconStyle, color: '#FFC107' }} />;
      default:
        return <MapIcon style={{ ...iconStyle, color: '#757575' }} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pb: isMobile ? 8 : 0 }}>
      <PageHeader
        title={t('search.title', 'Search')}
        subtitle={t('search.subtitle', 'Find locations in Houston for the FIRST Championship 2025')}
      />

      <SearchBar
        locations={allLocations}
        categories={categories}
        activeCategories={activeCategories}
        onSearch={handleSearch}
        onCategoryToggle={handleCategoryToggle}
        getMarkerIcon={getMarkerIcon}
      />

      {isMobile && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={viewMode === 'list' ? 'contained' : 'outlined'}
            startIcon={<ListIcon />}
            onClick={() => setViewMode('list')}
            sx={{ mr: 1 }}
          >
            {t('search.list', 'List')}
          </Button>
          <Button
            variant={viewMode === 'map' ? 'contained' : 'outlined'}
            startIcon={<MapIcon />}
            onClick={() => setViewMode('map')}
          >
            {t('search.map', 'Map')}
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {/* Search Results */}
        {(!isMobile || viewMode === 'list') && (
          <Grid item xs={12} md={4}>
            <Section title={t('search.results', 'Results')} titleIcon={<ListIcon color="primary" />}>
              <SearchResults
                results={filteredLocations}
                onResultClick={handleResultClick}
                onGetDirections={getDirections}
                onAddToFavorites={handleAddToFavorites} // Pass the handler
                getMarkerIcon={getMarkerIcon}
                maxHeight={isMobile ? '60vh' : '70vh'}
              />
            </Section>
          </Grid>
        )}

        {/* Map */}
        {(!isMobile || viewMode === 'map') && (
          <Grid item xs={12} md={8}>
            <Section title={t('search.map', 'Map')} titleIcon={<MapIcon color="primary" />}>
              <ReactGoogleMap
                locations={filteredLocations}
                height={isMobile ? '60vh' : '70vh'}
                mapId="af8bf941f1e27c9d"
                zoom={11}
                useCustomIcons={true}
              />
              {selectedLocation && isMobile && (
                <Box
                  sx={{
                    position: 'fixed',
                    bottom: 60,
                    left: 0,
                    right: 0,
                    bgcolor: 'background.paper',
                    p: 2,
                    boxShadow: 3,
                    zIndex: 1000,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                >
                  <Typography variant="subtitle1">{selectedLocation.name}</Typography>
                  <Button
                    size="small"
                    startIcon={<ListIcon />}
                    onClick={() => setViewMode('list')}
                    sx={{ mr: 1 }}
                  >
                    {t('search.backToList', 'Back to List')}
                  </Button>
                  <Button
                    size="small"
                    startIcon={<MapIcon />}
                    onClick={() => getDirections(selectedLocation)}
                  >
                    {t('search.directions', 'Directions')}
                  </Button>
                </Box>
              )}
            </Section>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SearchPage;
