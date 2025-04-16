import { lazy, Suspense, type ComponentType } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import MainLayout from '../layouts/MainLayout';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/HomePage'));
const MapsPage = lazy(() => import('../pages/MapsPage'));
const DiningPage = lazy(() =>
  import('../pages/DiningPage').then(module => ({ default: module.default as ComponentType }))
);
const AttractionsPage = lazy(() =>
  import('../pages/AttractionsPage').then(module => ({ default: module.default as ComponentType }))
);
const FirstChampionshipPage = lazy(() =>
  import('../pages/FirstChampionshipPage').then(module => ({
    default: module.default as ComponentType,
  }))
);
const ItinerariesPage = lazy(() =>
  import('../pages/ItinerariesPage').then(module => ({ default: module.default as ComponentType }))
);
const ArrivalDeparturePage = lazy(() =>
  import('../pages/ArrivalDeparturePage').then(module => ({
    default: module.default as ComponentType,
  }))
);
const HermannParkZooPage = lazy(() =>
  import('../pages/HermannParkZooPage').then(module => ({
    default: module.default as ComponentType,
  }))
);
const MuseumDistrictPage = lazy(() =>
  import('../pages/MuseumDistrictPage').then(module => ({
    default: module.default as ComponentType,
  }))
);
const SpaceCenterKemahPage = lazy(() =>
  import('../pages/SpaceCenterKemahPage').then(module => ({
    default: module.default as ComponentType,
  }))
);
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const ShoppingPage = lazy(() =>
  import('../pages/ShoppingPage').then(module => ({ default: module.default as ComponentType }))
);
const IntroductionPage = lazy(() =>
  import('../pages/IntroductionPage').then(module => ({ default: module.default as ComponentType }))
);
const SafetyLogisticsPage = lazy(() =>
  import('../pages/SafetyLogisticsPage').then(module => ({ default: module.default as ComponentType }))
);
const TransportMapsPage = lazy(() =>
  import('../pages/annexes/TransportMapsPage').then(module => ({ default: module.default as ComponentType }))
);
const LocalHoustonMapsPage = lazy(() =>
  import('../pages/annexes/LocalHoustonMapsPage').then(module => ({ default: module.default as ComponentType }))
);
const EmergencyContactsPage = lazy(() =>
  import('../pages/annexes/EmergencyContactsPage').then(module => ({ default: module.default as ComponentType }))
);
const TouristanbulPage = lazy(() =>
  import('../pages/annexes/TouristanbulPage').then(module => ({ default: module.default as ComponentType }))
);
const LocalDiningShoppingPage = lazy(() =>
  import('../pages/annexes/LocalDiningShoppingPage').then(module => ({ default: module.default as ComponentType }))
);

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
          <Route path="shopping" element={<ShoppingPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="first-championship" element={<FirstChampionshipPage />} />
          <Route path="itineraries" element={<ItinerariesPage />} />
          <Route path="introduction" element={<IntroductionPage />} />
          <Route path="safety-logistics" element={<SafetyLogisticsPage />} />
          <Route path="guides/arrival-departure" element={<ArrivalDeparturePage />} />
          <Route path="guides/hermann-park-zoo" element={<HermannParkZooPage />} />
          <Route path="guides/museum-district" element={<MuseumDistrictPage />} />
          <Route path="guides/space-center-kemah" element={<SpaceCenterKemahPage />} />
          <Route path="annexes/transport-maps" element={<TransportMapsPage />} />
          <Route path="annexes/local-houston-maps" element={<LocalHoustonMapsPage />} />
          <Route path="annexes/emergency-contacts" element={<EmergencyContactsPage />} />
          <Route path="annexes/touristanbul" element={<TouristanbulPage />} />
          <Route path="annexes/local-dining-shopping" element={<LocalDiningShoppingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
