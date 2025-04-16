import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Hook to detect device type based on screen size
 * @returns Object with device type information
 */
export const useDeviceDetect = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceInfo({
        isMobile: width < 600,
        isTablet: width >= 600 && width < 960,
        isDesktop: width >= 960,
      });
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize, { passive: true });

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
};

export default useDeviceDetect;
