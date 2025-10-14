"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Add this CSS import for Mapbox styles
import 'mapbox-gl/dist/mapbox-gl.css';

export default function LocationInput({ onSelect }) {
  const geocoderContainerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(false);

  useEffect(() => {
    // Check if token exists
    if (!mapboxgl.accessToken || mapboxgl.accessToken === "your_mapbox_token_here") {
      setMapError("Mapbox token is not configured. Please check your .env.local file.");
      return;
    }

    if (!geocoderContainerRef.current) return;

    try {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: "Enter your location",
        types: "place,region,postcode,address",
        marker: false,
        proximity: { longitude: 12.4964, latitude: 41.9028 },
        mapboxgl: mapboxgl
      });

      geocoder.addTo(geocoderContainerRef.current);

      geocoder.on("result", (e) => {
        const place = e.result.place_name;
        const coordinates = e.result.geometry.coordinates;
        const center = e.result.center || coordinates;
        
        setSelectedLocation({
          place,
          coordinates: center,
          geometry: e.result.geometry
        });
        
        if (onSelect) onSelect(place);
        updateMap(center);
      });

      geocoder.on("error", (e) => {
        console.error("Geocoder error:", e);
        setMapError("Error searching for location");
      });

      return () => {
        if (geocoder.onRemove) geocoder.onRemove();
      };
    } catch (error) {
      console.error("Error initializing geocoder:", error);
      setMapError("Failed to initialize location search");
    }
  }, [onSelect]);

  const updateMap = (coordinates) => {
    if (!mapContainerRef.current) return;

    try {
      setIsMapLoading(true);
      
      // Initialize map if it doesn't exist
      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: coordinates,
          zoom: 12,
          attributionControl: true
        });

        mapRef.current.on("load", () => {
          console.log("Map loaded successfully");
          setMapError(null);
          setIsMapLoading(false);
          addRadiusCircle(coordinates);
        });

        mapRef.current.on("error", (e) => {
          console.error("Map error:", e);
          setMapError("Failed to load map. Check your Mapbox token and internet connection.");
          setIsMapLoading(false);
        });

        mapRef.current.on("render", () => {
          setIsMapLoading(false);
        });
      } else {
        // Update existing map
        mapRef.current.flyTo({
          center: coordinates,
          zoom: 12,
          duration: 1000
        });
        
        // Clear existing layers and sources after a short delay
        setTimeout(() => {
          if (mapRef.current) {
            const map = mapRef.current;
            // Remove existing layers
            if (map.getLayer('radius-circle')) map.removeLayer('radius-circle');
            if (map.getLayer('radius-circle-outline')) map.removeLayer('radius-circle-outline');
            if (map.getLayer('center-marker')) map.removeLayer('center-marker');
            
            // Remove existing sources
            if (map.getSource('circle-center')) map.removeSource('circle-center');
            if (map.getSource('center-point')) map.removeSource('center-point');
            
            // Clear all markers
            const markers = document.getElementsByClassName('mapboxgl-marker');
            while(markers.length > 0) {
              markers[0].remove();
            }
            
            addRadiusCircle(coordinates);
          }
        }, 500);
      }
    } catch (error) {
      console.error("Error updating map:", error);
      setMapError("Error displaying map");
      setIsMapLoading(false);
    }
  };

  const addRadiusCircle = (coordinates) => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    
    // Add source for the center point
    map.addSource('circle-center', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        properties: {}
      }
    });

    // Add circle layer for radius (1km)
    map.addLayer({
      id: 'radius-circle',
      type: 'circle',
      source: 'circle-center',
      paint: {
        'circle-radius': 1000, // 1km in meters
        'circle-color': '#007cbf',
        'circle-opacity': 0.1,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#007cbf'
      }
    });

    // Add outline layer
    map.addLayer({
      id: 'radius-circle-outline',
      type: 'circle',
      source: 'circle-center',
      paint: {
        'circle-radius': 1000,
        'circle-color': 'transparent',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#007cbf',
        'circle-stroke-dasharray': [2, 2]
      }
    });

    // Add marker at the center
    new mapboxgl.Marker({ 
      color: '#007cbf',
      draggable: false
    })
      .setLngLat(coordinates)
      .addTo(map);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Error messages */}
      {!mapboxgl.accessToken || mapboxgl.accessToken === "your_mapbox_token_here" ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Configuration Error:</strong> Mapbox token is missing or not configured properly.
          <br />
          <span className="text-sm">
            Please add <code>NEXT_PUBLIC_MAPBOX_TOKEN=your_actual_token</code> to your .env.local file
          </span>
        </div>
      ) : null}

      {mapError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {mapError}
        </div>
      )}

      {/* Geocoder input */}
      <div ref={geocoderContainerRef} className="w-full mb-4" />
      
      {/* Map display */}
      {selectedLocation && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Selected location: <strong>{selectedLocation.place}</strong>
            <br />
            <span className="text-xs">Showing 1km radius around the location</span>
          </p>
          
          <div className="relative">
            {isMapLoading && (
              <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-10">
                <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                  Loading map...
                </div>
              </div>
            )}
            
            <div 
              ref={mapContainerRef} 
              className="w-full h-80 rounded-lg border border-gray-300 shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedLocation && (
        <div className="text-sm text-gray-500 mt-2">
          Enter a location above to see it on the map with a 1km radius circle.
        </div>
      )}
    </div>
  );
}