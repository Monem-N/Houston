import * as React from 'react';
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/analytics';
import { Box, CircularProgress } from '@mui/material';
import { Layout } from './components/layout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const MapsPage = lazy(() => import('./pages/MapsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const IntroductionPage = lazy(() => import('./pages/IntroductionPage'));
const AttractionsPage = lazy(() => import('./pages/AttractionsPage'));
const DiningPage = lazy(() => import('./pages/DiningPage'));
const ShoppingPage = lazy(() => import('./pages/ShoppingPage'));
const SafetyLogisticsPage = lazy(() => import('./pages/SafetyLogisticsPage'));
const FirstChampionshipPage = lazy(() => import('./pages/FirstChampionshipPage'));
const ArrivalDeparturePage = lazy(() => import('./pages/ArrivalDeparturePage'));
const HermannParkZooPage = lazy(() => import('./pages/HermannParkZooPage'));
const MuseumDistrictPage = lazy(() => import('./pages/MuseumDistrictPage'));
const SpaceCenterKemahPage = lazy(() => import('./pages/SpaceCenterKemahPage'));
// Import annexes pages with explicit file extension
const TransportMapsPage = lazy(() => import('./pages/annexes/TransportMapsPage.tsx'));
const LocalHoustonMapsPage = lazy(() => import('./pages/annexes/LocalHoustonMapsPage.tsx'));
const EmergencyContactsPage = lazy(() => import('./pages/annexes/EmergencyContactsPage.tsx'));
const TouristanbulPage = lazy(() => import('./pages/annexes/TouristanbulPage.tsx'));
const LocalDiningShoppingPage = lazy(() => import('./pages/annexes/LocalDiningShoppingPage.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
// Removed DirectMapsPage
// Removed VeryBasicMapPage
// Removed IframeMapPage
// Removed NewMapPage
// Removed ReactGoogleMapPage

// Placeholder for pages that haven't been created yet
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </Box>
);

// Loading component for suspense fallback
const LoadingPage: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const AppRoutes: React.FC = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  return (
    <Layout>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/introduction" element={<IntroductionPage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/first-championship" element={<FirstChampionshipPage />} />

          {/* Guides ajoutés */}
          <Route path="/guides/arrival-departure" element={<ArrivalDeparturePage />} />
          <Route path="/guides/hermann-park-zoo" element={<HermannParkZooPage />} />
          <Route path="/guides/museum-district" element={<MuseumDistrictPage />} />
          <Route path="/guides/space-center-kemah" element={<SpaceCenterKemahPage />} />

          {/* Pages à implémenter */}
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/safety-logistics" element={<SafetyLogisticsPage />} />

          {/* Annexes Pages */}
          <Route path="/annexes/transport-maps" element={<TransportMapsPage />} />
          <Route path="/annexes/local-houston-maps" element={<LocalHoustonMapsPage />} />
          <Route path="/annexes/emergency-contacts" element={<EmergencyContactsPage />} />
          <Route path="/annexes/touristanbul" element={<TouristanbulPage />} />
          <Route path="/annexes/local-dining-shopping" element={<LocalDiningShoppingPage />} />

          {/* Additional Pages */}
          <Route path="/itineraries" element={<PlaceholderPage title="Itineraries" />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRoutes;
