// LocationMap.jsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf"; // Import Turf.js

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const mapStyle = {
  width: "100%",
  height: "500px", // Define a height for the map container
};

export default function LocationMap({ geocoderResult }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // GeoJSON structure for the 1km circle
  const initialGeoJSON = {
    type: "FeatureCollection",
    features: [],
  };

  // 1. Initialize the map
  useEffect(() => {
    if (mapRef.current) return; // Initialize map only once

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12", // You can choose any style
      center: [12.4964, 41.9028], // Default to Rome
      zoom: 10,
    });

    mapRef.current.on("load", () => {
      // Add a GeoJSON source for the circle
      mapRef.current.addSource("radius-source", {
        type: "geojson",
        data: initialGeoJSON,
      });

      // Add a fill layer for the circle
      mapRef.current.addLayer({
        id: "radius-fill",
        type: "fill",
        source: "radius-source",
        paint: {
          "fill-color": "#007cbf",
          "fill-opacity": 0.2,
        },
      });

      // Add a line layer for the circle outline
      mapRef.current.addLayer({
        id: "radius-outline",
        type: "line",
        source: "radius-source",
        paint: {
          "line-color": "#007cbf",
          "line-width": 2,
        },
      });
    });

    return () => mapRef.current?.remove();
  }, []);

  // 2. Update map on new geocoder result
  useEffect(() => {
    if (!mapRef.current || !geocoderResult) return;

    const map = mapRef.current;
    const center = geocoderResult.center; // [lng, lat]
    const placeName = geocoderResult.place_name;

    // --- A. Create 1km Circle GeoJSON using Turf.js ---
    const radiusInKm = 1;
    const options = { steps: 64, units: "kilometers" };
    // turf.circle takes [lng, lat] for the center
    const circle = turf.circle(center, radiusInKm, options);

    // --- B. Update the GeoJSON source on the map ---
    if (map.getSource("radius-source")) {
      map.getSource("radius-source").setData(circle);
    }

    // --- C. Update / Add Marker ---
    if (markerRef.current) {
      markerRef.current.setLngLat(center).setPopup(
        new mapboxgl.Popup().setHTML(`
          <h3>${placeName}</h3>
          <p>1 km radius</p>
        `)
      );
    } else {
      // Add a new marker if it doesn't exist
      markerRef.current = new mapboxgl.Marker()
        .setLngLat(center)
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <h3>${placeName}</h3>
            <p>1 km radius</p>
          `)
        )
        .addTo(map);
    }
    
    // Open the popup automatically
    markerRef.current.togglePopup();

    // --- D. Fly to the new location and fit to the circle's bounds ---
    // Calculate bounding box of the 1km circle using turf.js
    const bbox = turf.bbox(circle); 
    
    map.fitBounds(
        [[bbox[0], bbox[1]], [bbox[2], bbox[3]]], // [[west, south], [east, north]]
        {
            padding: 50, // Add some padding around the circle
            duration: 1000 // Animation speed
        }
    );

  }, [geocoderResult]);

  return <div ref={mapContainerRef} style={mapStyle} />;
}