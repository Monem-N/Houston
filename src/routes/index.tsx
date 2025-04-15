import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import MainLayout from '../layouts/MainLayout';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/HomePage'));
const MapsPage = lazy(() => import('../pages/MapsPage'));
const DiningPage = lazy(() => import('../pages/DiningPage'));
const AttractionsPage = lazy(() => import('../pages/AttractionsPage'));
const FirstChampionshipPage = lazy(() => import('../pages/FirstChampionshipPage'));
const ItinerariesPage = lazy(() => import('../pages/ItinerariesPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Loading component
const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="maps" element={<MapsPage />} />
          <Route path="dining" element={<DiningPage />} />
          <Route path="attractions" element={<AttractionsPage />} />
          <Route path="first-championship" element={<FirstChampionshipPage />} />
          <Route path="itineraries" element={<ItinerariesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
