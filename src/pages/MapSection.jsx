// src/pages/MapSection.jsx

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapSection = () => {
  // Set map container style
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  // Center coordinates for the map (you can replace these with any location)
  const center = {
    lat: 40.748817, // Example: latitude for New York
    lng: -73.985428, // Example: longitude for New York
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Where are you heading?</h2>
      
      {/* Map Section */}
      <div className="h-64 bg-gray-200 rounded-lg shadow-inner">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {/* Optional Marker */}
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapSection;
