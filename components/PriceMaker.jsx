// src/components/PriceMarker.js

import React from 'react';

/**
 * Custom marker component that displays the price.
 * It uses Tailwind CSS for the styling to mimic the Airbnb look.
 *
 * @param {object} props - Component props.
 * @param {number} props.price - The price to display inside the pin.
 */
const PriceMarker = ({ price }) => {
  return (
    // The div uses absolute positioning within the Marker component
    // to act as the map pin.
    <div
      className="
        bg-white
        text-black
        font-semibold
        px-3 py-1
        rounded-full
        shadow-md
        whitespace-nowrap
        border-2 border-gray-100
        text-sm
        transition-all duration-200
        hover:bg-gray-100 hover:scale-105
        cursor-pointer
      "
      // Style to correct the marker anchor point (center of the bottom edge)
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      € {price}
    </div>
  );
};

export default PriceMarker;