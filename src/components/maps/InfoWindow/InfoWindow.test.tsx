// React is used implicitly by JSX
// import React from 'react';
import { render } from '@testing-library/react';
import InfoWindow from'./InfoWindow';

// Mock ReactDOM.createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: jest.fn(children => children),
}));

// Mock the Google Maps API
const mockInfoWindow = {
  open: jest.fn(),
  close: jest.fn(),
  addListener: jest.fn((event, callback) => {
    if (event ==='closeclick') {
      callback();
    }
  }),
  setContent: jest.fn(),
  setPosition: jest.fn(),
};

// Mock the google global object
global.google = {
  maps: {
    InfoWindow: jest.fn().mockImplementation(() => mockInfoWindow),
    Map: jest.fn(),
    LatLngLiteral: jest.fn(),
  },
} as any;

describe('InfoWindow', () => {
  const mockMap = {} as google.maps.Map;
  const mockPosition = { lat: 29.7604, lng: -95.3698 };
  const mockAnchor = {} as google.maps.marker.AdvancedMarkerElement;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates an info window with the correct position', () => {
    render(
      <InfoWindow position={mockPosition} map={mockMap} open>
        <div>Test Content</div>
      </InfoWindow>
    );

    expect(global.google.maps.InfoWindow).toHaveBeenCalledTimes(1);

    const infoWindowOptions = (global.google.maps.InfoWindow as jest.Mock).mock.calls[0][0];
    expect(infoWindowOptions.position).toEqual(mockPosition);
    expect(infoWindowOptions.content).toBeInstanceOf(HTMLDivElement);
  });

  it('opens the info window when open prop is true', () => {
    render(
      <InfoWindow position={mockPosition} map={mockMap} open>
        <div>Test Content</div>
      </InfoWindow>
    );

    expect(mockInfoWindow.open).toHaveBeenCalledTimes(1);
    expect(mockInfoWindow.open).toHaveBeenCalledWith(mockMap);
  });

  it('opens the info window with an anchor when provided', () => {
    render(
      <InfoWindow position={mockPosition} map={mockMap} anchor={mockAnchor} open>
        <div>Test Content</div>
      </InfoWindow>
    );

    expect(mockInfoWindow.open).toHaveBeenCalledTimes(1);
    expect(mockInfoWindow.open).toHaveBeenCalledWith({
      map: mockMap,
      anchor: mockAnchor,
    });
  });

  it('closes the info window when open prop is false', () => {
    render(
      <InfoWindow position={mockPosition} map={mockMap} open={false}>
        <div>Test Content</div>
      </InfoWindow>
    );

    expect(mockInfoWindow.close).toHaveBeenCalledTimes(1);
  });

  it('adds a closeclick event listener when onClose is provided', () => {
    const onClose = jest.fn();

    render(
      <InfoWindow position={mockPosition} map={mockMap} open onClose={onClose}>
        <div>Test Content</div>
      </InfoWindow>
    );

    expect(mockInfoWindow.addListener).toHaveBeenCalledTimes(1);
    expect(mockInfoWindow.addListener).toHaveBeenCalledWith('closeclick', expect.any(Function));

    // Verify that the onClose callback is called when the info window is closed
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders children into the info window content', () => {
    const { getByText } = render(
      <InfoWindow position={mockPosition} map={mockMap} open>
        <div>Test Content</div>
      </InfoWindow>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
