import React from 'react';
import { render, screen } from '@testing-library/react';
import GoogleMap from'./GoogleMap';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock the Google Maps API
const mockMap = {
  setCenter: jest.fn(),
  setZoom: jest.fn(),
  setOptions: jest.fn(),
};

// Mock the google global object
global.google = {
  maps: {
    Map: jest.fn().mockImplementation(() => mockMap),
    LatLngLiteral: jest.fn(),
    MapOptions: jest.fn(),
  },
} as any;

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('GoogleMap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the map container', () => {
    renderWithTheme(<GoogleMap />);
    expect(screen.getByTestId('google-map-container')).toBeInTheDocument();
  });

  it('initializes the map with default props', () => {
    renderWithTheme(<GoogleMap />);
    expect(global.google.maps.Map).toHaveBeenCalledTimes(1);

    // Check that the map was initialized with the default center and zoom
    // Cast to unknown first to avoid TypeScript error
    const mapOptions = (global.google.maps.Map as unknown as jest.Mock).mock.calls[0][1];
    expect(mapOptions.center).toEqual({ lat: 29.7604, lng: -95.3698 });
    expect(mapOptions.zoom).toBe(12);
  });

  it('initializes the map with custom props', () => {
    const center = { lat: 30.0, lng: -96.0 };
    const zoom = 15;
    const mapId = 'test-map-id';

    renderWithTheme(<GoogleMap center={center} zoom={zoom} mapId={mapId} />);

    expect(global.google.maps.Map).toHaveBeenCalledTimes(1);

    // Check that the map was initialized with the custom props
    // Cast to unknown first to avoid TypeScript error
    const mapOptions = (global.google.maps.Map as unknown as jest.Mock).mock.calls[0][1];
    expect(mapOptions.center).toEqual(center);
    expect(mapOptions.zoom).toBe(zoom);
    expect(mapOptions.mapId).toBe(mapId);
  });

  it('calls onMapLoad callback when map is loaded', () => {
    const onMapLoad = jest.fn();

    renderWithTheme(<GoogleMap onMapLoad={onMapLoad} />);

    expect(onMapLoad).toHaveBeenCalledTimes(1);
    expect(onMapLoad).toHaveBeenCalledWith(mockMap);
  });

  it('renders children when map is loaded', () => {
    renderWithTheme(
      <GoogleMap>
        <div data-testid="map-child">Child Component</div>
      </GoogleMap>
    );

    expect(screen.getByTestId('map-child')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message when Google Maps API is not loaded', () => {
    // Temporarily remove the google object
    const originalGoogle = global.google;
    global.google = undefined as any;

    renderWithTheme(<GoogleMap />);

    expect(
      screen.getByText('Google Maps API not loaded. Please check your API key.')
    ).toBeInTheDocument();

    // Restore the google object
    global.google = originalGoogle;
  });
});
