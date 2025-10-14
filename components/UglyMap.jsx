// src/components/AirbnbMap.js

import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import PriceMarker from './PriceMaker';

// --- Configuration ---

const libraries = ['places']; // Include any libraries you might need
const mapContainerStyle = {
  width: '100%',
  height: '700px', // Set a fixed height for the map container
  borderRadius: '8px',
};

// Center the map on Milan (the location in your image)
const initialCenter = {
  lat: 45.4642, // Milan city center latitude
  lng: 9.1899, // Milan city center longitude
};

const initialZoom = 12;

// --- Sample Data (Replace with your actual product fetch) ---

const propertyListings = [
  { id: 1, price: 68, lat: 45.54, lng: 9.06 },
  { id: 2, price: 72, lat: 45.51, lng: 9.00 },
  { id: 3, price: 79, lat: 45.55, lng: 9.25 },
  { id: 4, price: 102, lat: 45.48, lng: 9.16 },
  { id: 5, price: 137, lat: 45.45, lng: 9.12 },
  { id: 6, price: 54, lat: 45.42, lng: 9.10 },
  { id: 7, price: 63, lat: 45.43, lng: 9.16 },
  { id: 8, price: 122, lat: 45.48, lng: 9.22 },
  { id: 9, price: 101, lat: 45.46, lng: 9.24 },
  { id: 10, price: 86, lat: 45.44, lng: 9.21 },
  { id: 11, price: 54, lat: 45.41, lng: 9.22 },
  { id: 12, price: 126, lat: 45.39, lng: 9.13 },
  // ... add more points
];

// --- Component ---

const AirbnbMap = () => {
  // 💡 IMPORTANT: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual key
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    libraries,
  });

  const mapOptions = useMemo(() => ({
    // Disable default UI elements like Street View, Map Type, etc.
    disableDefaultUI: true,
    // Add custom styling here to match the exact Airbnb map look if needed
    // (e.g., removing Points of Interest for a cleaner look)
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  }), []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="p-4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialCenter}
        zoom={initialZoom}
        options={mapOptions}
      >
        {/* Render the custom price markers */}
        {propertyListings.map((property) => (
          <OverlayView
            key={property.id}
            position={{ lat: property.lat, lng: property.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <PriceMarker price={property.price} />
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  );
};

export default AirbnbMap;