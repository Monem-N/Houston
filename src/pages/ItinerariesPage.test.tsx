import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../theme';
import ItinerariesPage from './ItinerariesPage';

// Mock component to avoid Google Maps API issues in tests
jest.mock('@mui/icons-material', () => {
  const originalModule = jest.requireActual('@mui/icons-material');
  return {
    __esModule: true,
    ...originalModule,
    // Add any specific mocks needed
  };
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={getTheme('light')}>{component}</ThemeProvider>);
};

describe('ItinerariesPage', () => {
  test('renders the page title', () => {
    renderWithTheme(<ItinerariesPage />);
    expect(screen.getByText('Itinéraires Suggérés')).toBeInTheDocument();
  });

  test('renders itinerary cards', () => {
    renderWithTheme(<ItinerariesPage />);
    expect(screen.getByText('Jour 1: Space Center & Kemah')).toBeInTheDocument();
    expect(screen.getByText('Jour 2: Museum District & Hermann Park')).toBeInTheDocument();
    expect(screen.getByText('Jour 3: Shopping & Downtown')).toBeInTheDocument();
    expect(screen.getByText('Jour 4: FIRST Championship')).toBeInTheDocument();
    expect(screen.getByText('Jour 5: Katy Mills & Gastronomie')).toBeInTheDocument();
  });

  test('displays itinerary details when selected', () => {
    renderWithTheme(<ItinerariesPage />);

    // Click on the first itinerary
    const viewButtons = screen.getAllByText('Voir l\'itinéraire');
    fireEvent.click(viewButtons[0]);

    // Check if details are displayed
    expect(screen.getByText('Points d\'arrêt')).toBeInTheDocument();
    expect(screen.getByText('Space Center Houston')).toBeInTheDocument();
  });

  test('renders transport advice section', () => {
    renderWithTheme(<ItinerariesPage />);
    expect(screen.getByText('Conseils de transport')).toBeInTheDocument();
    expect(screen.getByText('Voiture de location')).toBeInTheDocument();
    expect(screen.getByText('Transports en commun')).toBeInTheDocument();
    expect(screen.getByText('Services VTC')).toBeInTheDocument();
  });

  test('renders practical advice section', () => {
    renderWithTheme(<ItinerariesPage />);
    expect(screen.getByText('Conseils pratiques')).toBeInTheDocument();
    expect(screen.getByText('Météo')).toBeInTheDocument();
    expect(screen.getByText('Repas')).toBeInTheDocument();
    expect(screen.getByText('Billets')).toBeInTheDocument();
    expect(screen.getByText('Temps libre')).toBeInTheDocument();
  });

  test('renders comparison table', () => {
    renderWithTheme(<ItinerariesPage />);
    expect(screen.getByText('Tableau comparatif des itinéraires')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
