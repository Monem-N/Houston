import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_MAP_ID } from './env';

// Function to load the Google Maps API
export const loadGoogleMapsApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if the API is already loaded
    if (window.google && window.google.maps) {
      console.log('Google Maps API already loaded');
      resolve();
      return;
    }

    console.log('Loading Google Maps API with key:', GOOGLE_MAPS_API_KEY);
    console.log('Map ID:', GOOGLE_MAPS_MAP_ID);

    // Define the callback function that will be called when the API is loaded
    const callbackName = 'googleMapsApiLoaded';
    (window as any)[callbackName] = () => {
      console.log('Google Maps API loaded successfully via callback');
      resolve();
      // Clean up the global callback
      delete (window as any)[callbackName];
    };

    // Create a script element
    const script = document.createElement('script');
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly&map_ids=${GOOGLE_MAPS_MAP_ID}&callback=${callbackName}`;
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;

    console.log('Script URL:', scriptUrl);

    // Set up error callback
    script.onerror = error => {
      console.error('Error loading Google Maps API:', error);
      // Clean up the global callback
      delete (window as any)[callbackName];
      reject(new Error('Failed to load Google Maps API'));
    };

    // Add the script to the document
    document.head.appendChild(script);
    console.log('Google Maps API script added to document head');
  });
};

export const getGoogleMapsMapId = (): string => {
  return GOOGLE_MAPS_MAP_ID;
};

export const getGoogleMapsApiKey = (): string => {
  return GOOGLE_MAPS_API_KEY;
};
