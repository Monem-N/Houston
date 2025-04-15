// React is used implicitly by JSX
// import React from 'react';
import { render } from '@testing-library/react';
import Marker from './Marker';

// Mock the Google Maps API
const mockMarker = {
  addListener: jest.fn((event, callback) => {
    if (event === 'click') {
      callback();
    }
  }),
  map: null,
};

// Mock the google global object
global.google = {
  maps: {
    marker: {
      AdvancedMarkerElement: jest.fn().mockImplementation(() => mockMarker),
      AdvancedMarkerElementOptions: jest.fn(),
    },
    Map: jest.fn(),
    LatLngLiteral: jest.fn(),
  },
} as any;

describe('Marker', () => {
  const mockMap = {} as google.maps.Map;
  const mockPosition = { lat: 29.7604, lng: -95.3698 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a marker with the correct position', () => {
    render(<Marker position={mockPosition} map={mockMap} />);

    expect(global.google.maps.marker.AdvancedMarkerElement).toHaveBeenCalledTimes(1);

    const markerOptions = (global.google.maps.marker.AdvancedMarkerElement as jest.Mock).mock
      .calls[0][0];
    expect(markerOptions.position).toEqual(mockPosition);
    expect(markerOptions.map).toEqual(mockMap);
  });

  it('creates a marker with a title', () => {
    const title = 'Test Marker';

    render(<Marker position={mockPosition} map={mockMap} title={title} />);

    const markerOptions = (global.google.maps.marker.AdvancedMarkerElement as jest.Mock).mock
      .calls[0][0];
    expect(markerOptions.title).toBe(title);
  });

  it('adds a click event listener when onClick is provided', () => {
    const onClick = jest.fn();

    render(<Marker position={mockPosition} map={mockMap} onClick={onClick} />);

    expect(mockMarker.addListener).toHaveBeenCalledTimes(1);
    expect(mockMarker.addListener).toHaveBeenCalledWith('click', expect.any(Function));

    // Verify that the onClick callback is called when the marker is clicked
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(mockMarker);
  });

  it('does not add a click event listener when onClick is not provided', () => {
    render(<Marker position={mockPosition} map={mockMap} />);

    expect(mockMarker.addListener).not.toHaveBeenCalled();
  });

  it('handles missing AdvancedMarkerElement gracefully', () => {
    // Save the original implementation
    const originalMarker = global.google.maps.marker;

    // Remove the marker object to simulate missing AdvancedMarkerElement
    global.google.maps.marker = undefined as any;

    // Mock console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<Marker position={mockPosition} map={mockMap} />);

    // Verify that console.error was called with the appropriate message
    expect(console.error).toHaveBeenCalledWith(
      'AdvancedMarkerElement is not available. Make sure you have the latest version of the Google Maps JavaScript API.'
    );

    // Restore the original implementations
    global.google.maps.marker = originalMarker;
    console.error = originalConsoleError;
  });
});
