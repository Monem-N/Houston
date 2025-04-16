import { Location } from '../components/maps/types';

/**
 * Fetches directions between multiple locations using Google Maps Directions API
 * @param locations Array of locations to get directions for (in order)
 * @returns Promise with the directions result
 */
export const fetchDirections = async (
  locations: Location[]
): Promise<google.maps.DirectionsResult | null> => {
  if (!locations || locations.length < 2) {
    console.error('At least 2 locations are required to fetch directions');
    return null;
  }

  try {
    // Create a directions service object
    const directionsService = new google.maps.DirectionsService();

    // Create the request
    const origin = locations[0].position;
    const destination = locations[locations.length - 1].position;

    // If there are waypoints (more than 2 locations), add them
    const waypoints = locations.slice(1, locations.length - 1).map(location => ({
      location: location.position,
      stopover: true,
    }));

    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      waypoints: waypoints.length > 0 ? waypoints : undefined,
      optimizeWaypoints: false, // Keep the order as provided
      travelMode: google.maps.TravelMode.DRIVING,
    };

    try {
      // Make the request using async/await
      const result = await directionsService.route(request);
      return result;
    } catch (routeError) {
      console.error('Error in directions service route:', routeError);
      // Try again with a simpler request (just origin and destination)
      if (waypoints.length > 0) {
        console.log('Retrying with simpler request (no waypoints)');
        const simpleRequest: google.maps.DirectionsRequest = {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        };
        const simpleResult = await directionsService.route(simpleRequest);
        return simpleResult;
      }
      throw routeError;
    }
  } catch (error) {
    console.error('Error fetching directions:', error);
    return null;
  }
};

/**
 * Calculates the total distance and duration of a route
 * @param directionsResult The directions result from Google Maps API
 * @returns Object with total distance and duration
 */
export const calculateRouteInfo = (
  directionsResult: google.maps.DirectionsResult
): { totalDistance: string; totalDuration: string } => {
  let totalDistance = 0;
  let totalDuration = 0;

  const routes = directionsResult.routes[0];

  routes.legs.forEach(leg => {
    totalDistance += leg.distance?.value || 0;
    totalDuration += leg.duration?.value || 0;
  });

  // Convert to human-readable format
  const distanceText =
    totalDistance < 1000 ? `${totalDistance} m` : `${(totalDistance / 1000).toFixed(1)} km`;

  const durationText =
    totalDuration < 3600
      ? `${Math.round(totalDuration / 60)} mins`
      : `${Math.floor(totalDuration / 3600)} hr ${Math.round((totalDuration % 3600) / 60)} mins`;

  return {
    totalDistance: distanceText,
    totalDuration: durationText,
  };
};
