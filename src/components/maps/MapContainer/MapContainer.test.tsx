import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapContainer from './MapContainer';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock the child components
jest.mock('../GoogleMap', () => {
  return {
    __esModule: true,
    default: ({ children, onMapLoad }: any) => {
      // Call onMapLoad with a mock map
      React.useEffect(() => {
        if (onMapLoad) {
          onMapLoad({} as google.maps.Map);
        }
      }, [onMapLoad]);

      return <div data-testid="google-map">{children}</div>;
    },
  };
});

jest.mock('../Marker', () => {
  return {
    __esModule: true,
    default: ({ onClick }: any) => {
      return (
        <div data-testid="marker" onClick={onClick}>
          Marker
        </div>
      );
    },
  };
});

jest.mock('../InfoWindow', () => {
  return {
    __esModule: true,
    default: ({ children, onClose }: any) => {
      return (
        <div data-testid="info-window">
          <button data-testid="close-info-window" onClick={onClose}>
            Close
          </button>
          {children}
        </div>
      );
    },
  };
});

// Mock the google global object
global.google = {
  maps: {
    Map: jest.fn(),
    LatLngBounds: jest.fn().mockImplementation(() => ({
      extend: jest.fn(),
    })),
    event: {
      addListenerOnce: jest.fn(),
      removeListener: jest.fn(),
    },
  },
} as any;

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('MapContainer', () => {
  const mockLocations = [
    {
      id: '1',
      name: 'Location 1',
      position: { lat: 29.7604, lng: -95.3698 },
      category: 'restaurant',
      description: 'A nice restaurant',
      address: '123 Main St, Houston, TX',
    },
    {
      id: '2',
      name: 'Location 2',
      position: { lat: 29.7605, lng: -95.3699 },
      category: 'attraction',
      description: 'A fun attraction',
      address: '456 Oak St, Houston, TX',
    },
    {
      id: '3',
      name: 'Location 3',
      position: { lat: 29.7606, lng: -95.37 },
      category: 'restaurant',
      description: 'Another restaurant',
      address: '789 Pine St, Houston, TX',
    },
  ];

  const mockCategories = ['restaurant', 'attraction'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the map container', () => {
    renderWithTheme(<MapContainer locations={mockLocations} categories={mockCategories} />);

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });

  it('renders the category filter when categories are provided', () => {
    renderWithTheme(<MapContainer locations={mockLocations} categories={mockCategories} />);

    expect(screen.getByLabelText('Filter by Category')).toBeInTheDocument();
  });

  it('does not render the category filter when no categories are provided', () => {
    renderWithTheme(<MapContainer locations={mockLocations} categories={[]} />);

    expect(screen.queryByLabelText('Filter by Category')).not.toBeInTheDocument();
  });

  it('renders markers for all locations by default', () => {
    renderWithTheme(<MapContainer locations={mockLocations} categories={mockCategories} />);

    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(mockLocations.length);
  });

  it('filters locations when a category is selected', () => {
    renderWithTheme(<MapContainer locations={mockLocations} categories={mockCategories} />);

    // Open the select dropdown
    fireEvent.mouseDown(screen.getByLabelText('Filter by Category'));

    // Click on the 'restaurant' option
    fireEvent.click(screen.getByText('restaurant'));

    // Should only show restaurant markers (2 of them)
    const restaurantLocations = mockLocations.filter(loc => loc.category === 'restaurant');
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(restaurantLocations.length);
  });

  it('shows info window when a marker is clicked', () => {
    renderWithTheme(<MapContainer locations={mockLocations} categories={mockCategories} />);

    // Initially, no info windows should be visible
    expect(screen.queryByTestId('info-window')).not.toBeInTheDocument();

    // Click on the first marker
    fireEvent.click(screen.getAllByTestId('marker')[0]);

    // Info window should now be visible
    expect(screen.getByTestId('info-window')).toBeInTheDocument();

    // Location details should be displayed
    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('A nice restaurant')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Houston, TX')).toBeInTheDocument();
  });

  it('closes info window when close button is clicked', () => {
    renderWithTheme(<MapContainer locations={mockLocations} categories={mockCategories} />);

    // Click on the first marker to open the info window
    fireEvent.click(screen.getAllByTestId('marker')[0]);

    // Info window should be visible
    expect(screen.getByTestId('info-window')).toBeInTheDocument();

    // Click the close button
    fireEvent.click(screen.getByTestId('close-info-window'));

    // Info window should no longer be visible
    expect(screen.queryByTestId('info-window')).not.toBeInTheDocument();
  });
});
