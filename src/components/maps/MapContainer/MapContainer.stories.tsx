// React is used implicitly by JSX
// import React from 'react';
import { StoryFn as Story, Meta as ComponentMeta } from '@storybook/react';
import MapContainer from './MapContainer';

// Mock the Google Maps API for Storybook
// This is a simplified mock that doesn't actually render a map
// In a real implementation, you would need to load the Google Maps API
const MockGoogleMap = ({ children }: any) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#e5e3df',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: '4px',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#666',
      }}
    >
      <h3>Google Map</h3>
      <p>This is a mock map for Storybook.</p>
      <p>In a real application, this would be a Google Map.</p>
    </div>
    {children}
  </div>
);

// Mock the child components
jest.mock('../GoogleMap', () => {
  return {
    __esModule: true,
    default: MockGoogleMap,
  };
});

jest.mock('../Marker', () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

jest.mock('../InfoWindow', () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

export default {
  title: 'Maps/MapContainer',
  component: MapContainer,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MapContainer>;

const Template: Story<typeof MapContainer> = args => <MapContainer {...args} />;

// Sample locations data
const locations = [
  {
    id: '1',
    name: 'Space Center Houston',
    position: { lat: 29.5519, lng: -95.0968 },
    category: 'attraction',
    description: 'The official visitor center of NASA Johnson Space Center.',
    address: '1601 E NASA Pkwy, Houston, TX 77058',
    image: 'https://source.unsplash.com/random/800x600/?space,nasa',
  },
  {
    id: '2',
    name: 'Houston Museum of Natural Science',
    position: { lat: 29.7221, lng: -95.3898 },
    category: 'museum',
    description: 'A science museum with exhibits on dinosaurs, space, and more.',
    address: '5555 Hermann Park Dr, Houston, TX 77030',
    image: 'https://source.unsplash.com/random/800x600/?museum',
  },
  {
    id: '3',
    name: 'Houston Zoo',
    position: { lat: 29.7146, lng: -95.3909 },
    category: 'attraction',
    description: 'Home to more than 6,000 animals from 900 species.',
    address: '6200 Hermann Park Dr, Houston, TX 77030',
    image: 'https://source.unsplash.com/random/800x600/?zoo',
  },
  {
    id: '4',
    name: "Pappasito's Cantina",
    position: { lat: 29.7328, lng: -95.4173 },
    category: 'restaurant',
    description: 'Popular Tex-Mex restaurant with fajitas and margaritas.',
    address: '2536 Richmond Ave, Houston, TX 77098',
    image: 'https://source.unsplash.com/random/800x600/?mexican,food',
  },
  {
    id: '5',
    name: 'The Breakfast Klub',
    position: { lat: 29.7428, lng: -95.3778 },
    category: 'restaurant',
    description: 'Famous for its wings and waffles, and other breakfast items.',
    address: '3711 Travis St, Houston, TX 77002',
    image: 'https://source.unsplash.com/random/800x600/?breakfast',
  },
  {
    id: '6',
    name: 'George R. Brown Convention Center',
    position: { lat: 29.752, lng: -95.3562 },
    category: 'venue',
    description: 'Main venue for the FIRST Championship.',
    address: '1001 Avenida de las Americas, Houston, TX 77010',
    image: 'https://source.unsplash.com/random/800x600/?convention,center',
  },
];

const categories = ['attraction', 'museum', 'restaurant', 'venue'];

export const Default = Template.bind({});
Default.args = {
  locations,
  categories,
  height: 600,
  initialZoom: 11,
};

export const NoCategories = Template.bind({});
NoCategories.args = {
  locations,
  height: 600,
  initialZoom: 11,
};

export const SingleCategory = Template.bind({});
SingleCategory.args = {
  locations: locations.filter(loc => loc.category === 'restaurant'),
  height: 600,
  initialZoom: 12,
};
