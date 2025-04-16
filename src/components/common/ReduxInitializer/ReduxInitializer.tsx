import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { initializePreferences } from '../../../store/slices/userPreferencesSlice';
import { loadLocations } from '../../../store/slices/locationsSlice';

/**
 * Component that initializes Redux state on application load
 */
const ReduxInitializer: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize user preferences from localStorage
    dispatch(initializePreferences());
    
    // Load locations
    dispatch(loadLocations());
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default ReduxInitializer;
