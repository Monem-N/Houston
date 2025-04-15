import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TransportMapsPage from './TransportMapsPage';

// Mock the MapContainer component since it uses Google Maps API
jest.mock('../components/maps', () => ({
  MapContainer: () => <div data-testid="map-container">Map Container</div>,
  Location: {},
}));

describe('TransportMapsPage', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders page title and subtitle', () => {
    renderWithRouter(<TransportMapsPage />);

    expect(screen.getByText('Transportation & Maps')).toBeInTheDocument();
    expect(screen.getByText('Getting around Houston during your visit')).toBeInTheDocument();
  });

  test('renders all tabs', () => {
    renderWithRouter(<TransportMapsPage />);

    expect(screen.getByText('Transport Map')).toBeInTheDocument();
    expect(screen.getByText('Public Transportation')).toBeInTheDocument();
    expect(screen.getByText('Rideshare & Taxis')).toBeInTheDocument();
    expect(screen.getByText('Airport Transportation')).toBeInTheDocument();
    expect(screen.getByText('Getting to FIRST Championship')).toBeInTheDocument();
  });

  test('renders map container in the first tab', () => {
    renderWithRouter(<TransportMapsPage />);

    expect(screen.getByText('Houston Transportation Map')).toBeInTheDocument();
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  test('renders public transportation options', () => {
    renderWithRouter(<TransportMapsPage />);

    // Click on the Public Transportation tab
    const publicTransportTab = screen.getByText('Public Transportation');
    fireEvent.click(publicTransportTab);

    expect(screen.getByText('Public Transportation Options')).toBeInTheDocument();
    expect(screen.getByText('METRORail')).toBeInTheDocument();
    expect(screen.getByText('METRO Bus')).toBeInTheDocument();
    expect(screen.getByText('Park & Ride')).toBeInTheDocument();
  });

  test('renders rideshare and taxi options', () => {
    renderWithRouter(<TransportMapsPage />);

    // Click on the Rideshare & Taxis tab
    const rideshareTab = screen.getByText('Rideshare & Taxis');
    fireEvent.click(rideshareTab);

    expect(screen.getByText('Rideshare & Taxi Services')).toBeInTheDocument();
    expect(screen.getByText('Uber')).toBeInTheDocument();
    expect(screen.getByText('Lyft')).toBeInTheDocument();
    expect(screen.getByText('Taxis')).toBeInTheDocument();
  });

  test('renders airport transportation options', () => {
    renderWithRouter(<TransportMapsPage />);

    // Click on the Airport Transportation tab
    const airportTab = screen.getByText('Airport Transportation');
    fireEvent.click(airportTab);

    expect(screen.getByText('Airport Transportation Options')).toBeInTheDocument();
    expect(screen.getByText('IAH (Bush) to Downtown')).toBeInTheDocument();
    expect(screen.getByText('HOU (Hobby) to Downtown')).toBeInTheDocument();
  });

  test('renders FIRST Championship transportation information', () => {
    renderWithRouter(<TransportMapsPage />);

    // Click on the Getting to FIRST Championship tab
    const firstChampionshipTab = screen.getByText('Getting to FIRST Championship');
    fireEvent.click(firstChampionshipTab);

    expect(screen.getByText('Getting to FIRST Championship')).toBeInTheDocument();
    expect(screen.getByText('From Crowne Plaza (Official Hotel)')).toBeInTheDocument();
    expect(screen.getByText('From Downtown Hotels')).toBeInTheDocument();
    expect(screen.getByText('Parking Information')).toBeInTheDocument();
  });
});
