# ReactGoogleMap Component

A React component for integrating Google Maps into the Houston travel guide using the @vis.gl/react-google-maps library.

## Features

- Display Google Maps with custom styling
- Show markers for locations
- Cluster markers for better visualization of large datasets
- Custom marker icons based on location category
- Interactive info windows with location details

## Usage

```tsx
import ReactGoogleMap from '../components/maps/ReactGoogleMap';
import { Location } from '../components/maps/types';

// Sample location data
const locations: Location[] = [
  {
    id: '1',
    name: 'Space Center Houston',
    position: { lat: 29.5519, lng: -95.0968 },
    category: 'attraction',
    description: 'The official visitor center of NASA Johnson Space Center.',
    address: '1601 E NASA Pkwy, Houston, TX 77058',
    image: '/assets/images/attractions/space-center.jpg',
  },
  // Add more locations as needed
];

// Basic usage
<ReactGoogleMap
  locations={locations}
  height={600}
  mapId="af8bf941f1e27c9d"
  zoom={11}
/>

// With clustering enabled
<ReactGoogleMap
  locations={locations}
  height={600}
  mapId="af8bf941f1e27c9d"
  zoom={11}
  enableClustering={true}
/>

// With custom icons disabled
<ReactGoogleMap
  locations={locations}
  height={600}
  mapId="af8bf941f1e27c9d"
  zoom={11}
  useCustomIcons={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| apiKey | string | 'AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0' | Google Maps API key |
| mapId | string | 'af8bf941f1e27c9d' | Google Maps Map ID |
| center | LatLngLiteral | { lat: 29.7604, lng: -95.3698 } | Center coordinates of the map |
| zoom | number | 12 | Initial zoom level |
| locations | Location[] | [] | Array of locations to display on the map |
| height | string \| number | 500 | Height of the map container |
| width | string \| number | '100%' | Width of the map container |
| showInfoWindow | boolean | true | Whether to show info windows when markers are clicked |
| enableClustering | boolean | false | Whether to enable marker clustering |
| useCustomIcons | boolean | true | Whether to use custom icons for markers based on category |

## Location Type

```tsx
export interface Location {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
  category: string;
  description?: string;
  address?: string;
  image?: string;
  url?: string;
}
```

## Supported Categories

The component supports the following categories with custom icons:

- attraction
- museum
- restaurant
- shopping
- grocery
- hotel
- airport
- transport
- medical
- park
- venue

Any other category will use a default place icon.

## Dependencies

- @vis.gl/react-google-maps
- @mui/material
- @mui/icons-material
