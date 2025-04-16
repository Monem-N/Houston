import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface InfoWindowProps {
  position: google.maps.LatLngLiteral;
  map: google.maps.Map;
  anchor?: google.maps.marker.AdvancedMarkerElement | google.maps.Marker;
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const InfoWindow: React.FC<InfoWindowProps> = ({
  position,
  map,
  anchor,
  open = false,
  onClose,
  children,
}) => {
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  // Create the info window when the component mounts
  useEffect(() => {
    if (!map || !window.google) return;

    // Create a container for the content
    const div = document.createElement('div');
    setContainer(div);

    // Create the info window
    const newInfoWindow = new google.maps.InfoWindow({
      position,
      content: div,
    });

    // Add close event listener
    if (onClose) {
      newInfoWindow.addListener('closeclick', onClose);
    }

    setInfoWindow(newInfoWindow);

    // Clean up the info window when the component unmounts
    return () => {
      if (newInfoWindow) {
        newInfoWindow.close();
      }
    };
  }, [map, position, onClose]);

  // Open or close the info window when the open prop changes
  useEffect(() => {
    if (!infoWindow) return;

    if (open) {
      if (anchor) {
        infoWindow.open({
          map,
          anchor,
        });
      } else {
        infoWindow.open(map);
      }
    } else {
      infoWindow.close();
    }
  }, [infoWindow, map, anchor, open]);

  // Render the children into the container
  return container ? ReactDOM.createPortal(children, container) : null;
};

export default InfoWindow;
