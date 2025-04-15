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

export interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  locations?: Location[];
  height?: string | number;
  width?: string | number;
  showInfoWindow?: boolean;
  apiKey?: string;
  mapId?: string;
}
